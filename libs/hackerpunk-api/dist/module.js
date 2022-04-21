<<<<<<< HEAD
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
=======
import {ethers as $1XM5a$ethers} from "ethers";
import {keystore as $1XM5a$keystore} from "eth-lightwallet";


const $9d142a21aa1aa122$var$ca = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// ERC20 JSON Interface
const $9d142a21aa1aa122$var$erc20ABI = [
    // Read-Only Functions
    "function name() public view virtual override returns (string memory)",
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",
    "function mintTo(address account, uint256 activity) public onlyOwner",
    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)", 
];
class $9d142a21aa1aa122$var$HPFT {
    constructor(provider){
        this.provider = provider;
    }
    /**
   * @param privateKey privateKey of central account
   * @param to token minted to
   * @param activity signup, signin or write a post, or comment
   * @returns
   */ async mintTo(privateKey, to, activity) {
        // 수정
        const wallet = new $1XM5a$ethers.Wallet(privateKey);
        const signer = wallet.connect(this.provider);
        const contract = new $1XM5a$ethers.Contract($9d142a21aa1aa122$var$ca, $9d142a21aa1aa122$var$erc20ABI, signer);
        //
        const result = await contract.mintTo(to);
        return result;
    }
    /**
   * @param privateKey privateKey of sender account
   * @param to token sent to
   * @param amount amount of token
   * @returns
   */ async transfer(privateKey, to, amount) {
        const wallet = new $1XM5a$ethers.Wallet(privateKey);
        const signer = wallet.connect(this.provider);
        const contract = new $1XM5a$ethers.Contract($9d142a21aa1aa122$var$ca, $9d142a21aa1aa122$var$erc20ABI, signer);
        const result = await contract.transfer(to, amount);
        return result;
    }
}
var $9d142a21aa1aa122$export$2e2bcd8739ae039 = $9d142a21aa1aa122$var$HPFT;



const $67ff43784df99d44$var$ca = "";
const $67ff43784df99d44$var$abi = [
    "function symbol() view returns (string)"
];
class $67ff43784df99d44$var$HPNFT {
    constructor(provider){
        this.provider = provider;
    }
    /**
   * @param privateKey privateKey of central account
   * @param to token minted to
   * @returns
   */ async mintTo(privateKey, to) {
        const wallet = new $1XM5a$ethers.Wallet(privateKey);
        const signer = wallet.connect(this.provider);
        const contract = new $1XM5a$ethers.Contract($67ff43784df99d44$var$ca, $67ff43784df99d44$var$abi, signer);
        const result = await contract.mintTo(to);
        return result;
    }
}
var $67ff43784df99d44$export$2e2bcd8739ae039 = $67ff43784df99d44$var$HPNFT;



const $7ac18c37397efed2$export$1572b3eade6662f9 = (network, apiKey)=>{
    return new $1XM5a$ethers.providers.InfuraProvider(network, apiKey);
>>>>>>> e158476 (test001)
};



/**
 * @method: returns address and privateKey
 * @param {string} pwd user password
<<<<<<< HEAD
 * @return {Promise} object of address, privateKey and mnemonic
 */ const $613f1c02b9ad96db$export$41bdf21621ec4e24 = (pwd)=>{
    return new Promise((resolve, reject)=>{
        let secretSeed = $hgUW1$keystore.generateRandomSeed();
        $hgUW1$keystore.createVault({
=======
 * @return {Promise} object of address and privateKey
 */ const $a39858e902993c6f$export$41bdf21621ec4e24 = (pwd)=>{
    return new Promise((resolve, reject)=>{
        let secretSeed = $1XM5a$keystore.generateRandomSeed();
        $1XM5a$keystore.createVault({
>>>>>>> e158476 (test001)
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
<<<<<<< HEAD
                    privateKey: privateKey,
                    mnemonic: secretSeed
=======
                    privateKey: privateKey
>>>>>>> e158476 (test001)
                });
            });
        });
    });
};




<<<<<<< HEAD
export {$8a1a826cc015fcf1$export$2f4fd17aff4e7fc as HP, $04e41d0854aa7e66$export$5878c2c4222e4fe7 as HPA, $a0c7eb0327956a81$export$1572b3eade6662f9 as setProvider, $613f1c02b9ad96db$export$41bdf21621ec4e24 as createWallet};
=======
export {$9d142a21aa1aa122$export$2e2bcd8739ae039 as HPFT, $67ff43784df99d44$export$2e2bcd8739ae039 as HPNFT, $7ac18c37397efed2$export$1572b3eade6662f9 as setProvider, $a39858e902993c6f$export$41bdf21621ec4e24 as createWallet};
>>>>>>> e158476 (test001)
//# sourceMappingURL=module.js.map
