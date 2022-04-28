/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
require("./scripts/init.js");
require("./scripts/deploy.js");
require("./scripts/signup.js");
require("dotenv").config();

module.exports = {
  defaultNetwork: "localhost",
  solidity: "0.8.7",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.MASTER_PRIVATEKEY}`],
    },
  },
};
