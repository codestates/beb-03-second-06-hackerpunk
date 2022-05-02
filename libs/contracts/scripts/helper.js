const { ethers } = require("ethers");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/internal/helpers");

function getEnvVariable(key, defaultValue) {
  if (process.env[key]) {
    return process.env[key];
  }

  if (!defaultValue) {
    throw `${key} is not defined and no default value was provided`;
  }
  return defaultValue;
}

function getProvider() {
  return ethers.getDefaultProvider(getEnvVariable("NETWORK", "ropsten"), {
    infura: getEnvVariable("INFURA_PROJECT_ID"),
  });
}

function getAccount(privateKey) {
  return new ethers.Wallet(privateKey, getProvider());
}

function getContract(contractName, contractAddress, hre) {
  const account = getAccount(getEnvVariable("MASTER_PRIVATEKEY"));
  return getContractAt(hre, contractName, contractAddress, account);
}

module.exports = {
  getEnvVariable,
  getProvider,
  getAccount,
  getContract,
};
