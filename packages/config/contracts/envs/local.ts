import { defineConfig } from "../defineConfig";

export function createLocalConfig() {
  return defineConfig({
    NEXT_PUBLIC_APP_ENV: "local",
    XAPP_BASE_URI: "ipfs://",
  });
}
