import { Card, CardBody, HStack, VStack } from "@chakra-ui/react";

export const SendCard = () => {
  const isMinter = true;
  if (!isMinter) {
    return null;
  }
  return (
    <Card>
      <CardBody>
        <VStack justify={"stretch"}>
          <HStack justify={"flex-end"} w="full"></HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};
