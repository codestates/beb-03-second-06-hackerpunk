export const URL = "https://hacker-punk.herokuapp.com";

export const PROXY = URL;

export const BASE_URL = `${PROXY}/`;

export const url = (...args) => {
  return BASE_URL + args.join("/");
};

export const CONTRACT_ADDR = "0x0f3004F96583A83CE89c3774e5A280e5c6DB6986";

export const HP_CONTRACT_ADDR = "0x4f669Db16F03Ae324a83EC5BcE73aFeB28cf3878";

export const EXTERNAL_WALLET_TIER = 1;
