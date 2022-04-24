export const BASE_URL = 'https://hacker-punk.herokuapp.com/';

export const url = (...args) => {
  return BASE_URL + args.join('/');
};

export const CONTRACT_ADDR = '0x225557E13578DCF4f188ef6B60DC208a0048fd0D';
