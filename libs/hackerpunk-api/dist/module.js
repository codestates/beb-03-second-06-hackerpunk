import {keystore as $hgUW1$keystore} from "eth-lightwallet";
import {ethers as $hgUW1$ethers} from "ethers";


/**
 * @method: returns address and privateKey
 * @param {string} pwd user password
 * @return {Promise} object of address, privateKey and mnemonic
 */ const $c825517a4d31fba5$export$41bdf21621ec4e24 = (pwd)=>{
    return new Promise((resolve, reject)=>{
        let secretSeed = $hgUW1$keystore.generateRandomSeed();
        $hgUW1$keystore.createVault({
            password: pwd,
            seedPhrase: secretSeed,
            hdPathString: "m/0'/0'/0'"
        }, (err1, ks)=>{
            if (err1) reject(err1);
            ks.keyFromPassword(pwd, (err, pwDeriveKey)=>{
                if (err) reject(err);
                ks.generateNewAddress(pwDeriveKey, 1);
                let address = ks.getAddresses().toString();
                let privateKey = ks.exportPrivateKey(address, pwDeriveKey);
                resolve({
                    address: address,
                    privateKey: privateKey,
                    mnemonic: secretSeed
                });
            });
        });
    });
};



class $6472a0cc883e062f$export$2f4fd17aff4e7fc {
    constructor(signer, contractAddress, abi){
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.contract = new $hgUW1$ethers.Contract(this.contractAddress, this.abi, signer);
    }
    /**
   * @method change signer of contract
   * @param signer
   */ async changeContractSigner(signer) {
        this.contract = this.contract.connect(signer);
    }
    /**
   * @method initial minting once, only admin
   */ async init() {
        await this.contract.init();
    }
    /**
   * @method enable ExternalHP Contract to mint
   */ async grantMinterRole(contract) {
        await this.contract.grantMinterRole(contract);
    }
    /**
   * @method set signup token reward, only admin
   */ async setSignupReward(signupReward) {
        await this.contract.setSignupReward();
    }
    /**
   * @method set attendacne token reward, only admin
   */ async setAttendanceReward(attendanceReward) {
        await this.contract.setAttendanceReward();
    }
    /**
   * @method mint token to reward signup, only minter
   */ async signupMint(recipient) {
        await this.contract.signupMint();
    }
    /**
   * @method mint token to reward attendacne, only minter
   */ async attendanceMint(recipient) {
        await this.contract.attendacneMint();
    }
    /**
   * @method mint token to reward users at once, only minter
   */ async attendanceMintBatch(recipients) {
        await this.contract.attendanceMintBatch();
    }
    /**
   * @method check balance of user
   */ async balanceOf(user) {
        return await this.contract.balanceOf(user);
    }
}



class $b5c9f8736c9df79f$export$948472b202b3236b {
    constructor(signer, contractAddress, abi){
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.contract = new $hgUW1$ethers.Contract(this.contractAddress, this.abi, signer);
    }
    /**
   * @method change signer of contract
   * @param signer
   */ async changeContractSigner(signer) {
        this.contract = this.contract.connect(signer);
    }
    /**
   * @returns 0: not started, 1: proceeding 2: complete, 3: reverted
   */ async checkDonationStatus(articleId) {
        return await this.contract.checkDonationStatus(articleId);
    }
    async getDonators(articleId) {
        return await this.contract.getDonators(articleId);
    }
    async getDonationBalance(articleId) {
        return await this.contract.getDonationBalance(articleId);
    }
    /**
   * @method donator approve donation token to HPTimeLock contract and then, this token locked, only owner
   * @param hp HP's Contract should be connected to donator's signer
   */ async donate(hp, articleId, donator, writer, amount) {
        await hp.contract.approve(this.contract.address, amount);
        await this.contract.donate(articleId, donator, writer, amount);
    }
    /**
   * @method article removed, all token donated are returned to donators, only owner
   */ async revokeAll(articleId, writer) {
        await this.contract.revokeAll(articleId, writer);
    }
    /**
   * @method donator revoke donation and token returned, only owner
   */ async revokeDonate(articleId, donator) {
        await this.contract.revokeDonate(articleId, donator);
    }
    /**
   * @method donation token released to writer after lock time, only owner
   */ async release(articleId, writer) {
        await this.contract.release(articleId, writer);
    }
}



const $24ea454e7ad63d7f$export$1572b3eade6662f9 = (network, provider, key)=>{
    if (network === undefined) return $hgUW1$ethers.getDefaultProvider();
    else {
        if (network.startsWith("wss") || network.startsWith("http")) return $hgUW1$ethers.getDefaultProvider(network);
        else {
            if (provider !== undefined) {
                const options = {
                    [provider]: key
                };
                return $hgUW1$ethers.getDefaultProvider(network, options);
            } else return new Error("provider is not correct");
        }
    }
};
const $24ea454e7ad63d7f$export$e61ca58b6d981800 = (privateKey)=>{
    return new $hgUW1$ethers.Wallet(privateKey);
};
const $24ea454e7ad63d7f$export$5e413b7d07c04d66 = (wallet, provider)=>{
    return wallet.connect(provider);
};




export {$6472a0cc883e062f$export$2f4fd17aff4e7fc as HP, $b5c9f8736c9df79f$export$948472b202b3236b as HPTimeLock, $24ea454e7ad63d7f$export$1572b3eade6662f9 as setProvider, $24ea454e7ad63d7f$export$e61ca58b6d981800 as setWallet, $24ea454e7ad63d7f$export$5e413b7d07c04d66 as setSigner, $c825517a4d31fba5$export$41bdf21621ec4e24 as createWallet};
//# sourceMappingURL=module.js.map