import { ethers } from "ethers";
import Web3 from "web3";
/**
 * @method: returns address and privateKey
 * @param {string} pwd user password
 * @return {Promise} object of address, privateKey and mnemonic
 */
export const createWallet: (pwd: string) => Promise<any>;
export class HP {
    contract: ethers.Contract;
    contractAddress: string;
    abi: ethers.ContractInterface;
    constructor(signer: ethers.Signer, contractAddress: string, abi: ethers.ContractInterface);
    /**
     * @method change signer of contract
     * @param signer
     */
    changeContractSigner(signer: ethers.Signer): Promise<void>;
    /**
     * @method initial minting once, only admin
     */
    init(): Promise<void>;
    /**
     * @method enable ExternalHP Contract to mint
     */
    grantMinterRole(contract: string): Promise<void>;
    /**
     * @method set signup token reward, only admin
     * @param signupReward send value of Wei as string or BigInt
     */
    setSignupReward(signupReward: string | BigInt): Promise<void>;
    /**
     * @method set attendacne token reward, only admin
     * @param attendanceReward send value of Wei as string or BigInt
     */
    setAttendanceReward(attendanceReward: string | BigInt): Promise<void>;
    /**
     * @method mint token to reward signup, only minter
     */
    signupMint(recipient: string): Promise<void>;
    /**
     * @method mint token to reward attendacne, only minter
     */
    attendanceMint(recipient: string): Promise<void>;
    /**
     * @method mint token to reward users at once, only minter
     */
    attendanceMintBatch(recipients: string[]): Promise<void>;
    /**
     * @param owner internalAddress
     * @param spender masterAddress
     */
    approveForAll(owner: string, spender: string): Promise<void>;
    /**
     * @method check balance of user
     */
    balanceOf(user: string): Promise<BigInt>;
    withdrawToExternalAddress(internalAddress: string, externalAddress: string, amount: string | BigInt): Promise<void>;
}
export class HPTimeLock {
    contract: ethers.Contract;
    contractAddress: string;
    abi: ethers.ContractInterface;
    constructor(signer: ethers.Signer, contractAddress: string, abi: ethers.ContractInterface);
    /**
     * @method change signer of contract
     * @param signer
     */
    changeContractSigner(signer: ethers.Signer): Promise<void>;
    /**
     * @returns 0: not started, 1: proceeding 2: complete, 3: reverted
     */
    checkDonationStatus(articleId: number): Promise<number>;
    getDonators(articleId: number): Promise<string[]>;
    getDonationBalance(articleId: number): Promise<BigInt>;
    /**
     * @method donator approve donation token to HPTimeLock contract and then, this token locked, only owner
     * @param amount send value of Wei as string or BigInt
     */
    donate(articleId: number, writer: string, donator: string, amount: string | BigInt): any;
    /**
     * @method article removed, all token donated are returned to donators, only owner
     */
    revokeAll(articleId: number, writer: string): any;
    /**
     * @method donator revoke donation and token returned, only owner
     */
    revokeDonate(articleId: number, donator: string): any;
    /**
     * @method donation token released to writer after lock time, only owner
     */
    release(articleId: number, writer: string): any;
}
export class PHPTimeLock extends HPTimeLock {
    constructor(signer: ethers.Signer, contractAddress: string, abi: ethers.ContractInterface);
}
export class ExternalHP {
    contract: ethers.Contract;
    contractAddress: string;
    abi: ethers.ContractInterface;
    constructor(signer: ethers.Signer, contractAddress: string, abi: ethers.ContractInterface);
    /**
     * @method change signer of contract
     * @param signer
     */
    changeContractSigner(signer: ethers.Signer): Promise<void>;
    /**
     * @method onlyOwner
     * @param fee send value of Wei as string or BigInt
     */
    setSignupFee(credentialType: number, fee: string | BigInt): Promise<void>;
    signupFee(credentialType: number): Promise<BigInt>;
    /**
     * @method onlyOwner
     */
    getAllInternalAddresses(): Promise<string[]>;
    registerAddress(internalAddress: string): Promise<object>;
    isRegistered(internalAddress: string): Promise<boolean>;
    isAuthenticated(internalAddress: string): Promise<boolean>;
    checkExternalAuthenticated(internalAddress: string, externalAddress: string): Promise<boolean>;
    getCredentialType(internalAddress: string): Promise<number>;
    /**
     * @param provider url
     */
    getSignature(provider: string, internalAddress: string, privateKey: string): Promise<any>;
    singupEventListener(callback: ethers.providers.Listener): Promise<void>;
}
export { Web3 };
export class HPA {
    contract: ethers.Contract;
    contractAddress: string;
    abi: ethers.ContractInterface;
    constructor(signer: ethers.Signer, contractAddress: string, abi: ethers.ContractInterface);
    /**
     * @method change signer of contract
     * @param signer
     */
    changeContractSigner(signer: ethers.Signer): Promise<void>;
    safeMint(recipient: string): Promise<void>;
    ownerOf(tokenId: BigInt | string): Promise<string>;
    balanceOf(owner: string): Promise<BigInt | string>;
}
export class PHP {
    contract: ethers.Contract;
    contractAddress: string;
    abi: ethers.ContractInterface;
    constructor(signer: ethers.Signer, contractAddress: string, abi: ethers.ContractInterface);
    /**
     * @method change signer of contract
     * @param signer
     */
    changeContractSigner(signer: ethers.Signer): Promise<void>;
    balanceOf(owner: string): Promise<BigInt | string>;
}
export class HPAStakingSystem {
    contract: ethers.Contract;
    contractAddress: string;
    abi: ethers.ContractInterface;
    constructor(signer: ethers.Signer, contractAddress: string, abi: ethers.ContractInterface);
    /**
     * @method change signer of contract
     * @param signer
     */
    changeContractSigner(signer: ethers.Signer): Promise<void>;
    stake(hpa: HPA, tokenId: BigInt | string): Promise<void>;
    updateReward(): Promise<void>;
    claimReward(owner: string): Promise<void>;
    unstake(tokenId: BigInt | string): Promise<void>;
}
/**
 * @param network default mainnet, can be url like http or wss
 * @param provider etherscan, infura, alchemy, etc...
 * @param key apikey, in case of infura project_id
 * @returns provider or Error
 */
export const setProvider: (network: string, provider?: string | undefined, key?: string | undefined) => ethers.providers.BaseProvider;
/**
 * @method make crypto wallet
 * @param privateKey string
 * @returns wallet
 */
export const setWallet: (privateKey: string) => ethers.Wallet;
/**
 * @method connect provider to wallet
 * @param wallet
 * @param provider
 * @returns signer
 */
export const setSigner: (wallet: ethers.Wallet, provider: ethers.providers.BaseProvider) => ethers.Signer;

//# sourceMappingURL=types.d.ts.map
