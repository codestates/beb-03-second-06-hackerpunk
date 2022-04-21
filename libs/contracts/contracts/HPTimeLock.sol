// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HPTimeLock is Ownable {
    using SafeERC20 for IERC20;

    IERC20 private immutable _token;
    uint256 public lockTime = 14 days;

    struct LockInfo {
        address writer;
        uint256 startTime;
        uint256 totalBalance;
        mapping(address => uint256) donations;
    }

    mapping(uint256 => bool) articleToDonationStatus;
    mapping(uint256 => LockInfo) articleToLockInfo;

    constructor(IERC20 token_) {
        _token = token_;
    }

    function checkArticleStatus(uint256 article) public view returns (bool) {
        return articleToDonationStatus[article];
    }

    function lock(uint256 articleId, address writer, address donator, uint256 amount) public onlyOwner {
        articleToDonationStatus[articleId] = true;

        LockInfo storage lockInfo = articleToLockInfo[articleId];
        lockInfo.writer = writer;
        lockInfo.startTime = block.timestamp;
        lockInfo.totalBalance += amount;
        lockInfo.donations[donator] = amount;
    }

    function increaseLockAmount(uint256 articleId, address donator, uint256 amount) public onlyOwner{
        require(articleToDonationStatus[articleId] == true, "not donation status");
        
        LockInfo storage lockInfo = articleToLockInfo[articleId];
        lockInfo.totalBalance += amount;
        lockInfo.donations[donator] += amount;  
    }

    function revokeLock() public {
        // 돈을 다시 모두에게 돌려줘야함.
    }
    function revokeLockAmount() public {
        // 도네 취소 경우
    }

    function release(uint256 articleId) external {
        require(block.timestamp >= articleToLockInfo[articleId].startTime + lockTime, "Not yet");

        uint256 amount = _token.balanceOf(address(this));
        require(amount > 0, "TokenTimelock: no tokens to release");

        _token.safeTransfer(articleToLockInfo[articleId].writer, amount);

        articleToDonationStatus[articleId] = false;
        delete articleToLockInfo[articleId]; // pointer issue??
    }
}