import { AspectRatio, Box, Button, Image, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useAppData } from "../useAppData/useAppData";
import { buildBuyEndpoint } from "../utils/consts";
import { signTx } from "../utils/walletUtils";

export default function NFTCard({ item }) {
  const { appData, updateAppData } = useAppData();

  const [loading, setLoading] = useState(false);

  // Get IPFS image URL
  let tempLink = item.ipfs_art_hash
    ? `https://cloudflare-ipfs.com/ipfs/${item.ipfs_art_hash}`
    : `${item.ipfs_art_url}`;

  // Buy NFT
  const buyNFT = async () => {
    setLoading(true);
    const walletAddresses = appData.addresses;

    console.log("wallet addresses: ", walletAddresses);

    // Create data object being sent to SkyHarbor API
    let data = JSON.stringify({
      userAddresses: walletAddresses,
      buyBox: item,
    });

    // Create axios config
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: buildBuyEndpoint,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const res = await axios.request(config);

    // transaction_to_sign is what is being sent to wallet to sign
    const builtTx = res.data.transaction_to_sign;

    signTx(builtTx);
    setLoading(false);
  };

  return (
    <Stack
      boxShadow="lg"
      borderRadius={"lg"}
      borderWidth={1}
      overflow="hidden"
      spacing={0}
      justifyContent="space-between"
    >
      <Box>
        <AspectRatio ratio={1}>
          <Image objectFit="cover" src={tempLink} alt="NFT Image" />
        </AspectRatio>
      </Box>
      <Box px="4">
        <Text noOfLines={2} fontWeight="semibold" my="4" fontSize="lg">
          {item.nft_name}
        </Text>
      </Box>

      {/* nerg_sale_value is in nanoERG, so we must divide it */}
      <Box px="4">
        <Button
          onClick={buyNFT}
          mb="4"
          width={"100%"}
          colorScheme={"blue"}
          isLoading={loading}
        >
          {item.nerg_sale_value / 1000000000} ERG
        </Button>
      </Box>
    </Stack>
  );
}
