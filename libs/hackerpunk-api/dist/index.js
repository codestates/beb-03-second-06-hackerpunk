"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWallet = exports.HPFactory = void 0;
const erc20_1 = __importDefault(require("./lib/erc20"));
exports.HPFactory = erc20_1.default;
const wallet_1 = require("./lib/wallet");
Object.defineProperty(exports, "createWallet", { enumerable: true, get: function () { return wallet_1.createWallet; } });
