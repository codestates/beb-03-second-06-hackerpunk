const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StakingSystem", function () {
  let phpcont;
  let hpacont;
  let stakingcont;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    let phpFactory = await ethers.getContractFactory("PHP");
    phpcont = await phpFactory.deploy();

    let hpaFactory = await ethers.getContractFactory("HPA");
    hpacont = await hpaFactory.deploy();

    let stakingFactory = await ethers.getContractFactory("HPAStakingSystem");
    stakingcont = await stakingFactory.deploy(phpcont.address, hpacont.address);

    await phpcont.grantMinterRole(stakingcont.address);

    await hpacont.safeMint(addr1.address, "");
    await hpacont.safeMint(addr2.address, "");
    await hpacont.safeMint(addr3.address, "");

    await hpacont.connect(addr1).approve(stakingcont.address, 0);
    await hpacont.connect(addr2).approve(stakingcont.address, 1);
    await hpacont.connect(addr3).approve(stakingcont.address, 2);

    await stakingcont.connect(addr1).stake(0);
    await stakingcont.connect(addr2).stake(1);
    await stakingcont.connect(addr3).stake(2);
  });

  describe("StakingSystem Test", async function () {
    it("Stakers", async function () {
      await stakingcont.connect(addr1).updateReward();

      const prevBalance = await stakingcont.getStakerBalance(addr1.address);

      await stakingcont.connect(addr1).updateReward();
      const currBalance = await stakingcont.getStakerBalance(addr1.address);

      console.log(prevBalance, currBalance);

      expect(
        currBalance.sub(prevBalance).eq(ethers.utils.parseEther("1.0"))
      ).to.equal(true);
    });
  });
});
