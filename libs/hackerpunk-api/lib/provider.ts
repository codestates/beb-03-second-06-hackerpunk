import { ethers } from "ethers";

/**
 * @param network default mainnet, can be url like http or wss
 * @param provider etherscan, infura, alchemy, etc...
 * @param key apikey, in case of infura project_id
 * @returns provider
 */
export const setProvider = (
  network: string,
  provider: string,
  key: string
): ethers.providers.BaseProvider => {
  if (network === undefined) return ethers.getDefaultProvider();

  if (network.startsWith("wss") || network.startsWith("http"))
    return ethers.getDefaultProvider(network);

  const options = {
    [provider]: key,
  };

  return ethers.getDefaultProvider(network, options);
};
