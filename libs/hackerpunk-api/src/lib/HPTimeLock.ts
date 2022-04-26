import { HP } from "./HP";
import { ethers } from "ethers";

class HPTimeLock {
  contract: ethers.Contract;
  contractAddress: string;
  abi: ethers.ContractInterface;

  constructor(
    signer: ethers.Signer,
    contractAddress: string,
    abi: ethers.ContractInterface
  ) {
    this.contractAddress = contractAddress;
    this.abi = abi;
    this.contract = new ethers.Contract(this.contractAddress, this.abi, signer);
  }

  /**
   * @method change signer of contract
   * @param signer
   */
  async changeContractSigner(signer: ethers.Signer) {
    this.contract = this.contract.connect(signer);
  }

  /**
   * @returns 0: not started, 1: proceeding 2: complete, 3: reverted
   */
  async checkDonationStatus(articleId: number): Promise<number> {
    return await this.contract.checkDonationStatus(articleId);
  }

  async getDonators(articleId: number): Promise<string[]> {
    return await this.contract.getDonators(articleId);
  }

  async getDonationBalance(articleId: number): Promise<BigInt> {
    return await this.contract.getDonationBalance(articleId);
  }

  /**
   * @method donator approve donation token to HPTimeLock contract and then, this token locked, only owner
   * @param hp HP's Contract should be connected to donator's signer
   * @param amount send value of Wei as string or BigInt
   */
  async donate(
    hp: HP,
    articleId: number,
    donator: string,
    writer: string,
    amount: string | BigInt
  ) {
    await hp.contract.approve(this.contract.address, amount);
    await this.contract.donate(articleId, donator, writer, amount);
  }

  /**
   * @method article removed, all token donated are returned to donators, only owner
   */
  async revokeAll(articleId: number, writer: string) {
    await this.contract.revokeAll(articleId, writer);
  }

  /**
   * @method donator revoke donation and token returned, only owner
   */
  async revokeDonate(articleId: number, donator: string) {
    await this.contract.revokeDonate(articleId, donator);
  }

  /**
   * @method donation token released to writer after lock time, only owner
   */
  async release(articleId: number, writer: string) {
    await this.contract.release(articleId, writer);
  }
}

export { HPTimeLock };
