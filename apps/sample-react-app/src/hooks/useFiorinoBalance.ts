import { getConfig } from "@repo/config";
import { Fiorino__factory } from "@repo/contracts";
import { getCallKey, useCall } from "../utils/hooks/useCall";
import { useWallet } from "@vechain/dapp-kit-react";
import { compareAddresses } from "@repo/utils/AddressUtils";

const contractAddress = getConfig(
  import.meta.env.VITE_APP_ENV
).fiorinoContractAddress;
const contractInterface = Fiorino__factory.createInterface();
const method = "balanceOf";

export const getFiorinoMinterQueryKey = () => {
  getCallKey({ method });
};

export const useFiorinoBalance = () => {
  const { account } = useWallet();
  const results = useCall({
    contractInterface,
    contractAddress,
    method,
    args: [account],
  });

  return {
    ...results,
    minter: results.data,
    isMinter: compareAddresses(results.data || "", account || ""),
    isMinterLoading: results.isPending,
  };
};
