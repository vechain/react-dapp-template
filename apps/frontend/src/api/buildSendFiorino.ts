import { getConfig } from "@repo/config"
import { AddressUtils, FormattingUtils } from "@repo/utils"
import { ABIContract, Address, Clause } from "@vechain/sdk-core";

const config = getConfig(import.meta.env.VITE_APP_ENV);

const FIORINO_CONTRACT = config.fiorinoContractAddress
const FIORINO_ABI = config.fiorinoAbi

/**
 * Build the clause to mint B3TR tokens for the given address and amount
 * @param thor thor instance
 * @param receiver the address to mint the tokens to
 * @param amount the amount of tokens to mint. Should not already include decimals
 * @returns the clause to send Fiorino tokens
 */

export const buildSendFiorino = (
  receiver: string,
  amount: string | number
): any => {
  const functionAbi = ABIContract.ofAbi(FIORINO_ABI).getFunction("send")
  if (!functionAbi) throw new Error("Function abi not found for send")
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
    comment: `You have sent Fiorino to ${formattedAddress}.`,
    abi: functionAbi,
  }
}
