const { task } = require("hardhat/config");

task("deploy", "Deploys the BEB.sol contract").setAction(
  async (taskArguments, hre) => {
    const bebContractFactory = await hre.ethers.getContractFactory("BEB");

    const beb = await bebContractFactory.deploy("BEB Token", "BEB");
    console.log(`Contract deployed to address: ${beb.address}`);
  }
);
