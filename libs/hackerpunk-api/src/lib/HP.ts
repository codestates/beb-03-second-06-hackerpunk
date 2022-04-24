import { ethers } from "ethers";

class HP {
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
   * @method initial minting once, only admin
   */
  async init() {
    await this.contract.init();
  }

  /**
   * @method enable ExternalHP Contract to mint
   */
  async grantMinterRole(contract: string) {
    await this.contract.grantMinterRole(contract);
  }

  /**
   * @method set signup token reward, only admin
   */
  async setSignupReward(signupReward: number) {
    await this.contract.setSignupReward();
  }

  /**
   * @method set attendacne token reward, only admin
   */
  async setAttendanceReward(attendanceReward: number) {
    await this.contract.setAttendanceReward();
  }

  /**
   * @method mint token to reward signup, only minter
   */
  async signupMint(recipient: string) {
    await this.contract.signupMint();
  }

  /**
   * @method mint token to reward attendacne, only minter
   */
  async attendanceMint(recipient: string) {
    await this.contract.attendacneMint();
  }

  /**
   * @method mint token to reward users at once, only minter
   */
  async attendanceMintBatch(recipients: string[]) {
    await this.contract.attendanceMintBatch();
  }

  /**
   * @method check balance of user
   */
  async balanceOf(user: string): Promise<number> {
    return await this.contract.balanceOf(user);
  }
}

export { HP };
