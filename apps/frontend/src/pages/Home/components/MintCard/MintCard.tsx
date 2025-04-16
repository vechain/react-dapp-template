import {
  Badge,
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFiorinoMinter } from "../../../../hooks/useFiorinoMinter";
import { useForm } from "react-hook-form";
import { useMintFiorino } from "../../../../hooks/useMintFiorino";
import { TransactionModal, useTransactionModal } from "@vechain/vechain-kit";

interface MintForm {
  amount: string;
  receiver: string;
}

export enum TransactionModalStatus {
  Ready = "ready",
  Pending = "pending",
  WaitingConfirmation = "waitingConfirmation",
  Error = "error",
  Success = "success",
  UploadingMetadata = "uploadingMetadata",
  Unknown = "unknown",
}

export const MintCard = () => {
  const form = useForm<MintForm>();
  const { errors } = form.formState;
  const { isMinter } = useFiorinoMinter();

  // Use TransactionModal hook from vechainkit instead of useDisclosure
  const { isOpen, open, close } = useTransactionModal();

  const amount = form.watch("amount");
  const receiver = form.watch("receiver");

  const {
    sendTransaction,
    resetStatus,
    isTransactionPending,
    status,
    error,
    txReceipt,
  } = useMintFiorino({ receiver, amount: amount || "0" });

  const handleSubmit = async () => {
    sendTransaction(undefined);
    open(); // Use open from useTransactionModal
  };

  const handleClose = () => {
    resetStatus();
    close(); // Use close from useTransactionModal
    form.reset();
  };

  const isValid = form.formState.isValid;
  const isLoading = isTransactionPending || status === "pending";

  if (!isMinter) return null;

  return (
    <>
      <Card>
        <CardBody>
          <VStack
            align={"stretch"}
            as="form"
            onSubmit={form.handleSubmit(handleSubmit)}
            gap={4}
          >
            <HStack justify={"flex-end"} w="full">
              <Badge colorScheme="orange">Admin</Badge>
            </HStack>
            <VStack align={"stretch"}>
              <Text fontSize="lg" fontWeight="bold">
                Mint
              </Text>
              <FormControl isInvalid={!!errors.amount} isRequired>
                <FormLabel>Amount</FormLabel>
                <Input
                  {...form.register("amount", {
                    required: "Amount is required",
                    pattern: {
                      value: /^\d+$/,
                      message: "Invalid amount",
                    },
                  })}
                  isDisabled={isLoading}
                />
                <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.receiver} isRequired>
                <FormLabel>Receiver</FormLabel>
                <Input
                  {...form.register("receiver", {
                    required: "Receiver is required",
                    pattern: {
                      value: /^0x[a-fA-F0-9]{40}$/,
                      message: "Invalid address",
                    },
                  })}
                  isDisabled={isLoading}
                />
                <FormErrorMessage>{errors.receiver?.message}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                isDisabled={!isValid}
                isLoading={isLoading}
              >
                Mint
              </Button>
            </VStack>
          </VStack>
        </CardBody>
      </Card>

      <TransactionModal
        isOpen={isOpen}
        onClose={handleClose}
        status={
          error
            ? TransactionModalStatus.Error
            : (status as TransactionModalStatus)
        }
        successTitle="Fiorino tokens minted successfully"
        onTryAgain={handleSubmit}
        showTryAgainButton
        showExplorerButton
        txId={txReceipt?.meta.txID}
        pendingTitle={`Minting Fiorino tokens...`}
        errorTitle="Error during minting"
        errorDescription={error?.reason}
      />
    </>
  );
};
