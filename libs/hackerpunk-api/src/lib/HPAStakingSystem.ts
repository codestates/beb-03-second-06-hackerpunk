import { ethers } from "ethers";
import { HPA } from "./HPA";

class HPAStakingSystem {
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

  async stake(hpa: HPA, tokenId: BigInt | string) {
    await hpa.contract.approve(this.contractAddress, tokenId);
    await this.contract.stake(tokenId);
  }

  async updateReward() {
    await this.contract.updateReward();
  }

  async claimReward(owner: string) {
    await this.contract.claimReward(owner);
  }

  async unstake(tokenId: BigInt | string) {
    await this.contract.unstake(tokenId);
  }
}

export { HPAStakingSystem };
