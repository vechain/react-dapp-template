import {Badge, Button, Card, CardBody, FormControl, FormErrorMessage, FormLabel, HStack, Input, Text, VStack, useToast} from "@chakra-ui/react";
import {useFiorinoMinter} from "../../../../hooks/useFiorinoMinter";
import {useForm} from "react-hook-form";
import {useMintFiorino} from "../../../../hooks/useMintFiorino";
import {useWallet} from "@vechain/vechain-kit";
import {ABIContract, Address, Clause, VET} from "@vechain/sdk-core";
import {ThorClient} from "@vechain/sdk-network";
import {getConfig} from "@repo/config";
interface MintForm {
  amount: string;
  receiver: string;
}

export const MintCard = () => {
  const form = useForm<MintForm>();
  const toast = useToast();
  const {account} = useWallet();
  const {mintFiorino, txReceipt} = useMintFiorino(account);

  const {errors} = form.formState;

  const onSubmit = async (data: MintForm) => {
    const {receiver, amount} = data;
    const contractAmount = BigInt(amount); // Convert amount to BigInt to avoid precision issues
    const config = getConfig(import.meta.env.VITE_APP_ENV);

    const contractClause = Clause.callFunction(Address.of(config.fiorinoContractAddress), ABIContract.ofAbi(config.fiorinoAbi).getFunction("transfer"), [receiver, contractAmount], VET.of(0), {comment: "transfer fiorino"});

    try {
      await mintFiorino([
        {
          to: contractClause.to,
          value: contractClause.value.toString(),
          data: contractClause.data.toString(),
          comment: `${account} sent you a coffee!`,
        },
      ]);

      if (txReceipt) {
        const thorClient = ThorClient.at(config.nodeUrl);
        const txReceiptStatus = await thorClient.transactions.waitForTransaction(txReceipt?.meta.txID);

        if (txReceiptStatus?.reverted) {
          toast({
            title: "Transaction Failed",
            description: "The transaction was reverted.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Success",
            description: "Minted correctly!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          form.reset();
        }
      }
    } catch (error) {
      console.error("Error sending coffee:", error);
      toast({
        title: "Error",
        description: "An error occurred while sending the coffee.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const {isMinter, minter} = useFiorinoMinter();
  console.log("minter", minter);
  if (!isMinter) {
    return null;
  }
  return (
    <Card>
      <CardBody>
        <VStack align={"stretch"} as="form" onSubmit={form.handleSubmit(onSubmit)} gap={4}>
          <HStack justify={"flex-end"} w="full">
            {isMinter && <Badge colorScheme="orange">Admin</Badge>}
          </HStack>
          <VStack align={"stretch"}>
            <Text fontSize="lg" fontWeight="bold">
              Mint
            </Text>
            <FormControl isInvalid={!!errors.amount}>
              <FormLabel>Amount</FormLabel>
              <Input
                {...form.register("amount", {
                  required: {
                    value: true,
                    message: "Amount is required",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Invalid amount",
                  },
                })}
              />
              <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.amount}>
              <FormLabel>Receiver</FormLabel>
              <Input
                {...form.register("receiver", {
                  required: {
                    value: true,
                    message: "Receiver is required",
                  },
                  pattern: {
                    value: /^0x[a-fA-F0-9]{40}$/,
                    message: "Invalid address",
                  },
                })}
              />
              <FormErrorMessage>{errors.receiver?.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Mint
            </Button>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};
