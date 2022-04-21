import { ethers } from "ethers";

// const ca, abi

class HPA {
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
}

export { HPA };
