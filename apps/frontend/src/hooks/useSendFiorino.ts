import { useCallback, useMemo } from "react"
import { useWallet } from "@vechain/vechain-kit"
import { useBuildTransaction } from '../utils/hooks/useBuildTransaction'
import { buildSendFiorino } from "../api/buildSendFiorino"

type useSendFiorinoProps = {
  receiver: string
  amount?: string | number
  onSuccess?: () => void
}

export const getSendFiorino = (owner?: string, address?: string) => [owner, address]

export const useSendFiorino = ({ receiver, amount, onSuccess }: useSendFiorinoProps) => {  const { account } = useWallet()

const clauseBuilder = useCallback(() => {
  if (amount === undefined) throw new Error("amount is required")
  if (receiver === undefined) throw new Error("receiver is required")
  return [buildSendFiorino(receiver, amount)]
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
