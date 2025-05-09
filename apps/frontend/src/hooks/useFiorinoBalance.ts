import { FormattingUtils } from "@repo/utils"
import { useQuery } from "@tanstack/react-query"
import { useConnex } from "@vechain/vechain-kit"
import { getConfig } from "@repo/config"
import { ethers } from "ethers"

const config = getConfig(import.meta.env.VITE_APP_ENV);
const FIORINO_CONTRACT = config.fiorinoContractAddress
const FIORINO_ABI = config.fiorinoAbi

export type TokenBalance = {
  original: string
  scaled: string
  formatted: string
}

/**
 *  Get the fiorino balance of an address from the contract
 * @param thor  The thor instance
 * @param address  The address to get the balance of. If not provided, will return an error (for better react-query DX)
 * @param scaleDecimals  The decimals of the token. Defaults to 18
 * @returns Balance of the token in the form of {@link TokenBalance} (original, scaled down and formatted)
 */
export const getFiorinoBalance = async (thor: Connex.Thor, address?: string): Promise<TokenBalance> => {
  if (!address) return Promise.reject(new Error("Address not provided"))
  const functionAbi = FIORINO_ABI.find((e: any) => e.name === "balanceOf")
  if (!functionAbi) return Promise.reject(new Error("Function abi not found for balanceOf"))
  const res = await thor.account(FIORINO_CONTRACT).method(functionAbi).call(address)

  if (res.vmError) return Promise.reject(new Error(res.vmError))

  const original = res.decoded[0]
  const scaled = ethers.formatEther(original)
  const formatted = scaled === "0" ? "0" : FormattingUtils.humanNumber(scaled)

  return {
    original,
    scaled,
    formatted,
  }
}

export const getFiorinoBalanceQueryKey = (address?: string) => ["balance", "fiorino", address]
export const useFiorinoBalance = (address?: string) => {
  const { thor } = useConnex()

  return useQuery({
    queryKey: getFiorinoBalanceQueryKey(address),
    queryFn: () => getFiorinoBalance(thor, address),
    enabled: !!address,
  })
}
