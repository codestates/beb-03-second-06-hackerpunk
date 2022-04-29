import Web3 from "web3";
import externalHpAbi from "../assets/abis/externalHpAbi";
import hpAbi from "../assets/abis/hpAbi";
import {
  CONTRACT_ADDR,
  HP_CONTRACT_ADDR,
  EXTERNAL_WALLET_TIER,
  url,
} from "./constants";
import axios from "axios";
import { getTokenHeader } from "../common/functions/getToken";

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
    this.HP_CONTRACT_ADDR = HP_CONTRACT_ADDR;
    this.CONTRACT_ADDR = CONTRACT_ADDR;
    /* ------------------------- */
  }
  async init() {
    if (!this.provider) return;
    try {
      const [account] = await this.provider.enable();
      this.account = account;
      this.provider.on("accountsChanged", ([newAccount]) => {
        this.account = newAccount;
        console.log(this.account);
      });
      this.web3 = new Web3(this.provider);
      this.hpMethods = new this.web3.eth.Contract(
        hpAbi,
        this.HP_CONTRACT_ADDR
      ).methods;
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

    const result = await axios({
      url: url("connect"),
      method: "get",
      headers: getTokenHeader(),
    });

    if (result) {
      const { data: { sign: { hashedMessage, v, r, s } = {} } = {} } = result;

      const fee = await this.methods.signupFee(EXTERNAL_WALLET_TIER).call();
      const tx = await this.methods
        .authenticate(internalWalletAddr, hashedMessage, v, r, s)
        .send({
          from: this.account,
          value: fee,
          gas: 200000,
        });
      if (tx) {
        const amount = await this.hpMethods
          .balanceOf(internalWalletAddr)
          .call();

        return this.toAmountFromWei(amount.toString());
      }

      return; // failed amount
    }
  }
  toAmountFromWei(weiStr) {
    const tokenAmount = this.web3.utils.fromWei(weiStr, "ether");

    for (let i = 1; i < tokenAmount.length; i++) {
      if (tokenAmount[i] === ".") {
        return tokenAmount.slice(0, i + 3);
      }
    }
    return tokenAmount;
  }
}

const hp = new HackerPunkAPI();

export default hp;
