export const URL = "https://hacker-punk.herokuapp.com";

export const PROXY = URL;

export const BASE_URL = `${PROXY}/`;

export const url = (...args) => {
  return BASE_URL + args.join("/");
};

export const CONTRACT_ADDR = "0x3122419e3e41D483a01534a6C66cC944d1edE1bc";

export const HP_CONTRACT_ADDR = "0x0086d9967794E0d5717c6b0AFf26794009ae825e";

export const EXTERNAL_WALLET_TIER = 1;
