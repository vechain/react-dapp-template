import { useCallback, useMemo } from "react"
import { useWallet } from "@vechain/vechain-kit"
import { useBuildTransaction } from '../utils/hooks/useBuildTransaction'
import { buildFiorinoMinter } from "../api/buildFiorinoMinter"

type useFiorinoMinterProps = {
  address: string
  onSuccess?: () => void
}

export const getFiorinoMinter = (owner?: string, address?: string) => [owner, address]

export const useFiorinoMinter = ({ address, onSuccess }: useFiorinoMinterProps) => {  
  const { account } = useWallet()

const clauseBuilder = useCallback(() => {
  if (address === undefined) throw new Error("address is required")
  return [buildFiorinoMinter(address)]
}, [address])

  const refetchQueryKeys = useMemo(
    () => [getFiorinoMinter(account?.address ?? undefined, address)],
    [account?.address, address],
  )

  return useBuildTransaction({
    clauseBuilder,
    refetchQueryKeys,
    onSuccess,
  })
}
