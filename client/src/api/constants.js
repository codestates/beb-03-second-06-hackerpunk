export const BASE_URL = "https://hacker-punk.herokuapp.com/";

export const url = (...args) => {
  return BASE_URL + args.join("/");
};

export const CONTRACT_ADDR = "0x1463f630821741211409ec48920b2D891EA1f8C2";

export const EXTERNAL_WALLET_TIER = 1;
