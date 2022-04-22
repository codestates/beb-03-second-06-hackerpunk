const { expect } = require("chai");

describe("Token", function () {
  let factory;
  let hpcont;
  let owner;
  let addr1;
  let addr2;
  let addr3;
  let addrs;

  beforeEach(async function () {
    [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
    factory = await ethers.getContractFactory("HP");
    hpcont = await factory.deploy();
  });

  describe("Token Function Test", async function () {
    it("Get TokenContract name of HP", async function () {
      const name = await hpcont.name();
      expect("HackerPunk Token").to.equal(name);
    });

    it("attendanceMint Test", async function () {
      await hpcont.attendanceMint(addr1.address);

      const balance = await hpcont.balanceOf(addr1.address);
      expect(balance.eq(ethers.utils.parseEther("1.0"))).to.equal(true);
    });

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
  });
});
