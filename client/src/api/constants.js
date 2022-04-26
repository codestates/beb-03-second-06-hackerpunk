export const BASE_URL = 'https://hacker-punk.herokuapp.com/';

export const url = (...args) => {
  return BASE_URL + args.join('/');
};

export const CONTRACT_ADDR = '0xA285E2149459e7446f3a8Ad09ef6a97F92d0Df7d';

export const EXTERNAL_WALLET_TIER = 1;
