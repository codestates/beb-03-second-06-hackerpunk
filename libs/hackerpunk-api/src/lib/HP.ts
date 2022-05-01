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
    try {
      await this.contract.init();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  /**
   * @method enable ExternalHP Contract to mint
   */
  async grantMinterRole(contract: string) {
    await this.contract.grantMinterRole(contract);
  }

  /**
   * @method set signup token reward, only admin
   * @param signupReward send value of Wei as string or BigInt
   */
  async setSignupReward(signupReward: string | BigInt) {
    await this.contract.setSignupReward(signupReward);
  }

  /**
   * @method set attendacne token reward, only admin
   * @param attendanceReward send value of Wei as string or BigInt
   */
  async setAttendanceReward(attendanceReward: string | BigInt) {
    await this.contract.setAttendanceReward(attendanceReward);
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
   * @param owner internalAddress
   * @param spender masterAddress
   */
  async approveForAll(owner: string, spender: string) {
    await this.contract.approveForall(owner, spender);
  }

  /**
   * @method check balance of user
   */
  async balanceOf(user: string): Promise<BigInt> {
    return await this.contract.balanceOf(user);
  }

  async withdrawToExternalAddress(
    internalAddress: string,
    externalAddress: string,
    amount: string | BigInt
  ) {
    await this.contract.transferFrom(internalAddress, externalAddress, amount);
  }
}

export { HP };
