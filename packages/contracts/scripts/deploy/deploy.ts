import { ethers, network } from "hardhat";
import { Inbox } from "../../typechain-types";
import { ContractsConfig } from "@repo/config/contracts/type";
import { HttpNetworkConfig } from "hardhat/types";
import { deployProxy, saveContractsToFile } from "../helpers";

export async function deployAll(config: ContractsConfig) {
  const start = performance.now();
  const networkConfig = network.config as HttpNetworkConfig;
  console.log(
    `================  Deploying contracts on ${network.name} (${networkConfig.url}) with ${config.NEXT_PUBLIC_APP_ENV} configurations `
  );
  const [deployer] = await ethers.getSigners();

  console.log(`================  Address used to deploy: ${deployer.address}`);

  // ---------------------- Deploy Contracts ----------------------

  // Deploy the inbox contract
  const contractName = "Inbox";
  const InboxContract = await ethers.getContractFactory(contractName);
  const inbox = await InboxContract.deploy("Hello, world!");
  await inbox.waitForDeployment();
  console.log(`${contractName} impl.: ${await inbox.getAddress()}`);

  const date = new Date(performance.now() - start);
  console.log(
    `================  Contracts deployed in ${date.getMinutes()}m ${date.getSeconds()}s `
  );

  const contractAddresses: Record<string, string> = {
    inbox: await inbox.getAddress(),
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
    inbox,
  };
  // close the script
}
