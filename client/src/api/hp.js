import Web3 from 'web3';
import externalHpAbi from '../assets/abis/externalHpAbi';
import { CONTRACT_ADDR, EXTERNAL_WALLET_TIER } from './constants';

class HackerPunkAPI {
  get isEnabled() {
    return this.web3;
  }
  constructor() {
    if (!window.ethereum) {
      console.error(`There Is No The Ethereum Provider.`);
      return;
    }
    this.provider = window.ethereum;
    /* External HP Contract Addr */
    this.CONTRACT_ADDR = CONTRACT_ADDR;
    /* ------------------------- */
  }
  async init() {
    if (!this.provider) return;
    try {
      const [account] = await this.provider.enable();
      this.account = account;
      this.provider.on('accountsChanged', ([newAccount]) => {
        this.account = newAccount;
        console.log(this.account);
      });
      this.web3 = new Web3(this.provider);
      this.methods = new this.web3.eth.Contract(
        externalHpAbi,
        this.CONTRACT_ADDR
      ).methods;
      return account; // returns current account
    } catch (error) {
      console.error(error);
    }
  }
  async connectToExternalWallet(internalWalletAddr) {
    if (!this.isEnabled) {
      await this.init();
    }
    // Throw new Error
    // EXTERNAL_WALLET_TIER temporary
    const fee = await this.methods.signupFee(EXTERNAL_WALLET_TIER).call();
    await this.methods.signInAddress(internalWalletAddr).send({
      from: this.account,
      value: fee,
    });
  }
}

const hp = new HackerPunkAPI();

export default hp;
