// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HPTimeLock is Ownable {
    using SafeERC20 for IERC20;

    IERC20 private immutable _token;
    uint256 public lockTime = 30 seconds;

    enum DonationStatus {
        DonationStatus_NotStarted, DonationStatus_Proceeding, DonationStatus_Complete, DonationStatus_Reverted
    }

    struct DonationInfo {
        DonationStatus donationStatus;
        address writer;
        uint256 donation;
        address[] donators;
    }

    struct LockInfo {
        address writer;
        uint256 startTime;
        uint256 totalBalance;
        address[] donators;
        mapping(address => uint256) donations;
    }

    mapping(uint256 => DonationInfo) public articleToDonationInfo;
    mapping(uint256 => LockInfo) public articleToLockInfo;

    constructor(IERC20 token_) {
        _token = token_;
    }

    function token() public view returns (IERC20) {
        return _token;
    }

    function _checkArticleStatus(uint256 _articleId) internal view returns (DonationStatus) {
        return articleToDonationInfo[_articleId].donationStatus;
    }

    function getDonationBalance(uint256 articleId) public view returns (uint256) {
        return articleToLockInfo[articleId].totalBalance;
    }

    function donate(uint256 articleId, address donator, address writer, uint256 amount) public onlyOwner {
        DonationStatus ds = _checkArticleStatus(articleId);
        require(ds == DonationStatus.DonationStatus_NotStarted || ds == DonationStatus.DonationStatus_Proceeding, "Invalid status");

        uint256 balance = token().balanceOf(donator);
        require(balance >= amount, "Not enough balance");
        LockInfo storage lockInfo = articleToLockInfo[articleId];
        DonationInfo storage donationInfo = articleToDonationInfo[articleId];
        if (_checkArticleStatus(articleId) == DonationStatus.DonationStatus_NotStarted) {
            donationInfo.donationStatus = DonationStatus.DonationStatus_Proceeding;
            donationInfo.writer = writer;
            lockInfo.writer = writer;
            lockInfo.startTime = block.timestamp;
        }

        token().safeTransferFrom(donator, address(this), amount);
        lockInfo.totalBalance += amount;
        lockInfo.donators.push(donator);
        lockInfo.donations[donator] = amount;
    }

    function revokeAll(uint256 articleId, address writer) public onlyOwner {
        require(_checkArticleStatus(articleId) == DonationStatus.DonationStatus_Proceeding, "Invalid status");

        LockInfo storage lockInfo = articleToLockInfo[articleId];
        address[] storage _donators = lockInfo.donators;

        require(writer == lockInfo.writer, "Not a writer");
        articleToDonationInfo[articleId].donationStatus = DonationStatus.DonationStatus_Reverted;

        for (uint256 i = 0; i < _donators.length; i++) {
            token().safeTransfer(_donators[i], lockInfo.donations[_donators[i]]);
        }

        delete articleToLockInfo[articleId];
    }
    function revokeDonate(uint256 articleId, address donator) public onlyOwner {
        require(_checkArticleStatus(articleId) == DonationStatus.DonationStatus_Proceeding, "Invalid status");

        LockInfo storage lockInfo = articleToLockInfo[articleId];
        uint256 amount = lockInfo.donations[donator];
        lockInfo.totalBalance -= amount;
        lockInfo.donations[donator] = 0;

        token().safeTransfer(donator, amount);
    }

    function release(uint256 articleId, address writer) public onlyOwner {
        require(block.timestamp >= articleToLockInfo[articleId].startTime + lockTime, "Not yet");

        DonationInfo storage donationInfo = articleToDonationInfo[articleId];
        LockInfo storage lockInfo = articleToLockInfo[articleId];
        address[] storage _donators = lockInfo.donators;

        require(donationInfo.donationStatus == DonationStatus.DonationStatus_Proceeding, "Not proceeding");
        require(writer == lockInfo.writer, "Not a writer");

        uint256 amount = token().balanceOf(address(this));
        for (uint256 i = 0; i < _donators.length; i++) {
            if (lockInfo.donations[_donators[i]] > 0) {
                donationInfo.donators.push(_donators[i]);
            }
        }

        require(amount >= lockInfo.totalBalance, "TokenTimelock: no tokens to release");

        token().safeTransfer(articleToLockInfo[articleId].writer, lockInfo.totalBalance);

        donationInfo.donationStatus = DonationStatus.DonationStatus_Complete;
        donationInfo.donation = lockInfo.totalBalance;

        delete articleToLockInfo[articleId];
    }
}