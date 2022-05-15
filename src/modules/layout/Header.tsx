import { Box } from '@chakra-ui/react';

import SearchBar from '@modules/search/SearchBar';

const Header = () => {
  return (
    <Box mt="30vh" w="full">
      <SearchBar />
    </Box>
  );
};

export default Header;
