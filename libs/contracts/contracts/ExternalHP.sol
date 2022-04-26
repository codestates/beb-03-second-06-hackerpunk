// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./HP.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExternalHP is Ownable {
    HP hp;
    uint256[256] public signupFee; // signupFee according to credentialType(uint8)

    struct AddressInfo {
        uint8 credentialType; // 후에 있을지도 모를 가입 타입의 여지를 주기 위해 불리언이 아닌 0~255를 줌
        address externalAddress;
    }

    mapping(address => AddressInfo) addressRecorder;
    address[] internalAddresses;

    event Signup(address indexed internalAddress, address indexed externalAddress);

    constructor(HP _hp) {
        hp = _hp;
        signupFee[1] = 0.001 ether; // 기본 타입
    }

    function getAllInternalAddresses() public view onlyOwner returns (address[] memory) {
        return internalAddresses;
    }

    function setSignupFee(uint8 credentialType, uint256 _signupFee) public onlyOwner {
        signupFee[credentialType] = _signupFee;
    }

    function registerAddress(address internalAddress) public onlyOwner {
        AddressInfo storage addr = addressRecorder[internalAddress];

        require(addr.credentialType == uint8(0), "already registered account");

        addr.credentialType = 1;
    }

    function isRegistered(address internalAddress) public view returns (bool) {
        return addressRecorder[internalAddress].credentialType != 0;
    }

    function isAuthenticated(address internalAddress) public view returns (bool) {
        return addressRecorder[internalAddress].externalAddress != address(0x0);
    }

    function checkExternalAuthenticated(address internalAddress, address externalAddress) public view returns (bool) {
        return addressRecorder[internalAddress].externalAddress == externalAddress;
    }

    function getCredentialType(address internalAddress) public view returns (uint8) {
        return addressRecorder[internalAddress].credentialType;
    }   

    function changeCredentialType(uint8 credentialType, address internalAddress) public payable {
        AddressInfo storage addr = addressRecorder[internalAddress];
        require(addr.externalAddress == msg.sender, "request account is invalid");

        uint8 prevType = addr.credentialType;

        if (signupFee[credentialType] > signupFee[prevType]) {
            uint256 fee;
            unchecked {
                fee = signupFee[credentialType] - signupFee[prevType];
            }
            require(msg.value == fee, "Invalid Fee");
            payable(owner()).transfer(msg.value);
        } 
        addr.credentialType = credentialType;
    }

    function authenticate(address internalAddress) public payable {
        AddressInfo storage addr = addressRecorder[internalAddress];

        require(addr.credentialType > uint8(0), "not registered account");
        require(addr.externalAddress == address(0x0), "already signed account");
        require(msg.value == signupFee[1], "Invalid Fee");

        addr.externalAddress = msg.sender;

        payable(owner()).transfer(msg.value);
        hp.signupMint(internalAddress);
        internalAddresses.push(internalAddress);

        emit Signup(internalAddress, msg.sender);
    }
}