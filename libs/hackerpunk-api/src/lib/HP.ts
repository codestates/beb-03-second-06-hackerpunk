import { ethers } from "ethers";

// const ca, abi

class HP {
  provider: ethers.providers.BaseProvider;
  wallet: ethers.Wallet;
  signer: ethers.Signer;
  contractSigner: ethers.Contract;
  contractProvider: ethers.Contract;

  // Temporary
  contractAddress: string;
  abi: ethers.ContractInterface;

  constructor(
    provider: ethers.providers.BaseProvider,
    privateKey: ethers.utils.BytesLike,
    contractAddress: string,
    abi: ethers.ContractInterface
  ) {
    this.provider = provider;
    this.wallet = new ethers.Wallet(privateKey);
    this.signer = this.wallet.connect(this.provider);
    this.contractAddress = contractAddress;
    this.abi = abi;

    this.contractSigner = new ethers.Contract(
      this.contractAddress,
      this.abi,
      this.signer
    );
    this.contractProvider = new ethers.Contract(
      this.contractAddress,
      this.abi,
      this.provider
    );
  }

  /**
   *
   * @param address
   * @returns
   */
  async balanceOf(address: string): Promise<any> {
    const result = await this.contractProvider.balanceOf(address);
    return result;
  }

  /**
   * @param recipient token minted to
   * @returns
   */
  async attendanceMint(recipient: string): Promise<any> {
    const result = await this.contractSigner.attendanceMint(recipient);
    return result;
  }

  /**
   * @method mint at once, since tx fee
   * @param recipients array token minted to
   * @returns
   */
  async attendanceMintBatch(recipients: string[]): Promise<any> {
    const result = await this.contractSigner.attendanceMintBatch(recipients);
    return result;
  }

  /**
   * @param donateRecord array of donate record: { from, to, amount }
   * @returns
   */
  async donateBatch(donateRecord: object[]): Promise<any> {
    const result = await this.contractSigner.donateBatch(donateRecord);
    return result;
  }
}

export { HP };
