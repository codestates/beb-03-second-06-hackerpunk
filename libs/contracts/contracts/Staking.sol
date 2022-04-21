// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Hoder.sol";

interface IRewardToken is IERC20 {
    function mint(address to, uint256 amount) external;
}

contract HPAStakingSystem is Ownable {
    IRewardToken public rewardToken;
    IERC721 public nft;

    uint256 public stakedTotal;
    uint256 public stakingTime = 1 days;
    uint256 public reward = 1e18;

    mapping(address => Staker) public stakers;
    mapping(uint256 => address) public tokenOwner;

    struct Staker {
        uint256[] tokenIds;
        mapping(uint256 => uint256) tokenStakingCoolDown;
        uint256 balance;
        uint256 rewardReleased;
    }

    constructor() {
        rewardToken = IRewardToken(address(0x0));
        nft = IERC721(address(0x0));
    }

    event Staked(address owner, uint256 tokenId);
    event Unstaked(address owner, uint256 tokenId);
    event Rewarded(address indexed user, uint256 reward);

    function stakedTokensByOwner(address owner) public view returns (uint256[] memory tokenIds) {
        return stakers[owner].tokenIds;
    }

    function stake(uint256 tokenId) public {
        _stake(msg.sender, tokenId);
    }

    function stakeBatch(uint256[] memory tokenIds) public {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _stake(msg.sender, tokenIds[i]);
        }
    }

    function _stake(address _owner, uint256 _tokenId) internal {
        require(nft.ownerOf(_tokenId) == msg.sender, "user is not the owner of this token");

        Staker storage staker = stakers[_owner];
        staker.tokenIds.push(_tokenId);
        staker.tokenStakingCoolDown[_tokenId] = block.timestamp;
        tokenOwner[_tokenId] = _owner;
        nft.safeTransferFrom(_owner, address(this), _tokenId);

        stakedTotal++;
        emit Staked(_owner, _tokenId);
    }

    function unstake(uint256 tokenId) public {
        claimReward(msg.sender);
        _unstake(msg.sender, tokenId);
    }

    function unstakeBatch(uint256[] memory tokenIds) public {
        claimReward(msg.sender);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            _unstake(msg.sender, tokenIds[i]);
        }
    }

    function _unstake(address _owner, uint256 _tokenId) internal {
        require(nft.ownerOf(_tokenId) == msg.sender, "user is not the owner of this token");

        Staker storage staker = stakers[_owner];
        require(staker.tokenIds.length >= 0, "No token to unstake");

        uint256 lastIndex = staker.tokenIds.length - 1;
        uint256 lastValue = staker.tokenIds[lastIndex];

        for (uint i = 0; i < lastIndex; i++) {
            if (staker.tokenIds[i] == _tokenId) {
                staker.tokenIds[i] = lastValue;
            }
        }
        staker.tokenIds.pop();
        if (staker.tokenIds.length == 0) {
            delete stakers[_owner];
        } else {
            staker.tokenStakingCoolDown[_tokenId] = 0;
        }
        delete tokenOwner[_tokenId];
        nft.safeTransferFrom(address(this), _owner, _tokenId);

        stakedTotal--;
        emit Unstaked(_owner, _tokenId);
    }

    function updateReward(address owner) public {
        Staker storage staker = stakers[owner];
        uint256[] storage ids = staker.tokenIds;

        for (uint256 i = 0; i < ids.length; i++) {
            if (staker.tokenStakingCoolDown[ids[i]] + stakingTime > block.timestamp && staker.tokenStakingCoolDown[ids[i]] > 0) {
                staker.balance += reward;
                staker.tokenStakingCoolDown[ids[i]] = block.timestamp;
            }
        }
    }

    function claimReward(address owner) public {
        require(stakers[owner].balance > 0, "0 rewards yet");

        uint256 value = stakers[owner].balance;
        stakers[owner].rewardReleased += value;
        stakers[owner].balance = 0;
        rewardToken.mint(owner, value);

        emit Rewarded(owner, value);
    }
}