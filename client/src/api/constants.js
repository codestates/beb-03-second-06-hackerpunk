export const URL = "https://hacker-punk.herokuapp.com";

export const PROXY = URL;

export const BASE_URL = `${PROXY}/`;

export const url = (...args) => {
  return BASE_URL + args.join("/");
};

export const CONTRACT_ADDR = "0x133cfaBd0Bc2F4fB6727FbcE29fEAf545564786f";

export const HP_CONTRACT_ADDR = "0xc294b0F91ecd455bd383d6784c63129C151E4E15";

export const EXTERNAL_WALLET_TIER = 1;
