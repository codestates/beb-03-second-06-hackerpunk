import { HPTimeLock } from "./HPTimeLock";
import { ethers } from "ethers";

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
