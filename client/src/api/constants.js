export const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const url = (...args) => {
  return BASE_URL + args.join("/");
};
