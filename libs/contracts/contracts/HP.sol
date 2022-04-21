// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HP is ERC20, Ownable {
    uint256 public _attendanceReward;

    struct DonateRecord {
        address from;
        address to;
        uint256 amount;
    }

    constructor() ERC20("HackerPunk Token", "HP") {
        _attendanceReward = 1e18;
    }

    function attendanceMint(address recipient) public onlyOwner returns (bool) {
        _mint(recipient, _attendanceReward);
        return true;
    }

    function attendanceMintBatch(address[] calldata recipients) public onlyOwner returns (bool) {
        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], _attendanceReward);
        }
        return true;
    }

    function donateBatch(DonateRecord[] calldata dr) public onlyOwner returns (bool) {
        for (uint256 i = 0; i < dr.length; i++) {
            uint256 donation;
            if (dr[i].amount % 2 == 1) {
                donation = (dr[i].amount - 1) / 2;
            } else {
                donation = dr[i].amount / 2;
            }
            _transfer(dr[i].from, dr[i].to, donation);
            _burn(dr[i].from, dr[i].amount - donation);
        }
        return true;
    }
}