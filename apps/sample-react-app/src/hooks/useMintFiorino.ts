import { getConfig } from "@repo/config";
import { Fiorino__factory } from "@repo/contracts";
import { useCallback, useMemo } from "react";
import { useBuildTransaction } from "../utils";
import { buildClause } from "../utils/buildClause";

const GovernorInterface = Fiorino__factory.createInterface();

type Props = { onSuccess?: () => void };

type useMintFiorinoParams = {
  amount: string;
  receiver: string;
};

export const useMintFiorino = ({ onSuccess }: Props) => {
  const clauseBuilder = useCallback(
    ({ amount, receiver }: useMintFiorinoParams) => {
      return [
        buildClause({
          to: getConfig(import.meta.env.VITE_APP_ENV).fiorinoContractAddress,
          contractInterface: GovernorInterface,
          method: "mint",
          args: [receiver, amount],
          comment: "mint fiorino",
        }),
      ];
    },
    []
  );

  const refetchQueryKeys = useMemo(() => [], []);

  return useBuildTransaction({
    clauseBuilder,
    refetchQueryKeys,
    onSuccess,
  });
};
