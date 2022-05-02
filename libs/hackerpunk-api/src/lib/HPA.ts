import { ethers } from "ethers";

class HPA {
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

  async safeMint(recipient: string) {
    //   const tokenURI =...
    await this.contract.safeMint(recipient, "");
  }

  async ownerOf(tokenId: BigInt | string): Promise<string> {
    return await this.contract.ownerOf(tokenId);
  }

  async balanceOf(owner: string): Promise<BigInt | string> {
    return await this.contract.balanceOf(owner);
  }
}

export { HPA };
