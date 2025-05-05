import {useCallback, useMemo} from "react";
import {useBuildTransaction, useConnex, useWallet} from "@vechain/vechain-kit";
import { buildMintFiorino } from "../api/buildMintFiorino";

type useSendFiorinoProps = {
  receiver: string
  amount?: string | number
  onSuccess?: () => void
}

export const useSendFiorino = ({ receiver, amount, onSuccess }: useSendFiorinoProps) => {
  const { thor } = useConnex()
  const { account } = useWallet()

  const clauseBuilder = useCallback(() => {
    if (amount === undefined) throw new Error("amount is required")
    return [buildMintFiorino(thor, amount, receiver)]
  }, [thor, amount, receiver])

  const refetchQueryKeys = useMemo(
    () => [amount, account?.address ?? undefined, receiver],
    [account?.address, receiver, amount]
  );

  return useBuildTransaction({
    clauseBuilder,
    refetchQueryKeys,
    onSuccess,
  });
};
