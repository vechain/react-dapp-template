import { getConfig } from "@repo/config";
import { Fiorino__factory } from "@repo/contracts";
import { useCallback, useMemo } from "react";
import { useBuildTransaction } from "../utils";
import { buildClause } from "../utils/buildClause";
import { getFiorinoBalanceQueryKey } from "./useFiorinoBalance";
import { useWallet } from "@vechain/vechain-kit";
import { ethers } from "ethers";

const GovernorInterface = Fiorino__factory.createInterface();

type Props = { onSuccess?: () => void };

type useSendFiorinoParams = {
  amount: string;
  receiver: string;
};

export const useSendFiorino = ({ onSuccess }: Props) => {
  const { account } = useWallet();

  const clauseBuilder = useCallback(
    ({ amount, receiver }: useSendFiorinoParams) => {
      const contractAmount = ethers.parseEther(amount);
      return [
        buildClause({
          to: '0x31454bc37feCC3855bf9DF1cA769f25C82eD1e98',
          contractInterface: GovernorInterface,
          method: "transfer",
          args: [receiver, contractAmount],
          comment: "transfer fiorino",
        }),
      ];
    },
    []
  );

  const refetchQueryKeys = useMemo(
    () => [getFiorinoBalanceQueryKey(account?.address || "")],
    [account]
  );

  return useBuildTransaction({
    clauseBuilder,
    refetchQueryKeys,
    onSuccess,
  });
};

