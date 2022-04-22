export const BASE_URL = 'https://hacker-punk.herokuapp.com/'; // "https://jsonplaceholder.typicode.com/";

export const url = (...args) => {
  return BASE_URL + args.join('/');
};
