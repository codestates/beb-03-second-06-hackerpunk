import { ethers } from "ethers";
import { HPTimeLock } from "../../dist/types.d";

class PHPTimeLock extends HPTimeLock {
  constructor(
    signer: ethers.Signer,
    contractAddress: string,
    abi: ethers.ContractInterface
  ) {
    super(signer, contractAddress, abi);
  }
}

export { PHPTimeLock };
