const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers } = require("hardhat");

async function deployContractFixture() {
    // Get the ContractFactory and Signers here.
    const factory = await ethers.getContractFactory("KingOfTheFools");
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call factory.deploy() and await
    // its deployed() method, which happens onces its transaction has been
    // mined.
    const KingOfTheFools = await factory.deploy();

    await KingOfTheFools.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { factory, KingOfTheFools, owner, addr1, addr2};
}

describe("correct deposit test", function () {   
    it("Correct deposit should change the king", async function () {
        const { KingOfTheFools, addr1 } = await loadFixture(
            deployContractFixture
        );          
        await KingOfTheFools.connect(addr1).deposit({ value: ethers.utils.parseEther("0.0001") });
        expect(await KingOfTheFools.getKing()).to.equal(addr1.address);
        expect(await KingOfTheFools.getKingBalance()).to.equal(ethers.utils.parseEther("0.0001"));
    });
    it("Previous king should receive the new deposit amount if new king have come", async function () {
        const { KingOfTheFools, addr1, addr2 } = await loadFixture(
            deployContractFixture
        );
        await KingOfTheFools.connect(addr1).deposit({ value: ethers.utils.parseEther("0.0001") });
        const prevBalance = await addr1.getBalance();
        await KingOfTheFools.connect(addr2).deposit({ value: ethers.utils.parseEther("0.0002") });
        expect(await addr1.getBalance()).to.equal(prevBalance.add(ethers.utils.parseEther("0.0002")));
    });
});


describe("revert test", function () {    
    it("Should fail if deposit value is less than current king's balance", async function () {
        const { KingOfTheFools, addr1, addr2 } = await loadFixture(
            deployContractFixture
        );
        await KingOfTheFools.connect(addr1).deposit({ value: ethers.utils.parseEther("0.0001") });
        await expect(KingOfTheFools.connect(addr2).deposit({
            value: ethers.utils.parseEther("0.0001"),
        })).to.be.revertedWith("Not enough eth to be the king");    
    });
    it("Should fail if deposit value is equal and less than 0", async function () {
        const { KingOfTheFools, addr1 } = await loadFixture(
            deployContractFixture
        );
        await expect(KingOfTheFools.connect(addr1).deposit({
            value: ethers.utils.parseEther("0"),
        })).to.be.revertedWith("Amount must be more than 0");  
    });
    it("Should fail if current king deposit again", async function () {
        const { KingOfTheFools, addr1 } = await loadFixture(
            deployContractFixture
        );
        await KingOfTheFools.connect(addr1).deposit({ value: ethers.utils.parseEther("0.0001") });
        await expect(KingOfTheFools.connect(addr1).deposit({
            value: ethers.utils.parseEther("0.0002"),
        })).to.be.revertedWith("Not allowed to deposit again");    
    });
});