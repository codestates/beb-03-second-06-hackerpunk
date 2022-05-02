const { task } = require("hardhat/config");
const { keccak256 } = require("js-sha3");
const { getContract, getEnvVariable } = require("./helper");

task("deploy", "deploy hp and ehp and hptimelock").setAction(
  async (taskArguments, hre) => {
    const hpContractFactory = await hre.ethers.getContractFactory("HP");
    const ehpContractFactory = await hre.ethers.getContractFactory(
      "ExternalHP"
    );
    const hptimelockContractFactory = await hre.ethers.getContractFactory(
      "HPTimeLock"
    );

    const hp = await hpContractFactory.deploy();
    const ehp = await ehpContractFactory.deploy(hp.address);
    const hptl = await hptimelockContractFactory.deploy(hp.address);

    console.log(`Contract deployed to address: ${hp.address}`);
    console.log(`Contract deployed to address: ${ehp.address}`);
    console.log(`Contract deployed to address: ${hptl.address}`);
  }
);

task("hasRole", "check wheter ehp has minter role of hp").setAction(
  async (taskArgs, hre) => {
    // const hp = await getContract("HP", getEnvVariable("HP_ADDRESS"), hre);
    const hp = await getContract(
      "HP",
      "0xc294b0F91ecd455bd383d6784c63129C151E4E15",
      hre
    );

    const role = keccak256("MINTER_ROLE");

    // const ok = await hp.hasRole(`0x${role}`, getEnvVariable("EHP_ADDRESS"));
    const ok = await hp.hasRole(
      `0x${role}`,
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    );
    console.log(ok);
  }
);

task("grantMinterRole", "grant minter role of hp")
  .addParam("address", "the address to receive minter role")
  .setAction(async (taskArgs, hre) => {
    const hp = await getContract("HP", getEnvVariable("HP_ADDRESS"), hre);
    const result = await hp.grantMinterRole(taskArgs.address);

    console.log(result);
  });

task("revokeMinterRole", "revoke minter role of hp")
  .addParam("address", "the address to revoke minter role")
  .setAction(async (taskArgs, hre) => {
    const hp = await getContract("HP", getEnvVariable("HP_ADDRESS"), hre);

    const role = keccak256("MINTER_ROLE");
    const result = await hp.revokeRole(`0x${role}`, taskArgs.address);

    console.log(result);
  });

task("setLocktime", "setLocktime of token donated to article")
  .addParam("locktime", "locktime of article")
  .setAction(async (taskArgs, hre) => {
    const hptl = await getContract(
      "HPTimeLock",
      getEnvVariable("HPTL_ADDRESS"),
      hre
    );

    const result = await hptl.setLocktime(taskArgs.locktime);

    console.log(result);
  });

task("isRegistered", "check whether registered")
  .addParam("address", "check")
  .setAction(async (taskArgs, hre) => {
    const ehp = await getContract(
      "ExternalHP",
      getEnvVariable("EHP_ADDRESS"),
      hre
    );

    // 0x44674fc98c55d93c26501c285a92c6daed97566a
    const result = await ehp.isRegistered(taskArgs.address);
    console.log(result);
  });
