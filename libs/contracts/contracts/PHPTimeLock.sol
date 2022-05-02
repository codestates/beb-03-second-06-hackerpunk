// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./HPTimeLock.sol";

contract PHPTimeLock is HPTimeLock {
    constructor(IERC20 token_) HPTimeLock(token_) {

    }
}