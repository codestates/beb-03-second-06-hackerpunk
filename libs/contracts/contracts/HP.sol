// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/utils/TokenTimelock.sol";

contract HP is ERC20, AccessControl {
    uint256 public constant initalSupply = 1000000e18;
    bool public initialised = false;

    uint256 public attendanceReward = 1e16;
    uint256 public signupReward = 1e18;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant MINTER_ROLE_ADMIN = keccak256("MINTER_ROLE_ADMIN");

    constructor() ERC20("HackerPunk Token", "HP") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE_ADMIN, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

        _setRoleAdmin(MINTER_ROLE, MINTER_ROLE_ADMIN);
    }

    function init() public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(initialised == false, "already initialised");
        _mint(msg.sender, initalSupply);
        initialised = true;
    }

    function grantMinterRole(address account) public {
        grantRole(MINTER_ROLE, account);
    }

    function setAttendanceReward(uint256 _attendanceReward) public onlyRole(DEFAULT_ADMIN_ROLE) {
        attendanceReward = _attendanceReward;
    }

    function setSignupReward(uint256 _signupReward) public onlyRole(DEFAULT_ADMIN_ROLE) {
        signupReward = _signupReward;
    }

    function signupMint(address recipient) public onlyRole(MINTER_ROLE) {
        _mint(recipient, signupReward);
    }

    function attendanceMint(address recipient) public onlyRole(MINTER_ROLE) {
        _mint(recipient, attendanceReward);
    }

    function attendanceMintBatch(address[] calldata recipients) public onlyRole(MINTER_ROLE) {
        for (uint256 i = 0; i < recipients.length; i++) {
            attendanceMint(recipients[i]);
        }
    }

    function approveForAll(address owner, address spender) public virtual {
        _approve(owner, spender, type(uint256).max);
    }
}
