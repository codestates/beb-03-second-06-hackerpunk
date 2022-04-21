const { task } = require("hardhat/config");

task("TokenDeploy", "Deploys Token contracts").setAction(
  async (taskArguments, hre) => {
    const hpContractFactory = await hre.ethers.getContractFactory("HP");
    const hpaContractFactory = await hre.ethers.getContractFactory("HPA");
    const phpContractFactory = await hre.ethers.getContractFactory("PHP");

    const hp = await hpContractFactory.deploy();
    const hpa = await hpaContractFactory.deploy();
    const php = await phpContractFactory.deploy();

    console.log(`Contract deployed to address: ${hp.address}`);
    console.log(`Contract deployed to address: ${hpa.address}`);
    console.log(`Contract deployed to address: ${php.address}`);
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
