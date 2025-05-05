import { getConfig } from "@repo/config"
import { AddressUtils, FormattingUtils } from "@repo/utils"
import {ABIContract } from "@vechain/sdk-core";
import { ethers } from "ethers"

const config = getConfig(import.meta.env.VITE_APP_ENV);

const FIORINO_CONTRACT = config.fiorinoContractAddress

/**
 * Build the clause to mint B3TR tokens for the given address and amount
 * @param thor thor instance
 * @param address the address to mint the tokens to
 * @param amount the amount of tokens to mint. Should not already include decimals
 * @param spender the address to approve to spend the tokens
 * @param decimals the decimals of the token
 * @returns the clause to mint B3TR tokens
 */
export const buildMintFiorino = (
  thor: Connex.Thor,
  amount: string | number,
  spender: string,
): Connex.Vendor.TxMessage[0] => {
  const functionAbi = ABIContract.ofAbi(config.fiorinoAbi).getFunction("transfer") 

  if (!functionAbi) throw new Error("Function abi not found for mint")

  if (AddressUtils.isValid(spender) === false) throw new Error("Invalid spender address")

  const formattedAmount = FormattingUtils.humanNumber(amount ?? 0, amount)
  const formattedAddress = FormattingUtils.humanAddress(spender)
  const amountWithDecimals = ethers.parseEther(amount.toString()).toString()

  const clause = thor.account(FIORINO_CONTRACT).method(functionAbi).asClause(spender, amountWithDecimals)

  return {
    ...clause,
    comment: `Mint ${formattedAmount} FIORINO to ${formattedAddress}`,
    abi: functionAbi,
  }
}
