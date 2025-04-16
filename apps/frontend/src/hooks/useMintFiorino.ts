import {useCallback, useMemo} from "react";
import {useBuildTransaction, useWallet} from "@vechain/vechain-kit";
import {ABIContract, Address, Clause, VET} from "@vechain/sdk-core";
import {getConfig} from "@repo/config";

type useMintFiorinoProps = {
  receiver: string
  amount?: string | number
  onSuccess?: () => void
}

export const useMintFiorino = ({ receiver, amount, onSuccess }: useMintFiorinoProps) => {
  const { account } = useWallet();
  const config = getConfig(import.meta.env.VITE_APP_ENV);


  const clauseBuilder = useCallback(() => {
    if (amount === undefined) throw new Error("amount is required")
      const contractClause = Clause.callFunction(Address.of(config.fiorinoContractAddress), ABIContract.ofAbi(config.fiorinoAbi).getFunction("transfer"), [receiver, contractAmount], VET.of(0), {comment: "transfer fiorino"});
    return [{
      to: contractClause.to,
      value: contractClause.value.toString(),
      data: contractClause.data.toString(),
      comment: `${account?.address} sent you Fioriono tokens!`,
    }]
  }, [amount, receiver])

  const refetchQueryKeys = useMemo(
    () => [amount, account?.address ?? undefined, receiver],
    [account?.address, receiver, amount],
  )

  return useBuildTransaction({
    clauseBuilder,
    refetchQueryKeys,
    onSuccess,
  })
};
