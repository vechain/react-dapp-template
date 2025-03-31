import { getConfig } from "@repo/config";
import { Fiorino__factory } from "@repo/contracts";
import { getCallKey, useCall } from "../utils/hooks/useCall";
import { useWallet } from "@vechain/vechain-kit";
import { ethers } from "ethers";

const contractAddress = '0x31454bc37feCC3855bf9DF1cA769f25C82eD1e98'
const contractInterface = Fiorino__factory.createInterface();
const method = "balanceOf";

export const getFiorinoBalanceQueryKey = (address: string) =>
  getCallKey({ method, keyArgs: [address] });

export const useFiorinoBalance = () => {
  const { account } = useWallet();
  const results = useCall({
    contractInterface,
    contractAddress,
    method,
    args: [account?.address],
  });

  return {
    ...results,
    balance: Number(ethers.formatEther(results.data || 0)),
    isBalanceLoading: results.isPending,
  };
};
