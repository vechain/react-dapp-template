import { useCallback, useMemo } from "react"
import { useWallet, useConnex } from "@vechain/vechain-kit"
import { useBuildTransaction } from '../utils/hooks/useBuildTransaction'
import { AddressUtils, FormattingUtils } from "@repo/utils"
import { getConfig } from "@repo/config"
import { ethers } from "ethers"

const config = getConfig(import.meta.env.VITE_APP_ENV);

const FIORINO_CONTRACT = config.fiorinoContractAddress
const FIORINO_ABI = config.fiorinoAbi


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
  if (receiver === undefined) throw new Error("receiver is required")
  return [buildSendFiorino(thor, receiver, amount)]
}, [receiver, amount])

  const refetchQueryKeys = useMemo(
    () => [getSendFiorino(account?.address ?? undefined, receiver)],
    [account?.address, receiver],
  )

  return useBuildTransaction({
    clauseBuilder,
    refetchQueryKeys,
    onSuccess,
  })
}

 const buildSendFiorino = (
  thor: Connex.Thor,
  receiver: string,
  amount: string | number
): any => {
  const functionAbi = FIORINO_ABI.find((e: any) => e.name === "send")
  if (!functionAbi) throw new Error("Function abi not found for send")

  if (AddressUtils.isValid(receiver) === false) throw new Error("Invalid spender address")

  const formattedAmount = FormattingUtils.humanNumber(amount ?? 0, amount)
  const formattedAddress = FormattingUtils.humanAddress(receiver)
  const amountWithDecimals = ethers.parseEther(amount.toString()).toString()

  const clause = thor.account(FIORINO_CONTRACT).method(functionAbi).asClause(receiver, amountWithDecimals)

  return {
    ...clause,
    comment: `You have sent ${formattedAmount} Fiorino to ${formattedAddress}.`,
    abi: functionAbi,
  }
}

const getSendFiorino = (owner?: string, address?: string) => [owner, address]
