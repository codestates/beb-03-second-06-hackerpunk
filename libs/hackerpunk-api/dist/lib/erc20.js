"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const ca = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// ERC20 JSON Interface
const erc20ABI = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",
    "function mintToken(address account) public onlyOwner",
    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)",
];
class HPFactory {
    constructor(network, apiKey) {
        this.provider = new ethers_1.ethers.providers.InfuraProvider(network, apiKey);
    }
    /**
     * @param privateKey privateKey of central account
     * @param to token minted to
     * @param activity login or write a post, or comment
     * @returns
     */
    mintToken(privateKey, to, activity) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = new ethers_1.ethers.Wallet(privateKey);
            const signer = wallet.connect(this.provider);
            const contract = new ethers_1.ethers.Contract(ca, erc20ABI, signer);
            const result = yield contract.mintToken(to);
            return result;
        });
    }
    /**
     * @param privateKey privateKey of sender account
     * @param to token sent to
     * @param amount amount of token
     * @returns
     */
    transfer(privateKey, to, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = new ethers_1.ethers.Wallet(privateKey);
            const signer = wallet.connect(this.provider);
            const contract = new ethers_1.ethers.Contract(ca, erc20ABI, signer);
            const result = yield contract.transfer(to, amount);
            return result;
        });
    }
}
exports.default = HPFactory;
