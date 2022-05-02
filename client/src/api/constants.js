export const URL = "https://hacker-punk.herokuapp.com";

export const PROXY = URL;

export const BASE_URL = `${PROXY}/`;

export const url = (...args) => {
  return BASE_URL + args.join("/");
};

export const CONTRACT_ADDR = "0xBCa91A3Dc174FE411f311Cd8362aB13Ad637a8cd";

export const HP_CONTRACT_ADDR = "0x4f669Db16F03Ae324a83EC5BcE73aFeB28cf3878";

export const EXTERNAL_WALLET_TIER = 1;
