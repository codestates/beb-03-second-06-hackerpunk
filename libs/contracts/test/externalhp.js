const { expect } = require("chai");
const { ethers } = require("hardhat");
const { keccak_256 } = require("js-sha3");

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

    it("Authenticate", async function () {
      await ehpcont.registerAddress(
        "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
      );
      const fee = await ehpcont.signupFee(1);

      let hashedMessage = keccak_256(
        "0x70997970c51812dc3a010c7d01b50e0d17dc79c8"
      );
      hashedMessage = `0x${hashedMessage}`;
      const result = await ehpcont.authenticate(
        addr1.address,
        hashedMessage,
        28,
        "0xb6a29ea281e5a1d968c9864d342c219913fd25250a7b855a478d7b70a0162c2f",
        "0x11c33b531b0c57f2c2ffb445e9b4d06ad9ef7240bd88c848c3961da2d666d7e1",
        {
          value: fee.toBigInt(),
        }
      );
      console.log(result);
      const rewardToken = await hpcont.signupReward();
      const balance = await hpcont.balanceOf(server1.address);

      expect(rewardToken.eq(balance)).to.equal(true);
    });

    // it("Change CredentialType", async function () {
    //   await ehpcont.registerAddress(server1.address);
    //   await ehpcont.setSignupFee(2, 2e15);
    //   await ehpcont
    //     .connect(addr1)
    //     .authenticate(server1.address, { value: 1e15 });

    //   await ehpcont
    //     .connect(addr1)
    //     .changeCredentialType(2, server1.address, { value: 1e15 });

    //   const type = await ehpcont.getCredentialType(server1.address);
    //   expect(type).to.equal(2);
    // });
  });
});
