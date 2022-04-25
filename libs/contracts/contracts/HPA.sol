// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract HPA is ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant MINTER_ROLE_ADMIN = keccak256("MINTER_ROLE_ADMIN");

    constructor() ERC721("HackerPunk Article", "HPA") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE_ADMIN, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

        _setRoleAdmin(MINTER_ROLE, MINTER_ROLE_ADMIN);
    }
    
    function grantMinterRole(address account) public {
        grantRole(MINTER_ROLE, account);
    }

    function safeMint(address to, string memory tokenURI) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenId.current();
        _tokenId.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
