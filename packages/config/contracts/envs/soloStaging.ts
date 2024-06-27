import { defineConfig } from "../defineConfig";

export function createSoloStagingConfig() {
  return defineConfig({
    NEXT_PUBLIC_APP_ENV: "solo-staging",
    XAPP_BASE_URI: "ipfs://",
  });
}
