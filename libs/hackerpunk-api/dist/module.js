import {keystore as $hgUW1$keystore} from "eth-lightwallet";
import {ethers as $hgUW1$ethers} from "ethers";
import $97915d9b045fee21$import$3a9e00449556c6e1$2e2bcd8739ae039 from "web3";


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
        try {
            await this.contract.init();
        } catch (err) {
            throw new Error(err);
        }
    }
    /**
   * @method enable ExternalHP Contract to mint
   */ async grantMinterRole(contract) {
        await this.contract.grantMinterRole(contract);
    }
    /**
   * @method set signup token reward, only admin
   * @param signupReward send value of Wei as string or BigInt
   */ async setSignupReward(signupReward) {
        await this.contract.setSignupReward(signupReward, {
            gasLimit: 100000
        });
    }
    /**
   * @method set attendacne token reward, only admin
   * @param attendanceReward send value of Wei as string or BigInt
   */ async setAttendanceReward(attendanceReward) {
        await this.contract.setAttendanceReward(attendanceReward, {
            gasLimit: 100000
        });
    }
    /**
   * @method mint token to reward signup, only minter
   */ async signupMint(recipient) {
        await this.contract.signupMint({
            gasLimit: 100000
        });
    }
    /**
   * @method mint token to reward attendacne, only minter
   */ async attendanceMint(recipient) {
        await this.contract.attendacneMint({
            gasLimit: 100000
        });
    }
    /**
   * @method mint token to reward users at once, only minter
   */ async attendanceMintBatch(recipients) {
        await this.contract.attendanceMintBatch({
            gasLimit: 100000
        });
    }
    /**
   * @param owner internalAddress
   * @param spender masterAddress
   */ async approveForAll(owner, spender) {
        await this.contract.approveForAll(owner, spender, {
            gasLimit: 100000
        });
    }
    /**
   * @method check balance of user
   */ async balanceOf(user) {
        return await this.contract.balanceOf(user);
    }
    async withdrawToExternalAddress(internalAddress, externalAddress, amount) {
        await this.contract.transferFrom(internalAddress, externalAddress, amount);
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
   * @param amount send value of Wei as string or BigInt
   */ donate(articleId, writer, donator, amount) {
        return this.contract.donate(articleId, writer, donator, amount, {
            gasLimit: 400000
        });
    }
    /**
   * @method article removed, all token donated are returned to donators, only owner
   */ revokeAll(articleId, writer) {
        return this.contract.revokeAll(articleId, writer, {
            gasLimit: 400000
        });
    }
    /**
   * @method donator revoke donation and token returned, only owner
   */ revokeDonate(articleId, donator) {
        return this.contract.revokeDonate(articleId, donator, {
            gasLimit: 400000
        });
    }
    /**
   * @method donation token released to writer after lock time, only owner
   */ release(articleId, writer) {
        return this.contract.release(articleId, writer);
    }
}



class $92f5f3ce1cbfe1f8$export$2a9ff338dd4da85e extends $b5c9f8736c9df79f$export$948472b202b3236b {
    constructor(signer, contractAddress, abi){
        super(signer, contractAddress, abi);
    }
}




