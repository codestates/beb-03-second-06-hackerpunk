const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ExternalHP", function () {
  let hpcont;
  let ehpcont;
  let owner;
  let addr1;
  let server1;
  let server2;
  let addrs;
  beforeEach(async function () {
    [owner, addr1, server1, server2, ...addrs] = await ethers.getSigners();
    let hpFactory = await ethers.getContractFactory("HP");
    hpcont = await hpFactory.deploy();

    let ehpFactory = await ethers.getContractFactory("ExternalHP");
    ehpcont = await ehpFactory.deploy(hpcont.address);

    await hpcont.grantMinterRole(ehpcont.address);
  });

  describe("Register and Signin Test", async function () {
    it("Register", async function () {
      await ehpcont.registerAddress(server1.address);

      const ok = await ehpcont.isRegistered(server1.address);
      expect(ok).to.equal(true);
    });

    it("SignIn", async function () {
      await ehpcont.registerAddress(server1.address);
      const fee = await ehpcont.signupFee(1);
      await ehpcont
        .connect(addr1)
        .signInAddress(server1.address, { value: fee.toBigInt() });

      const rewardToken = await hpcont.signupReward();
      const balance = await hpcont.balanceOf(server1.address);

      expect(rewardToken.eq(balance)).to.equal(true);
    });

    it("Change CredentialType", async function () {
      await ehpcont.registerAddress(server1.address);
      await ehpcont.setSignupFee(2, 2e15);
      await ehpcont
        .connect(addr1)
        .signInAddress(server1.address, { value: 1e15 });

      await ehpcont
        .connect(addr1)
        .changeCredentialType(2, server1.address, { value: 1e15 });

      const type = await ehpcont.getCredentialType(server1.address);
      expect(type).to.equal(2);
    });
  });
});
