import { VStack } from "@chakra-ui/react";
import { MintCard } from "./components/MintCard";
import { BalanceCard } from "./components/BalanceCard";
import { SendCard } from "./components/SendCard";

export const Home = () => {
  return (
    <VStack align="stretch">
      <BalanceCard />
      <MintCard />
      <SendCard />
    </VStack>
  );
};
