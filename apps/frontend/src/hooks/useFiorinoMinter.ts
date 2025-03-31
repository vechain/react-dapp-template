import { getConfig } from "@repo/config";
import { Fiorino__factory } from "@repo/contracts";
import { getCallKey, useCall } from "../utils/hooks/useCall";
import { useWallet } from "@vechain/vechain-kit";
import { compareAddresses } from "@repo/utils/AddressUtils";

const contractAddress = '0x31454bc37feCC3855bf9DF1cA769f25C82eD1e98'

const contractInterface = Fiorino__factory.createInterface();
const method = "owner";

export const getFiorinoMinterQueryKey = () => {
  getCallKey({ method });
};

export const useFiorinoMinter = () => {
  const { account } = useWallet();
  const results = useCall({
    contractInterface,
    contractAddress,
    method,
  });

  return {
    ...results,
    minter: results.data,
    isMinter: compareAddresses(results.data || "", account?.address || ""),
    isMinterLoading: results.isPending,
  };
};
