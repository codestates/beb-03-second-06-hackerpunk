const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HPTimeLock", function () {
  let hpcont;
  let hptlcont;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let writer;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, writer, ...addrs] = await ethers.getSigners();
    let hpFactory = await ethers.getContractFactory("HP");
    hpcont = await hpFactory.deploy();

    let hptlFactory = await ethers.getContractFactory("HPTimeLock");
    hptlcont = await hptlFactory.deploy(hpcont.address);
  });

  describe("HPTimeLock Test", async function () {
    it("attendanceMintBatch Test", async function () {
      let arr = [owner.address, addr1.address, addr2.address, addr3.address];
      await hpcont.attendanceMintBatch(arr);

      const ownerBalance = await hpcont.balanceOf(owner.address);
      const addr1Balance = await hpcont.balanceOf(addr1.address);
      const addr2Balance = await hpcont.balanceOf(addr2.address);
      const addr3Balance = await hpcont.balanceOf(addr3.address);

      const total = ownerBalance
        .add(addr1Balance)
        .add(addr2Balance)
        .add(addr3Balance);

      expect(total.eq(ethers.utils.parseEther("4.0"))).to.equal(true);
    });

    it("Donate Balance Check", async function () {
      let arr = [addr1.address, addr2.address, addr3.address];
      await hpcont.attendanceMintBatch(arr);

      await hpcont.connect(addr1).approve(hptlcont.address, 100);
      await hptlcont.donate(1, addr1.address, writer.address, 100);

      await hpcont.connect(addr2).approve(hptlcont.address, 100);
      await hptlcont.donate(1, addr2.address, writer.address, 100);

      await hpcont.connect(addr3).approve(hptlcont.address, 100);
      await hptlcont.donate(1, addr3.address, writer.address, 100);

      const totalBalance = await hptlcont.getDonationBalance(1);
      expect(totalBalance.toNumber()).to.equal(300);
    });
  });
});
