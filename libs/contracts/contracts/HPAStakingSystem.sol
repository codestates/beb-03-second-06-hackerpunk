// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

interface IRewardToken is IERC20 {
    function mint(address to, uint256 amount) external;
}

contract HPAStakingSystem is Ownable, ERC721Holder {
    IRewardToken _rewardToken;
    IERC721 _nft;

    uint256 public stakedTotal;
    uint256 public stakingTime = 2 seconds;
    uint256 public reward = 1e18;

    mapping(address => Staker) public stakers;
    mapping(uint256 => address) tokenOwner;

    struct Staker {
        uint256[] tokenIds;
        mapping(uint256 => uint256) tokenIdToStakingTime;
        uint256 balance; // reward accumulated
        uint256 rewardReleased; // total reward released;
    }

    constructor(IRewardToken rewardToken, IERC721 nft) {
        _rewardToken = rewardToken;
        _nft = nft;
    }

    event Staked(address owner, uint256 tokenId);
    event Unstaked(address owner, uint256 tokenId);
    event Rewarded(address indexed user, uint256 reward);

    function stakedTokenIdsByOwner(address owner) public view returns (uint256[] memory) {
        return stakers[owner].tokenIds;
    }

    function setReward(uint256 _reward) public onlyOwner {
        reward = _reward;
    }

    function getStakerBalance(address staker) public view returns (uint256) {
        return stakers[staker].balance;
    }

    function stake(uint256 tokenId) public {
        _stake(msg.sender, tokenId);
    }

    function _stake(address _owner, uint256 _tokenId) internal {
        require(_nft.ownerOf(_tokenId) == _owner, "user is not the owner of this token");

        Staker storage staker = stakers[_owner];
        staker.tokenIds.push(_tokenId);
        staker.tokenIdToStakingTime[_tokenId] = block.timestamp;
        tokenOwner[_tokenId] = _owner;
        _nft.safeTransferFrom(_owner, address(this), _tokenId); // owner should approve tokenId to this contract beforehand

        stakedTotal++;
        emit Staked(_owner, _tokenId);
    }

    function unstake(uint256 tokenId) public {
        claimReward(msg.sender);
        _unstake(msg.sender, tokenId);
    }

    function _unstake(address _owner, uint256 _tokenId) internal {
        require(tokenOwner[_tokenId] == _owner, "user is not the owner of token");

        Staker storage staker = stakers[_owner];
        require(staker.tokenIds.length > 0, "No token to unstake");

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
            staker.tokenIdToStakingTime[_tokenId] = 0;
        }
        delete tokenOwner[_tokenId];
        _nft.safeTransferFrom(address(this), _owner, _tokenId);

        stakedTotal--;
        emit Unstaked(_owner, _tokenId);
    }

    function updateReward() public {
        Staker storage staker = stakers[msg.sender];
        uint256[] storage ids = staker.tokenIds;

        for (uint256 i = 0; i < ids.length; i++) {
            if (staker.tokenIdToStakingTime[ids[i]] + stakingTime < block.timestamp && staker.tokenIdToStakingTime[ids[i]] > 0) {
                staker.balance += reward;
                staker.tokenIdToStakingTime[ids[i]] = block.timestamp;
            }
        }
    }

    function claimReward(address owner) public {
        require(msg.sender == address(this) || msg.sender == owner, "not the owner");
        require(stakers[owner].balance > 0, "0 rewards yet");

        uint256 value = stakers[owner].balance;
        stakers[owner].rewardReleased += value;
        stakers[owner].balance = 0;
        _rewardToken.mint(owner, value);

        emit Rewarded(owner, value);
    }
}