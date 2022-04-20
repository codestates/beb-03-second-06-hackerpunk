import { ethers } from "ethers";
declare class HPFactory {
    provider: ethers.providers.InfuraProvider;
    constructor(network: string, apiKey: string);
    /**
     * @param privateKey privateKey of central account
     * @param to token minted to
     * @param activity login or write a post, or comment
     * @returns
     */
    mintToken(privateKey: ethers.utils.BytesLike, to: string, activity: number): Promise<any>;
    /**
     * @param privateKey privateKey of sender account
     * @param to token sent to
     * @param amount amount of token
     * @returns
     */
    transfer(privateKey: ethers.utils.BytesLike, to: string, amount: number): Promise<any>;
}
export default HPFactory;
