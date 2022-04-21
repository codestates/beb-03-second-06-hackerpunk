<<<<<<< HEAD
var $8zHUo$ethers = require("ethers");
var $8zHUo$ethlightwallet = require("eth-lightwallet");
=======
var $gJAYX$ethers = require("ethers");
var $gJAYX$ethlightwallet = require("eth-lightwallet");
>>>>>>> e158476 (test001)

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

<<<<<<< HEAD
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
=======
$parcel$export(module.exports, "HPFT", () => $38d725a8f981f2ed$export$2e2bcd8739ae039);
$parcel$export(module.exports, "HPNFT", () => $e188d6242f6f0705$export$2e2bcd8739ae039);
$parcel$export(module.exports, "setProvider", () => $d5346fde4a57e64a$export$1572b3eade6662f9);
$parcel$export(module.exports, "createWallet", () => $c9249e228612f132$export$41bdf21621ec4e24);

const $38d725a8f981f2ed$var$ca = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// ERC20 JSON Interface
const $38d725a8f981f2ed$var$erc20ABI = [
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
class $38d725a8f981f2ed$var$HPFT {
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
        const wallet = new $gJAYX$ethers.ethers.Wallet(privateKey);
        const signer = wallet.connect(this.provider);
        const contract = new $gJAYX$ethers.ethers.Contract($38d725a8f981f2ed$var$ca, $38d725a8f981f2ed$var$erc20ABI, signer);
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
        const wallet = new $gJAYX$ethers.ethers.Wallet(privateKey);
        const signer = wallet.connect(this.provider);
        const contract = new $gJAYX$ethers.ethers.Contract($38d725a8f981f2ed$var$ca, $38d725a8f981f2ed$var$erc20ABI, signer);
        const result = await contract.transfer(to, amount);
        return result;
    }
}
var $38d725a8f981f2ed$export$2e2bcd8739ae039 = $38d725a8f981f2ed$var$HPFT;



const $e188d6242f6f0705$var$ca = "";
const $e188d6242f6f0705$var$abi = [
    "function symbol() view returns (string)"
];
class $e188d6242f6f0705$var$HPNFT {
    constructor(provider){
        this.provider = provider;
    }
    /**
   * @param privateKey privateKey of central account
   * @param to token minted to
   * @returns
   */ async mintTo(privateKey, to) {
        const wallet = new $gJAYX$ethers.ethers.Wallet(privateKey);
        const signer = wallet.connect(this.provider);
        const contract = new $gJAYX$ethers.ethers.Contract($e188d6242f6f0705$var$ca, $e188d6242f6f0705$var$abi, signer);
        const result = await contract.mintTo(to);
        return result;
    }
}
var $e188d6242f6f0705$export$2e2bcd8739ae039 = $e188d6242f6f0705$var$HPNFT;



const $d5346fde4a57e64a$export$1572b3eade6662f9 = (network, apiKey)=>{
    return new $gJAYX$ethers.ethers.providers.InfuraProvider(network, apiKey);
>>>>>>> e158476 (test001)
};



/**
 * @method: returns address and privateKey
 * @param {string} pwd user password
<<<<<<< HEAD
 * @return {Promise} object of address, privateKey and mnemonic
 */ const $c3abceea661ac960$export$41bdf21621ec4e24 = (pwd)=>{
    return new Promise((resolve, reject)=>{
        let secretSeed = $8zHUo$ethlightwallet.keystore.generateRandomSeed();
        $8zHUo$ethlightwallet.keystore.createVault({
=======
 * @return {Promise} object of address and privateKey
 */ const $c9249e228612f132$export$41bdf21621ec4e24 = (pwd)=>{
    return new Promise((resolve, reject)=>{
        let secretSeed = $gJAYX$ethlightwallet.keystore.generateRandomSeed();
        $gJAYX$ethlightwallet.keystore.createVault({
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




//# sourceMappingURL=main.js.map
