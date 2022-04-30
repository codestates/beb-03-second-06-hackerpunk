import { ethers } from "ethers";
import Web3 from "web3";

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

  async registerAddress(internalAddress: string): Promise<object> {
    return await this.contract.registerAddress(internalAddress);
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

  /**
   * @param provider url
   */
  async getSignature(
    provider: string,
    internalAddress: string,
    privateKey: string
  ): Promise<any> {
    let sign, hashedMessage;
    const web3 = new Web3(new Web3.providers.HttpProvider(provider));
    hashedMessage = web3.utils.sha3(internalAddress);
    if (hashedMessage !== null) {
      sign = web3.eth.accounts.sign(hashedMessage, privateKey);
      let v = parseInt(sign.v, 16);
      let r = sign.r;
      let s = sign.s;

      return { v, r, s, hashedMessage };
    }
  }

  async singupEventListener(callback: ethers.providers.Listener) {
    this.contract.on("Signup", callback);
  }
}

export { ExternalHP };
