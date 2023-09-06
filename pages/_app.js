import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/layout";
import { AppContext } from "../useAppData/useAppData";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [appData, setAppData] = useState({
    addresses: null,
  });

  const updateAppData = (newData) => {
    setAppData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <ChakraProvider>
      <AppContext.Provider value={{ appData, updateAppData }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
