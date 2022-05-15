import { Container } from '@chakra-ui/react';

import Config from '@modules/layout/Config';
import Header from '@modules/layout/Header';

const Home = () => {
  return (
    <Container
      maxW="container.md"
      centerContent
      height="100vh"
      overflow="hidden"
    >
      <Header />
      <Config />
    </Container>
  );
};

export default Home;
