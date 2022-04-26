const { task } = require("hardhat/config");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/internal/helpers");
const { ethers } = require("ethers");

task("register", "Register to hackerpunk")
  .addParam("address", "internalAddress of hackerpunk")
  .setAction(async function (taskArguments, hre) {
    const ehp = await getContractAt(
      hre,
      "ExternalHP",
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    );

    const transactionResponse = await ehp.registerAddress(
      taskArguments.address
    );

    console.log(`Transaction Hash: ${transactionResponse.hash}`);
  });

task("grantMinter", "grant miter role to hp")
  .addParam("address", "contract address")
  .setAction(async function (taskARguments, hre) {
    const provider = ethers.getDefaultProvider("http://127.0.0.1:8545/");
    const wallet = new ethers.Wallet(
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      provider
    );
    const signer = wallet.connect(provider);

    const hp = await getContractAt(
      hre,
      "HP",
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      signer
    );

    const transactionResponse = await hp.grantMinterRole(
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    );
    console.log(`Transaction Hash: ${transactionResponse.hash}`);
  });

task("authenticate", "Register to hackerpunk")
  .addParam("address", "internalAddress of hackerpunk")
  .setAction(async function (taskArguments, hre) {
    const ehp = await getContractAt(
      hre,
      "ExternalHP",
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    );

    const transactionResponse = await ehp.authenticate(taskArguments.address, {
      value: 1e15,
    });

    console.log(`Transaction Hash: ${transactionResponse.hash}`);
  });
