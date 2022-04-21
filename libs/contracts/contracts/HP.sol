// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/utils/TokenTimelock.sol";
import "./HPTimeLock.sol";

contract HP is ERC20, AccessControl {
    uint256 public constant initalSupply = 1000e18;
    bool public initialised = false;

    HPTimeLock tokenLock;

    uint256 public _attendanceReward;
    uint256 public _signupReward;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant MINTER_ROLE_ADMIN = keccak256("MINTER_ROLE_ADMIN");

    constructor() ERC20("HackerPunk Token", "HP") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE_ADMIN, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

        _setRoleAdmin(MINTER_ROLE, MINTER_ROLE_ADMIN);
        _attendanceReward = 1e18;
    }

    function init(HPTimeLock tokenLock_) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(initialised == false, "already initialised");
        _mint(msg.sender, initalSupply);
        tokenLock = tokenLock_;
        initialised = true;
    }

    function setAttendanceReward(uint256 attendanceReward) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _attendanceReward = attendanceReward;
    }

    function setSignupReward(uint256 signupReward) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _signupReward = signupReward;
    }

    function signupMint(address recipient) public {
        _mint(recipient, _signupReward);
    }

    function attendanceMint(address recipient) public {
        _mint(recipient, _attendanceReward);
    }

    function attendanceMintBatch(address[] calldata recipients) public {
        for (uint256 i = 0; i < recipients.length; i++) {
            attendanceMint(recipients[i]);
        }
    }

    function donate(uint256 articleId, address donator, address writer, uint256 amount) public returns (bool) {
        transferFrom(donator, address(tokenLock), amount);
        tokenLock.lock(articleId, donator, writer, amount);

        return true;
    }
}