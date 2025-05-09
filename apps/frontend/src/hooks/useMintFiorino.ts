import { useCallback, useMemo } from "react"
import { useWallet } from "@vechain/vechain-kit"
import { useBuildTransaction } from '../utils/hooks/useBuildTransaction'
import { buildMintFiorino } from "../api/buildMintFiorino"

type useMintFiorinoProps = {
  receiver: string
  amount?: string | number
  onSuccess?: () => void
}

export const getMintFiorino = (owner?: string, address?: string) => [owner, address]

export const useMintFiorino = ({ receiver, amount, onSuccess }: useMintFiorinoProps) => {  const { account } = useWallet()

const clauseBuilder = useCallback(() => {
  if (amount === undefined) throw new Error("amount is required")
  if (receiver === undefined) throw new Error("receiver is required")
  return [buildMintFiorino(receiver, amount)]
}, [receiver, amount])

  const refetchQueryKeys = useMemo(
    () => [getMintFiorino(account?.address ?? undefined, receiver)],
    [account?.address, receiver],
  )

  return useBuildTransaction({
    clauseBuilder,
    refetchQueryKeys,
    onSuccess,
  })
}
