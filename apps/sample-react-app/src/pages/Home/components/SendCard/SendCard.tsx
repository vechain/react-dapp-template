import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

interface SendForm {
  amount: string;
  receiver: string;
}

export const SendCard = () => {
  const form = useForm<SendForm>();
  const onSubmit = useCallback((data) => {
    console.log("data", data);
  }, []);
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
          <Text fontSize="lg" fontWeight="bold">
            Send
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
            Send
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};
