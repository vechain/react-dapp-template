import {useCallback, useMemo} from "react";
import {useBuildTransaction, useConnex, useWallet} from "@vechain/vechain-kit";
import { buildMintFiorino } from "../api/buildMintFiorino";
import { useToast } from "@chakra-ui/react";
import { FormattingUtils } from "@repo/utils";

type useMintFiorinoProps = {
  receiver: string
  amount?: string | number
  onSuccess?: () => void
}

export const useMintFiorino = ({ receiver, amount, onSuccess }: useMintFiorinoProps) => {
  const { thor } = useConnex()
  const { account } = useWallet()
  const toast = useToast()

  const clauseBuilder = useCallback(() => {
    if (amount === undefined) throw new Error("amount is required")
    return [buildMintFiorino(thor, amount, receiver)]
  }, [thor, amount, receiver])

    //Refetch queries to update ui after the tx is confirmed
    const handleOnSuccess = useCallback(async () => {
      const formattedAmount = FormattingUtils.humanNumber(amount ?? 0, amount)
      const formattedAddress = FormattingUtils.humanAddress(receiver ?? "")
  
      toast({
        title: "Tokens minted succesfully",
        description: `You have minted ${formattedAmount} B3TR to ${formattedAddress}`,
        status: "success",
        position: "bottom-left",
        duration: 5000,
        isClosable: true,
      })
      onSuccess?.()
    }, [toast, onSuccess, amount, receiver])

  const refetchQueryKeys = useMemo(
    () => [amount, account?.address ?? undefined, receiver],
    [account?.address, receiver, amount]
  );

  return useBuildTransaction({
    clauseBuilder,
    refetchQueryKeys,
    onSuccess: handleOnSuccess,
  });
};
