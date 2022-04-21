import { ethers } from "ethers";
<<<<<<< HEAD
export class HP {
    provider: ethers.providers.BaseProvider;
    wallet: ethers.Wallet;
    signer: ethers.Signer;
    contractSigner: ethers.Contract;
    contractProvider: ethers.Contract;
    contractAddress: string;
    abi: ethers.ContractInterface;
    constructor(provider: ethers.providers.BaseProvider, privateKey: ethers.utils.BytesLike, contractAddress: string, abi: ethers.ContractInterface);
    /**
     *
     * @param address
     * @returns
     */
    balanceOf(address: string): Promise<any>;
    /**
     * @param recipient token minted to
     * @returns
     */
    attendanceMint(recipient: string): Promise<any>;
    /**
     * @method mint at once, since tx fee
     * @param recipients array token minted to
     * @returns
     */
    attendanceMintBatch(recipients: string[]): Promise<any>;
    /**
     * @param donateRecord array of donate record: { from, to, amount }
     * @returns
     */
    donateBatch(donateRecord: object[]): Promise<any>;
}
export class HPA {
    provider: ethers.providers.BaseProvider;
    wallet: ethers.Wallet;
    signer: ethers.Signer;
    contractSigner: ethers.Contract;
    contractProvider: ethers.Contract;
    contractAddress: string;
    abi: ethers.ContractInterface;
    constructor(provider: ethers.providers.BaseProvider, privateKey: ethers.utils.BytesLike, contractAddress: string, abi: ethers.ContractInterface);
}
/**
 * @param network default mainnet, can be url like http or wss
 * @param provider etherscan, infura, alchemy, etc...
 * @param key apikey, in case of infura project_id
 * @returns provider
 */
export const setProvider: (network: string, provider: string, key: string) => ethers.providers.BaseProvider;
/**
 * @method: returns address and privateKey
 * @param {string} pwd user password
 * @return {Promise} object of address, privateKey and mnemonic
=======
export default HPFT;
export default HPNFT;
export const setProvider: (network: string, apiKey: string) => ethers.providers.InfuraProvider;
/**
 * @method: returns address and privateKey
 * @param {string} pwd user password
 * @return {Promise} object of address and privateKey
>>>>>>> e158476 (test001)
 */
export const createWallet: (pwd: string) => Promise<any>;

//# sourceMappingURL=types.d.ts.map
