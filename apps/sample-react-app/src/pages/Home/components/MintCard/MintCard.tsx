import {
  Badge,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFiorinoMinter } from "../../../../hooks/useFiorinoMinter";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

interface MintForm {
  amount: string;
  receiver: string;
}

export const MintCard = () => {
  const form = useForm<MintForm>();
  const onSubmit = useCallback((data) => {
    console.log("data", data);
  }, []);

  const minter = useFiorinoMinter();
  console.log("minter", minter);
  const isMinter = true;
  if (!isMinter) {
    return null;
  }
  return (
    <Card>
      <CardBody>
        <VStack
          align={"stretch"}
          as="form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <HStack justify={"flex-end"} w="full">
            {isMinter && <Badge colorScheme="orange">Admin</Badge>}
          </HStack>
          <VStack align={"stretch"}>
            <Text fontSize="lg" fontWeight="bold">
              Mint
            </Text>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input {...form.register("amount")} />
            </FormControl>
            <FormControl>
              <FormLabel>Receiver</FormLabel>
              <Input {...form.register("receiver")} />
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
