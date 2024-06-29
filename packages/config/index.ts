import localConfig from "./local";
import stagingConfig from "./solo-staging";
import testnetConfig from "./testnet";
import mainnetConfig from "./mainnet";
import { EnvConfig, getContractsConfig } from "./contracts";
import { Network } from "@repo/constants";

export type AppConfig = {
  environment: EnvConfig;
  basePath?: string;
  fiorinoContractAddress: string;
  nodeUrl: string;
  network: Network;
};

export const getConfig = (env?: EnvConfig): AppConfig => {
  console.log("process.env", process.env.NEXT_PUBLIC_APP_ENV);
  const appEnv = env || process.env.NEXT_PUBLIC_APP_ENV || "solo-staging";
  if (!appEnv)
    throw new Error(
      "NEXT_PUBLIC_APP_ENV env variable must be set or a type must be passed to getConfig()"
    );
  if (appEnv === "local") return localConfig;
  if (appEnv === "e2e") return localConfig;
  if (appEnv === "solo-staging") return stagingConfig;
  if (appEnv === "testnet") return testnetConfig;
  if (appEnv === "mainnet") return mainnetConfig;
  throw new Error(`Unsupported NEXT_PUBLIC_APP_ENV ${appEnv}`);
};

export { getContractsConfig };
