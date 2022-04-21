var $8zHUo$ethers = require("ethers");
var $8zHUo$ethlightwallet = require("eth-lightwallet");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "HP", () => $8c679179860be35b$export$2f4fd17aff4e7fc);
$parcel$export(module.exports, "HPA", () => $5bcbc5721fb60e92$export$5878c2c4222e4fe7);
$parcel$export(module.exports, "setProvider", () => $7c31348715c168e6$export$1572b3eade6662f9);
$parcel$export(module.exports, "createWallet", () => $c3abceea661ac960$export$41bdf21621ec4e24);

// const ca, abi
class $8c679179860be35b$export$2f4fd17aff4e7fc {
    constructor(provider, privateKey, contractAddress, abi){
        this.provider = provider;
        this.wallet = new $8zHUo$ethers.ethers.Wallet(privateKey);
        this.signer = this.wallet.connect(this.provider);
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.contractSigner = new $8zHUo$ethers.ethers.Contract(this.contractAddress, this.abi, this.signer);
        this.contractProvider = new $8zHUo$ethers.ethers.Contract(this.contractAddress, this.abi, this.provider);
    }
    /**
   *
   * @param address
   * @returns
   */ async balanceOf(address) {
        const result = await this.contractProvider.balanceOf(address);
        return result;
    }
    /**
   * @param recipient token minted to
   * @returns
   */ async attendanceMint(recipient) {
        const result = await this.contractSigner.attendanceMint(recipient);
        return result;
    }
    /**
   * @method mint at once, since tx fee
   * @param recipients array token minted to
   * @returns
   */ async attendanceMintBatch(recipients) {
        const result = await this.contractSigner.attendanceMintBatch(recipients);
        return result;
    }
    /**
   * @param donateRecord array of donate record: { from, to, amount }
   * @returns
   */ async donateBatch(donateRecord) {
        const result = await this.contractSigner.donateBatch(donateRecord);
        return result;
    }
}



// const ca, abi
class $5bcbc5721fb60e92$export$5878c2c4222e4fe7 {
    constructor(provider, privateKey, contractAddress, abi){
        this.provider = provider;
        this.wallet = new $8zHUo$ethers.ethers.Wallet(privateKey);
        this.signer = this.wallet.connect(this.provider);
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.contractSigner = new $8zHUo$ethers.ethers.Contract(this.contractAddress, this.abi, this.signer);
        this.contractProvider = new $8zHUo$ethers.ethers.Contract(this.contractAddress, this.abi, this.provider);
    }
}



const $7c31348715c168e6$export$1572b3eade6662f9 = (network, provider, key)=>{
    if (network === undefined) return $8zHUo$ethers.ethers.getDefaultProvider();
    if (network.startsWith("wss") || network.startsWith("http")) return $8zHUo$ethers.ethers.getDefaultProvider(network);
    const options = {
        [provider]: key
    };
    return $8zHUo$ethers.ethers.getDefaultProvider(network, options);
};



/**
 * @method: returns address and privateKey
 * @param {string} pwd user password
 * @return {Promise} object of address, privateKey and mnemonic
 */ const $c3abceea661ac960$export$41bdf21621ec4e24 = (pwd)=>{
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




//# sourceMappingURL=main.js.map
