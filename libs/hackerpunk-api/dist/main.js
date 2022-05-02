var $8zHUo$ethlightwallet = require("eth-lightwallet");
var $8zHUo$ethers = require("ethers");
var $8zHUo$web3 = require("web3");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "HP", () => $4f2d27e7bb08be92$export$2f4fd17aff4e7fc);
$parcel$export(module.exports, "HPTimeLock", () => $c6d12b18f5e7b653$export$948472b202b3236b);
$parcel$export(module.exports, "PHPTimeLock", () => $072f7a5feedb334e$export$2a9ff338dd4da85e);
$parcel$export(module.exports, "ExternalHP", () => $1bdf165e5fb3c2c0$export$7fb3e24a412a5622);
$parcel$export(module.exports, "setProvider", () => $844002365fcdc02f$export$1572b3eade6662f9);
$parcel$export(module.exports, "HPA", () => $2dacf9daeccfc13d$export$5878c2c4222e4fe7);
$parcel$export(module.exports, "PHP", () => $2c5e294af188e6fb$export$75e463e960baeac);
$parcel$export(module.exports, "HPAStakingSystem", () => $0f2effce3e5d2a70$export$8ee31b378e074166);
$parcel$export(module.exports, "setWallet", () => $844002365fcdc02f$export$e61ca58b6d981800);
$parcel$export(module.exports, "setSigner", () => $844002365fcdc02f$export$5e413b7d07c04d66);
$parcel$export(module.exports, "createWallet", () => $a3136578afa07f27$export$41bdf21621ec4e24);
$parcel$export(module.exports, "Web3", () => $1bdf165e5fb3c2c0$import$3a9e00449556c6e1$2e2bcd8739ae039);

/**
 * @method: returns address and privateKey
 * @param {string} pwd user password
 * @return {Promise} object of address, privateKey and mnemonic
 */ const $a3136578afa07f27$export$41bdf21621ec4e24 = (pwd)=>{
    return new Promise((resolve, reject)=>{
        let secretSeed = $8zHUo$ethlightwallet.keystore.generateRandomSeed();
        $8zHUo$ethlightwallet.keystore.createVault({
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



class $4f2d27e7bb08be92$export$2f4fd17aff4e7fc {
    constructor(signer, contractAddress, abi){
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.contract = new $8zHUo$ethers.ethers.Contract(this.contractAddress, this.abi, signer);
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



class $c6d12b18f5e7b653$export$948472b202b3236b {
    constructor(signer, contractAddress, abi){
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.contract = new $8zHUo$ethers.ethers.Contract(this.contractAddress, this.abi, signer);
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



class $072f7a5feedb334e$export$2a9ff338dd4da85e extends $c6d12b18f5e7b653$export$948472b202b3236b {
    constructor(signer, contractAddress, abi){
        super(signer, contractAddress, abi);
    }
}




class $1bdf165e5fb3c2c0$export$7fb3e24a412a5622 {
    constructor(signer, contractAddress, abi){
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.contract = new $8zHUo$ethers.ethers.Contract(this.contractAddress, this.abi, signer);
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
        const web3 = new ($parcel$interopDefault($8zHUo$web3))(new ($parcel$interopDefault($8zHUo$web3)).providers.HttpProvider(provider));
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



class $2dacf9daeccfc13d$export$5878c2c4222e4fe7 {
    constructor(signer, contractAddress, abi){
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.contract = new $8zHUo$ethers.ethers.Contract(this.contractAddress, this.abi, signer);
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



class $2c5e294af188e6fb$export$75e463e960baeac {
    constructor(signer, contractAddress, abi){
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.contract = new $8zHUo$ethers.ethers.Contract(this.contractAddress, this.abi, signer);
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



class $0f2effce3e5d2a70$export$8ee31b378e074166 {
    constructor(signer, contractAddress, abi){
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.contract = new $8zHUo$ethers.ethers.Contract(this.contractAddress, this.abi, signer);
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



const $844002365fcdc02f$export$1572b3eade6662f9 = (network, provider, key)=>{
    let options;
    if (provider !== undefined) options = {
        [provider]: key
    };
    if (network === undefined) return $8zHUo$ethers.ethers.getDefaultProvider("homestead", options);
    else {
        if (network.startsWith("wss") || network.startsWith("http")) return $8zHUo$ethers.ethers.getDefaultProvider(network);
        else return $8zHUo$ethers.ethers.getDefaultProvider(network, options);
    }
};
const $844002365fcdc02f$export$e61ca58b6d981800 = (privateKey)=>{
    return new $8zHUo$ethers.ethers.Wallet(privateKey);
};
const $844002365fcdc02f$export$5e413b7d07c04d66 = (wallet, provider)=>{
    return wallet.connect(provider);
};




//# sourceMappingURL=main.js.map
