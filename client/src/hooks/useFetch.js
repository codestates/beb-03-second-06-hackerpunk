import { useSWR } from "../common";

const useFetch = ({ key, args = {}, condition = true }) => {
  if (typeof condition === "function") condition = condition();
  return useSWR(() => (condition ? [key, args] : null)) || {};
};

export default useFetch;
