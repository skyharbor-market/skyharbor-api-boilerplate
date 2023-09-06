import React, { useState } from "react";
import { Box, Button, Container } from "@chakra-ui/react";
import {
  friendlyAddress,
  getWalletAddresses,
  setupWallet,
} from "../utils/walletUtils";
import { useAppData } from "../useAppData/useAppData";

export default function Layout({ children }) {
  const { appData, updateAppData } = useAppData();

  const [walletConnected, setWalletConnected] = useState(false);

  const setup = async () => {
    const res = await setupWallet("nautilus");

    if (res) {
      const adds = await getWalletAddresses();
      updateAppData({ addresses: adds });
      setWalletConnected(true);
    }
  };
  return (
    <>
      <main>
        <Box m={2} textAlign="right">
          <Button onClick={() => setup()}>
            {walletConnected
              ? friendlyAddress(appData?.addresses[0], 4)
              : "Connect wallet"}
          </Button>
        </Box>
        <Container
          mt={{ base: 8, md: 10, lg: 16 }}
          minH={"100vh"}
          maxW="2000px"
          paddingLeft={"6%"}
          paddingRight={"6%"}
        >
          {children}
        </Container>
      </main>
    </>
  );
}
