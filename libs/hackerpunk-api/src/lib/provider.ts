import { BigNumber, ethers } from "ethers";

/**
 * @param network default mainnet, can be url like http or wss
 * @param provider etherscan, infura, alchemy, etc...
 * @param key apikey, in case of infura project_id
 * @returns provider or Error
 */
export const setProvider = (
  network: string,
  provider?: string,
  key?: string
): ethers.providers.BaseProvider => {
  let options;
  if (provider !== undefined) {
    options = {
      [provider]: key,
    };
  }

  if (network === undefined) {
    return ethers.getDefaultProvider("homestead", options);
  } else {
    if (network.startsWith("wss") || network.startsWith("http"))
      return ethers.getDefaultProvider(network);
    else {
      return ethers.getDefaultProvider(network, options);
    }
  }
};

/**
 * @method make crypto wallet
 * @param privateKey string
 * @returns wallet
 */
export const setWallet = (privateKey: string): ethers.Wallet => {
  return new ethers.Wallet(privateKey);
};

/**
 * @method connect provider to wallet
 * @param wallet
 * @param provider
 * @returns signer
 */
export const setSigner = (
  wallet: ethers.Wallet,
  provider: ethers.providers.BaseProvider
): ethers.Signer => {
  return wallet.connect(provider);
};
