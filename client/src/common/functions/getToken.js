import { TOKEN_NAME } from "../constants";

function getToken() {
  return localStorage.getItem(TOKEN_NAME);
}

export function getTokenHeader() {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
}

export default getToken;
