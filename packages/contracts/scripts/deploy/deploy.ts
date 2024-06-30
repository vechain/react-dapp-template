import { ethers, network } from "hardhat";
import { Fiorino } from "../../typechain-types";
import { ContractsConfig } from "@repo/config/contracts/type";
import { HttpNetworkConfig } from "hardhat/types";
import { deployProxy, saveContractsToFile } from "../helpers";

export async function deployAll(config: ContractsConfig) {
  const start = performance.now();
  const networkConfig = network.config as HttpNetworkConfig;
  console.log(
    `================  Deploying contracts on ${network.name} (${networkConfig.url}) with ${config.VITE_APP_ENV} configurations `
  );
  const [deployer] = await ethers.getSigners();

  console.log(`================  Address used to deploy: ${deployer.address}`);

  // ---------------------- Deploy Contracts ----------------------

  // Deploy the fiorino contract
  const contractName = "Fiorino";
  const FiorinoContract = await ethers.getContractFactory(contractName);
  const fiorino = await FiorinoContract.deploy();
  await fiorino.waitForDeployment();
  console.log(`${contractName} impl.: ${await fiorino.getAddress()}`);

  const date = new Date(performance.now() - start);
  console.log(
    `================  Contracts deployed in ${date.getMinutes()}m ${date.getSeconds()}s `
  );

  const contractAddresses: Record<string, string> = {
    fiorino: await fiorino.getAddress(),
  };

  console.log(
    "================================================================================"
  );
  console.log("Deployment completed successfully!");
  console.log(
    "================================================================================"
  );

  console.log("Contracts", contractAddresses);
  await saveContractsToFile(contractAddresses);

  const end = new Date(performance.now() - start);
  console.log(
    `Total execution time: ${end.getMinutes()}m ${end.getSeconds()}s`
  );

  return {
    fiorino,
  };
  // close the script
}
