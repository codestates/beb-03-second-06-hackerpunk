"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWallet = void 0;
const lightwallet = __importStar(require("eth-lightwallet"));
/**
 * @method: returns address and privateKey
 * @param {string} pwd user password
 * @return {Promise} object of address and privateKey
 */
const createWallet = (pwd) => {
    return new Promise((resolve, reject) => {
        let secretSeed = lightwallet.keystore.generateRandomSeed();
        lightwallet.keystore.createVault({
            password: pwd,
            seedPhrase: secretSeed,
            hdPathString: "m/0'/0'/0'",
        }, (err, ks) => {
            if (err)
                reject(err);
            ks.keyFromPassword(pwd, (err, pwDeriveKey) => {
                if (err)
                    reject(err);
                ks.generateNewAddress(pwDeriveKey, 1);
                let address = ks.getAddresses().toString();
                let privateKey = ks.exportPrivateKey(address, pwDeriveKey);
                resolve({ address, privateKey });
            });
        });
    });
};
exports.createWallet = createWallet;
