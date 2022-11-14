import React from 'react';
import {
  Container
} from '@chakra-ui/react';

export default function Layout({ children }) {

  return (
    <>
      <main>
        <Container mt={{base: 8, md: 10, lg: 16}} minH={"100vh"} maxW='2000px' paddingLeft={'6%'} paddingRight={'6%'}>
          {children}
        </Container>
      </main>
    </>
  )
}
