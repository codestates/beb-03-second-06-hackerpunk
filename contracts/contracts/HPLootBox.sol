// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HP is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 token;
    uint256 nftPrice;
    string public baseTokenURI;

    constructor() ERC721("HackerPunk NFT", "HP"){
        nftPrice = 1 ether;
        baseTokenURI = "";
    }

    function setToken(address erc20TokenAddress) public onlyOwner returns (bool) {
        require(erc20TokenAddress != address(0x0), "Invalid address");
        token = IERC20(erc20TokenAddress);
        return true;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _base_url;
    }

    function setBaseTokenURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function mintTo(address recipient) public onlyOwner returns (uint256) {
        require(token.balanceOf(recipient) >= nftPrice, "Not enough balance of recipient");

        token.transferFrom(recipient, msg.sender, nftPrice);

        uint256 tokenId = _tokenIds.current();
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(recipient, newItemId);

        return newItemId;
    }
}