// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BEB is ERC20, Ownable {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        
    }

    + {
        require(to != address(0x0));
        approve(account, msg.sender, 100);
        _mint(account, 100);
    }
}