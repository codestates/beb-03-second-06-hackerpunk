import { ethers } from "ethers";

const ca = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// ERC20 JSON Interface
const erc20ABI = [
  // Read-Only Functions

  "function name() public view virtual override returns (string memory)",
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  "function mintTo(address account, uint256 activity) public onlyOwner",
  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

class HPFT {
  provider: ethers.providers.InfuraProvider;

  constructor(provider: ethers.providers.InfuraProvider) {
    this.provider = provider;
  }

  /**
   * @param privateKey privateKey of central account
   * @param to token minted to
   * @param activity signup, signin or write a post, or comment
   * @returns
   */

  async mintTo(
    privateKey: ethers.utils.BytesLike,
    to: string,
    activity: number
  ) {
    // 수정
    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(this.provider);

    const contract = new ethers.Contract(ca, erc20ABI, signer);
    //

    const result = await contract.mintTo(to);
    return result;
  }

  /**
   * @param privateKey privateKey of sender account
   * @param to token sent to
   * @param amount amount of token
   * @returns
   */
  async transfer(
    privateKey: ethers.utils.BytesLike,
    to: string,
    amount: number
  ) {
    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(this.provider);

    const contract = new ethers.Contract(ca, erc20ABI, signer);

    const result = await contract.transfer(to, amount);
    return result;
  }
}

export default HPFT;
