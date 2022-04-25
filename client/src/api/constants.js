export const BASE_URL = 'https://hacker-punk.herokuapp.com/';

export const url = (...args) => {
  return BASE_URL + args.join('/');
};

export const CONTRACT_ADDR = '0x9C2055165D320E9f3bfa0Ac3DD536761B1C41524';

export const EXTERNAL_WALLET_TIER = 1;
