import { ethers } from "ethers";

const ca = "";
const abi = ["function symbol() view returns (string)"];

class HPNFT {
  provider: ethers.providers.InfuraProvider;

  constructor(provider: ethers.providers.InfuraProvider) {
    this.provider = provider;
  }
  /**
   * @param privateKey privateKey of central account
   * @param to token minted to
   * @returns
   */
  async mintTo(privateKey: ethers.utils.BytesLike, to: string) {
    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(this.provider);

    const contract = new ethers.Contract(ca, abi, signer);

    const result = await contract.mintTo(to);
    return result;
  }
}

export default HPNFT;
