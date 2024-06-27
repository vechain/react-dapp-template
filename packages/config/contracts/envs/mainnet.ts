import { defineConfig } from "../defineConfig";
export function createMainnetConfig() {
  return defineConfig({
    NEXT_PUBLIC_APP_ENV: "mainnet",
    XAPP_BASE_URI: "ipfs://",
  });
}
