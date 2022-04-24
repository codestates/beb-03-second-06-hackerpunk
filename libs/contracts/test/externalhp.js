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
    await hpcont.setSignupReward(100000);
    await ehpcont.setSignupFee(100); // Wei
  });

  describe("Register Test", async function () {
    it("First", async function () {
      await ehpcont.regsiterExternal(server1.address, { value: 100 });
      const accounts = await ehpcont.getAllServerAccounts();

      console.log(await hpcont.balanceOf(server1.address));
      expect(accounts[0]).to.equal(server1.address);
    });

    it("Already Registered", async function () {
      await ehpcont.regsiterExternal(server1.address, { value: 100 });
      await ehpcont
        .connect(addr1)
        .regsiterExternal(server1.address, { value: 100 });
    });
  });
});
