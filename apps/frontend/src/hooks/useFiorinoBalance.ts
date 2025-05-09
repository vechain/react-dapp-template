import { useCallback, useMemo } from "react"
import { useWallet } from "@vechain/vechain-kit"
import { useBuildTransaction } from '../utils/hooks/useBuildTransaction'
import { buildFiorinoBalance } from "../api/buildFiorinoBalance"

type useFiorinoBalanceProps = {
  address: string
  onSuccess?: () => void
}

export const getFiorinoBalance = (owner?: string, address?: string) => [owner, address]

export const useFiorinoBalance = ({ address, onSuccess }: useFiorinoBalanceProps) => {  
  const { account } = useWallet()

const clauseBuilder = useCallback(() => {
  if (address === undefined) throw new Error("address is required")
  return [buildFiorinoBalance(address)]
}, [address])

  const refetchQueryKeys = useMemo(
    () => [getFiorinoBalance(account?.address ?? undefined, address)],
    [account?.address, address],
  )

  return useBuildTransaction({
    clauseBuilder,
    refetchQueryKeys,
    onSuccess,
  })
}