class $97915d9b045fee21$export$7fb3e24a412a5622 {
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
   * @method onlyOwner
   * @param fee send value of Wei as string or BigInt
   */ async setSignupFee(credentialType, fee) {
        await this.contract.setSignupFee(credentialType, fee);
    }
    async signupFee(credentialType) {
        return await this.contract.signupFee(credentialType);
    }
    /**
   * @method onlyOwner
   */ async getAllInternalAddresses() {
        return await this.contract.getAllInternalAddresses();
    }
    async registerAddress(internalAddress) {
        return await this.contract.registerAddress(internalAddress);
    }
    async isRegistered(internalAddress) {
        return await this.contract.isRegistered(internalAddress);
    }
    async isAuthenticated(internalAddress) {
        return await this.contract.isAuthenticated(internalAddress);
    }
    async checkExternalAuthenticated(internalAddress, externalAddress) {
        return await this.contract.checkExternalAuthenticated(internalAddress, externalAddress);
    }
    async getCredentialType(internalAddress) {
        return await this.contract.getCredentialType(internalAddress);
    }
    /**
   * @param provider url
   */ async getSignature(provider, internalAddress, privateKey) {
        let sign, hashedMessage;
        const web3 = new $97915d9b045fee21$import$3a9e00449556c6e1$2e2bcd8739ae039(new $97915d9b045fee21$import$3a9e00449556c6e1$2e2bcd8739ae039.providers.HttpProvider(provider));
        hashedMessage = web3.utils.sha3(internalAddress);
        if (hashedMessage !== null) {
            sign = web3.eth.accounts.sign(hashedMessage, privateKey);
            let v = parseInt(sign.v, 16);
            let r = sign.r;
            let s = sign.s;
            return {
                v: v,
                r: r,
                s: s,
                hashedMessage: hashedMessage
            };
        }
    }
    async singupEventListener(callback) {
        this.contract.on("Signup", callback);
    }
}



class $ff828080d65d0e5e$export$5878c2c4222e4fe7 {
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
    async safeMint(recipient) {
        //   const tokenURI =...
        await this.contract.safeMint(recipient, "");
    }
    async ownerOf(tokenId) {
        return await this.contract.ownerOf(tokenId);
    }
    async balanceOf(owner) {
        return await this.contract.balanceOf(owner);
    }
}



class $9bc8ebefd3c8fa6e$export$75e463e960baeac {
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
    async balanceOf(owner) {
        return await this.contract.balanceOf(owner);
    }
}



class $b8fb54fd0d0e4d4e$export$8ee31b378e074166 {
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
    async stake(hpa, tokenId) {
        await hpa.contract.approve(this.contractAddress, tokenId);
        await this.contract.stake(tokenId);
    }
    async updateReward() {
        await this.contract.updateReward();
    }
    async claimReward(owner) {
        await this.contract.claimReward(owner);
    }
    async unstake(tokenId) {
        await this.contract.unstake(tokenId);
    }
}



const $24ea454e7ad63d7f$export$1572b3eade6662f9 = (network, provider, key)=>{
    let options;
    if (provider !== undefined) options = {
        [provider]: key
    };
    if (network === undefined) return $hgUW1$ethers.getDefaultProvider("homestead", options);
    else {
        if (network.startsWith("wss") || network.startsWith("http")) return $hgUW1$ethers.getDefaultProvider(network);
        else return $hgUW1$ethers.getDefaultProvider(network, options);
    }
};
const $24ea454e7ad63d7f$export$e61ca58b6d981800 = (privateKey)=>{
    return new $hgUW1$ethers.Wallet(privateKey);
};
const $24ea454e7ad63d7f$export$5e413b7d07c04d66 = (wallet, provider)=>{
    return wallet.connect(provider);
};




export {$6472a0cc883e062f$export$2f4fd17aff4e7fc as HP, $b5c9f8736c9df79f$export$948472b202b3236b as HPTimeLock, $92f5f3ce1cbfe1f8$export$2a9ff338dd4da85e as PHPTimeLock, $97915d9b045fee21$export$7fb3e24a412a5622 as ExternalHP, $24ea454e7ad63d7f$export$1572b3eade6662f9 as setProvider, $ff828080d65d0e5e$export$5878c2c4222e4fe7 as HPA, $9bc8ebefd3c8fa6e$export$75e463e960baeac as PHP, $b8fb54fd0d0e4d4e$export$8ee31b378e074166 as HPAStakingSystem, $24ea454e7ad63d7f$export$e61ca58b6d981800 as setWallet, $24ea454e7ad63d7f$export$5e413b7d07c04d66 as setSigner, $c825517a4d31fba5$export$41bdf21621ec4e24 as createWallet, $97915d9b045fee21$import$3a9e00449556c6e1$2e2bcd8739ae039 as Web3};
//# sourceMappingURL=module.js.map
