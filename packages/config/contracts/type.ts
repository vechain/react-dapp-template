export type ContractsConfig = {
  VITE_APP_ENV: "local" | "e2e" | "solo-staging" | "testnet" | "mainnet";
  CONTRACTS_ADMIN_ADDRESS: string;
  XAPP_BASE_URI: string;
};
