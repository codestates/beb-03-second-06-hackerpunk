export const URL = "https://hacker-punk.herokuapp.com";

export const PROXY = window.location.hostname === URL ? "/proxy" : URL;

export const BASE_URL = `${PROXY}/`; // "https://hacker-punk.herokuapp.com/";

export const url = (...args) => {
  return BASE_URL + args.join("/");
};

export const CONTRACT_ADDR = "0xD796124e5cF66C4e08767BE03AF2D745FD7EAD5e";

export const HP_CONTRACT_ADDR = "0xb09b86902cC13fa51E7CAad4F534aaddD4d3b67b";

export const EXTERNAL_WALLET_TIER = 1;
