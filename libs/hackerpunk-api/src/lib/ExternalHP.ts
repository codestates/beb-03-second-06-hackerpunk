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

  /**
   * @method onlyOwner
   * @param fee send value of Wei as string or BigInt
   */
  async setSignupFee(credentialType: number, fee: string | BigInt) {
    await this.contract.setSignupFee(credentialType, fee);
  }

  async signupFee(credentialType: number): Promise<BigInt> {
    return await this.contract.signupFee(credentialType);
  }

  /**
   * @method onlyOwner
   */
  async getAllInternalAddresses(): Promise<string[]> {
    return await this.contract.getAllInternalAddresses();
  }

  async registerAddress(internalAddress: string) {
    await this.contract.registerAddress(internalAddress);
  }

  async isRegistered(internalAddress: string): Promise<boolean> {
    return await this.contract.isRegistered(internalAddress);
  }

  async isAuthenticated(internalAddress: string): Promise<boolean> {
    return await this.contract.isAuthenticated(internalAddress);
  }

  async checkExternalAuthenticated(
    internalAddress: string,
    externalAddress: string
  ): Promise<boolean> {
    return await this.contract.checkExternalAuthenticated(
      internalAddress,
      externalAddress
    );
  }

  async getCredentialType(internalAddress: string): Promise<number> {
    return await this.contract.getCredentialType(internalAddress);
  }

  async singupEventListener(
    internalAddress: string,
    externalAddress: string,
    provider: ethers.providers.BaseProvider,
    callback: ethers.providers.Listener
  ) {
    const filter = {
      address: this.contractAddress,
      topics: [
        ethers.utils.id("Signup(address, address)"),
        ethers.utils.hexZeroPad(internalAddress, 32),
        ethers.utils.hexZeroPad(externalAddress, 32),
      ],
    };

    provider.once(filter, callback);
  }
}

export { ExternalHP };
