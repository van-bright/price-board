import { ethers } from "hardhat";

async function main() {

  const usdt = await ethers.deployContract("USDT", []);

  await usdt.waitForDeployment();

  console.log(`Deploying USDT to ${usdt.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
