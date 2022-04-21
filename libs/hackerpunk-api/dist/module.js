import {ethers as $hgUW1$ethers} from "ethers";
import {keystore as $hgUW1$keystore} from "eth-lightwallet";


// const ca, abi
class $8a1a826cc015fcf1$export$2f4fd17aff4e7fc {
    constructor(provider, privateKey, contractAddress, abi){
        this.provider = provider;
        this.wallet = new $hgUW1$ethers.Wallet(privateKey);
        this.signer = this.wallet.connect(this.provider);
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.contractSigner = new $hgUW1$ethers.Contract(this.contractAddress, this.abi, this.signer);
        this.contractProvider = new $hgUW1$ethers.Contract(this.contractAddress, this.abi, this.provider);
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
class $04e41d0854aa7e66$export$5878c2c4222e4fe7 {
    constructor(provider, privateKey, contractAddress, abi){
        this.provider = provider;
        this.wallet = new $hgUW1$ethers.Wallet(privateKey);
        this.signer = this.wallet.connect(this.provider);
        this.contractAddress = contractAddress;
        this.abi = abi;
        this.contractSigner = new $hgUW1$ethers.Contract(this.contractAddress, this.abi, this.signer);
        this.contractProvider = new $hgUW1$ethers.Contract(this.contractAddress, this.abi, this.provider);
    }
}



const $a0c7eb0327956a81$export$1572b3eade6662f9 = (network, provider, key)=>{
    if (network === undefined) return $hgUW1$ethers.getDefaultProvider();
    if (network.startsWith("wss") || network.startsWith("http")) return $hgUW1$ethers.getDefaultProvider(network);
    const options = {
        [provider]: key
    };
    return $hgUW1$ethers.getDefaultProvider(network, options);
};



/**
 * @method: returns address and privateKey
 * @param {string} pwd user password
 * @return {Promise} object of address, privateKey and mnemonic
 */ const $613f1c02b9ad96db$export$41bdf21621ec4e24 = (pwd)=>{
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




export {$8a1a826cc015fcf1$export$2f4fd17aff4e7fc as HP, $04e41d0854aa7e66$export$5878c2c4222e4fe7 as HPA, $a0c7eb0327956a81$export$1572b3eade6662f9 as setProvider, $613f1c02b9ad96db$export$41bdf21621ec4e24 as createWallet};
//# sourceMappingURL=module.js.map
