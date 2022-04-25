// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract PHP is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant MINTER_ROLE_ADMIN = keccak256("MINTER_ROLE_ADMIN");

    constructor() ERC20("Previleged HackerPunk Token", "PHP") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE_ADMIN, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

        _setRoleAdmin(MINTER_ROLE, MINTER_ROLE_ADMIN);
    }

    function grantMinterRole(address account) public {
        grantRole(MINTER_ROLE, account);
    }

    function  mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
}
