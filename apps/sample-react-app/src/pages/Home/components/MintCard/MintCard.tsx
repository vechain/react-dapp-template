import { Badge, Card, CardBody, HStack, Text, VStack } from "@chakra-ui/react";
import { useFiorinoMinter } from "../../../../hooks/useFiorinoMinter";

export const MintCard = () => {
  const minter = useFiorinoMinter();
  console.log("minter", minter);
  const isMinter = true;
  if (!isMinter) {
    return null;
  }
  return (
    <Card>
      <CardBody>
        <VStack justify={"stretch"}>
          <HStack justify={"flex-end"} w="full">
            {isMinter && <Badge colorScheme="orange">Admin</Badge>}
          </HStack>
          <VStack justify={"stretch"}>
            <Text fontSize="lg" fontWeight="bold">
              Mint
            </Text>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};
