import { ethers } from "ethers";

export const setProvider = (
  network: string,
  apiKey: string
): ethers.providers.InfuraProvider => {
  return new ethers.providers.InfuraProvider(network, apiKey);
};
