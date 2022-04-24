// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./HP.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExternalHP is Ownable {
    HP hp;
    uint256 public signupFee;

    mapping(address => address) addressRecorder;
    address[] serverAccounts;

    event Signup(address indexed serverAccount, address indexed externalAccount);

    constructor(HP _hp) {
        hp = _hp;
    }

    function getAllServerAccounts() public view onlyOwner returns (address[] memory) {
        return serverAccounts;
    }

    function setSignupFee(uint256 _signupFee) public onlyOwner {
        signupFee = _signupFee;
    }

    function regsiterExternal(address serverAccount) public payable {
        require(msg.value == signupFee, "Invalid Fee");
        require(addressRecorder[serverAccount] == address(0x0), "Already Registered");
        payable(owner()).transfer(msg.value);
        hp.signupMint(serverAccount);

        addressRecorder[serverAccount] = msg.sender;
        serverAccounts.push(serverAccount);

        emit Signup(serverAccount, msg.sender);
    }
}