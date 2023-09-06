import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import NFTCard from "../components/NFTCard";
import styles from "../styles/Home.module.css";
import { skyHarborApi } from "../utils/consts";

const limit = 12;
// `${skyHarborApi}/api/sales?status=active&orderCol=list_time&order=asc&limit=${limit}`

export default function Home() {
  const [sales, setSales] = useState([]);

  // API parameters:
  //  status = active | complete | cancelled
  //  orderCol = column in which to order by. ex) list_time
  //  order = asc | desc
  //  limit = amount of items you want to grab

  async function getSales() {
    // You can find the sys_name by going on the collection page and looking at the name in the url
    //  ex) https://www.skyharbor.io/collection/ethugees <- ethugees being the sys_name
    const collectionSysName = "ethugees";
    const saleStatus = "active"; // active, inactive, complete, cancelled
    const orderColumn = "list_time";

    const res = await axios.get(
      `${skyHarborApi}/api/sales?collection=${collectionSysName}&status=${saleStatus}&limit=${limit}&orderCol=${orderColumn}&order=desc`
    );

    // Below API gets all verified NFT collections on SkyHarbor
    // const res = await axios.get(`${skyHarborApi}/api/collections`);

    console.log(res);
    if (!res) {
      return;
    }

    const resData = res.data;

    setSales(resData);
  }

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div>
      <Box mb="8" mt="12" textAlign={"center"}>
        <Text fontSize="5xl" fontWeight={"semibold"}>
          My NFT Collection
        </Text>
        <Text fontSize="lg" color="gray.600" fontWeight={"semibold"}>
          SkyHarbor Listings
        </Text>
      </Box>

      <div>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4} mb="10">
          {sales.map((item) => {
            return <NFTCard key={item.id} item={item} />;
          })}
        </SimpleGrid>
      </div>
    </div>
  );
}
