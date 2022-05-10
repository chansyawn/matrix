import { Container } from '@chakra-ui/react';
import React from 'react';

import Header from '@modules/layout/Header';

const Home: React.FC = () => {
  return (
    <Container
      maxW="container.md"
      centerContent
      height="100vh"
      overflow="hidden"
    >
      <Header />
    </Container>
  );
};

export default Home;
