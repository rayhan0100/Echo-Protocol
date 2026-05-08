const hre = require("hardhat");

async function main() {
  const EchoStream = await hre.ethers.getContractFactory("EchoStream");
  const echo = await EchoStream.deploy();

  await echo.deployed();
  console.log("Echo Protocol deployed to:", echo.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
