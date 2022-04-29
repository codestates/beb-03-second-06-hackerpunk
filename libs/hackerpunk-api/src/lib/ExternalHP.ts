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
    try {
      await this.contract.setSignupFee(credentialType, fee);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async signupFee(credentialType: number): Promise<BigInt | Error> {
    try {
      const fee = await this.contract.signupFee(credentialType);
      return fee;
    } catch (err: any) {
      return new Error(err);
    }
  }

  /**
   * @method onlyOwner
   */
  async getAllInternalAddresses(): Promise<string[] | Error> {
    try {
      const addresses = await this.contract.getAllInternalAddresses();
      return addresses;
    } catch (err: any) {
      return new Error(err);
    }
  }

  async registerAddress(internalAddress: string): Promise<boolean | Error> {
    try {
      const ok = await this.contract.registerAddress(internalAddress);
      return ok;
    } catch (err: any) {
      return new Error(err);
    }
  }

  async isRegistered(internalAddress: string): Promise<boolean | Error> {
    try {
      return await this.contract.isRegistered(internalAddress);
    } catch (err: any) {
      return new Error(err);
    }
  }

  async isAuthenticated(internalAddress: string): Promise<boolean | Error> {
    try {
      return await this.contract.isAuthenticated(internalAddress);
    } catch (err: any) {
      return new Error(err);
    }
  }

  async checkExternalAuthenticated(
    internalAddress: string,
    externalAddress: string
  ): Promise<boolean | Error> {
    try {
      return await this.contract.checkExternalAuthenticated(
        internalAddress,
        externalAddress
      );
    } catch (err: any) {
      return new Error(err);
    }
  }

  async getCredentialType(internalAddress: string): Promise<number | Error> {
    try {
      return await this.contract.getCredentialType(internalAddress);
    } catch (err: any) {
      return new Error(err);
    }
  }

  /**
   * @param provider url
   */
  async getSignature(
    provider: string,
    internalAddress: string,
    privateKey: string
  ): Promise<any> {
    try {
      const ok = await this.registerAddress(internalAddress);

      let sign, hashedMessage;
      if (ok) {
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
    } catch (err: any) {
      return new Error(err);
    }
  }

  async singupEventListener(callback: ethers.providers.Listener) {
    this.contract.on("Signup", callback);
  }
}

export { ExternalHP };
