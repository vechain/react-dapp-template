import { useCallback, useMemo } from "react"
import { useWallet, useConnex } from "@vechain/vechain-kit"
import { useBuildTransaction } from '../utils/hooks/useBuildTransaction'
import { AddressUtils, FormattingUtils } from "@repo/utils"
import { getConfig } from "@repo/config"
const config = getConfig(import.meta.env.VITE_APP_ENV);

const FIORINO_CONTRACT = config.fiorinoContractAddress
const FIORINO_ABI = config.fiorinoAbi


type useFiorinoMinterProps = {
  address: string
  onSuccess?: () => void
}

export const useFiorinoMinter = ({ address, onSuccess }: useFiorinoMinterProps) => {  
  const { thor } = useConnex()
  const { account } = useWallet()

const clauseBuilder = useCallback(() => {
  if (address === undefined) throw new Error("address is required")
  return [buildFiorinoMinter(thor, address)]
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

 const buildFiorinoMinter = (
  thor: Connex.Thor,
  address: string,
): any => {
  const functionAbi = FIORINO_ABI.find((e: any) => e.name === "owner")
  if (!functionAbi) throw new Error("Function abi not found for owner")

  if (AddressUtils.isValid(address) === false) throw new Error("Invalid address")
  const formattedAddress = FormattingUtils.humanAddress(address)

  const clause = thor.account(FIORINO_CONTRACT).method(functionAbi).asClause(address)

  return {
    ...clause,
    comment: `You check if ${formattedAddress} is a Fiorino Minter.`,
    abi: functionAbi,
  }
}

const getFiorinoMinter = (owner?: string, address?: string) => [owner, address]
