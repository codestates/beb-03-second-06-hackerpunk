/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
require("./scripts/deploy.js");
require("./scripts/signup.js");

module.exports = {
  defaultNetwork: "localhost",
  solidity: "0.8.7",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};
