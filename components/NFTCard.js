import { AspectRatio, Box, Button, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react'

export default function NFTCard({item}) {

    let tempLink = item.ipfs_art_hash ? `https://cloudflare-ipfs.com/ipfs/${item.ipfs_art_hash}` : `${item.ipfs_art_url}`;

  return (
    <Stack boxShadow="lg" borderRadius={"lg"} borderWidth={1} overflow="hidden" spacing={0} justifyContent="space-between">
        <Box>
          <AspectRatio ratio={1}>
            <Image objectFit="cover"  src={tempLink} alt="NFT Image"/>
          </AspectRatio>
        </Box>
        <Box px="4">
            <Text noOfLines={2} fontWeight="semibold" my="4" fontSize="lg">{item.nft_name}</Text>
        </Box>

            {/* nerg_sale_value is in nanoERG, so we must divide it */}
            <Box px="4">
              <Button as="a" href={`https://skyharbor.io/token/${item.token_id}`} target="_blank" rel="noreferrer"  mb="4" width={"100%"} colorScheme={"blue"}>{item.nerg_sale_value / 1000000000} ERG</Button>
            </Box>
    </Stack>
  )
}
