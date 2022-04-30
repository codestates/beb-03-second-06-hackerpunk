export const URL = "https://hacker-punk.herokuapp.com";

export const PROXY = URL;

export const BASE_URL = `${PROXY}/`;

export const url = (...args) => {
  return BASE_URL + args.join("/");
};

export const CONTRACT_ADDR = "0x15341C93220040198102Ff63D7041041A473ad10";

export const HP_CONTRACT_ADDR = "0xc294b0F91ecd455bd383d6784c63129C151E4E15";

export const EXTERNAL_WALLET_TIER = 1;
