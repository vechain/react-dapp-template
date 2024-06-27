import { defineConfig } from "../defineConfig";
export function createTestnetConfig() {
  return defineConfig({
    NEXT_PUBLIC_APP_ENV: "testnet",
    XAPP_BASE_URI: "ipfs://",
  });
}
