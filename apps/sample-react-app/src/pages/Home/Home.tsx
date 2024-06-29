import { Container, VStack } from "@chakra-ui/react";
import { Navbar } from "../../components/Navbar";
import { MintCard } from "./components/MintCard";
import { BalanceCard } from "./components/BalanceCard";
import { SendCard } from "./components/SendCard";

export const Home = () => {
  return (
    <VStack h="100vh" align="stretch">
      <Navbar />
      <Container maxW="container.lg" flex="1">
        <VStack align="stretch">
          <MintCard />
          <BalanceCard />
          <SendCard />
        </VStack>
      </Container>
    </VStack>
  );
};
