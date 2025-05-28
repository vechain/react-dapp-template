import { HStack, Heading, useBreakpointValue } from "@chakra-ui/react";
import { WalletButton } from "@vechain/vechain-kit";

export const Navbar = () => {
  return (
    <HStack justify={"space-between"} p={2} borderBottom={"1px solid #EEEEEE"}>
      <Heading>Fiorino</Heading>
      <WalletButton
        mobile={useBreakpointValue({
          base: true,
          md: false,
        })}
      />
    </HStack>
  );
};
