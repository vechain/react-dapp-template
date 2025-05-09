import { useCallback, useMemo } from "react"
import { useWallet } from "@vechain/vechain-kit"
import { useBuildTransaction } from '../utils/hooks/useBuildTransaction'
import { getConfig } from "@repo/config"
import { AddressUtils, FormattingUtils } from "@repo/utils"
import { ABIContract, Address, Clause } from "@vechain/sdk-core";

const config = getConfig(import.meta.env.VITE_APP_ENV);
const FIORINO_CONTRACT = config.fiorinoContractAddress
const FIORINO_ABI = config.fiorinoAbi


type useMintFiorinoProps = {
  receiver: string
  amount?: string | number
  onSuccess?: () => void
}


export const useMintFiorino = ({ receiver, amount, onSuccess }: useMintFiorinoProps) => {  
const { account } = useWallet()

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

 const buildMintFiorino = (
  receiver: string,
  amount: string | number
): any => {
  const functionAbi = ABIContract.ofAbi(FIORINO_ABI).getFunction("transfer")
  if (!functionAbi) throw new Error("Function abi not found for transfer")
  if (AddressUtils.isValid(receiver) === false) throw new Error("Invalid receiver address")

  const formattedAddress = FormattingUtils.humanAddress(receiver);
  
  // Create a clause to call the isGraduated function
  const clause = Clause.callFunction(
    Address.of(FIORINO_CONTRACT),
    functionAbi,
    [receiver, amount]
  );

  return {
    ...clause,
    comment: `You have minter to ${formattedAddress}.`,
    abi: functionAbi,
  }
}

const getMintFiorino = (owner?: string, address?: string) => [owner, address]
