import { TOKEN_NAME } from "../constants";

function setToken(token) {
  if (token === undefined || token === "undefined") return;
  localStorage.setItem(TOKEN_NAME, token);
}

export default setToken;
