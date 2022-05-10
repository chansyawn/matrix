import { Box } from '@chakra-ui/react';
import React from 'react';

import SearchBar from '@modules/search/SearchBar';

const Header: React.FC = () => {
  return (
    <Box mt="30vh" w="full">
      <SearchBar />
    </Box>
  );
};

export default Header;
