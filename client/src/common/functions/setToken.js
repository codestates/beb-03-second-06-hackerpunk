import { TOKEN_NAME } from "../constants";

function setToken(token) {
  localStorage.setItem(TOKEN_NAME, token);
}

export default setToken;
