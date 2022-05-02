const { task } = require("hardhat/config");

task("Deploy1", "Deploys hp and ehp contracts").setAction(
  async (taskArguments, hre) => {
    const hpContractFactory = await hre.ethers.getContractFactory("HP");
    const ehpContractFactory = await hre.ethers.getContractFactory(
      "ExternalHP"
    );

    const hp = await hpContractFactory.deploy();
    const ehp = await ehpContractFactory.deploy(hp.address);

    console.log(`Contract deployed to address: ${hp.address}`);
    console.log(`Contract deployed to address: ${ehp.address}`);
  }
);

task("StakingSystemDeploy", "Deploy Staking Contract").setAction(
  async (taskARguments, hre) => {
    const stakingContractFactory = await hre.ethers.getContractFactory(
      "HPAStakingSystem"
    );

    const hpass = await stakingContractFactory.deploy();

    console.log(`Contract deployed to address: ${hpass.address}`);
  }
);
