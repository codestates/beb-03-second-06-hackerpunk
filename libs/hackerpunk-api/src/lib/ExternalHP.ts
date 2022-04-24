import { ethers } from "ethers";

class ExternalHP {
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

  async signupFee(): Promise<number> {
    return await this.contract.signupFee();
  }

  /**
   * @method onlyOwner
   */
  async getAllServerAccounts(): Promise<string[]> {
    return await this.contract.getAllServerAccounts;
  }

  /**
   * @method onlyOwner
   */
  async setSignupFee(fee: number) {
    await this.contract.setSignupFee(fee);
  }

  /**
   * @method External account send transaction fee and get amount of HP token to be registered
   * @param serverAccount
   * @param fee signupfee
   */
  async registerExternal(serverAccount: string, fee: number) {
    await this.contract.registerExternal(serverAccount, { from: fee });
  }
}

export { ExternalHP };
