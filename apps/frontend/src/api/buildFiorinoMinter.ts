import { getConfig } from "@repo/config"
import { AddressUtils, FormattingUtils } from "@repo/utils"
import { ABIContract, Address, Clause } from "@vechain/sdk-core";

const config = getConfig(import.meta.env.VITE_APP_ENV);

const FIORINO_CONTRACT = config.fiorinoContractAddress
const FIORINO_ABI = config.fiorinoAbi

/**
 * Build the clause to mint B3TR tokens for the given address and amount
 * @param address the address to mint the tokens to
 * @returns the clause to get Fiorino minter
 */

export const buildFiorinoMinter= (
address: string,
): any => {
const functionAbi = ABIContract.ofAbi(FIORINO_ABI).getFunction("owner")
if (!functionAbi) throw new Error("Function abi not found for owner")
if (AddressUtils.isValid(address) === false) throw new Error("Invalid address")

const formattedAddress = FormattingUtils.humanAddress(address);

// Create a clause to call the isGraduated function
const clause = Clause.callFunction(
  Address.of(FIORINO_CONTRACT),
  functionAbi,
  [address]
);

return {
  ...clause,
  comment: `Check if ${formattedAddress} is a Fiorino minter.`,
  abi: functionAbi,
}
}

