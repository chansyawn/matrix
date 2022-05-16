import { Stack } from '@chakra-ui/react';

import SearchConfigActivatedEngine from '@modules/search/SearchConfigActivatedEngine';
import SearchConfigCustomEngine from '@modules/search/SearchConfigCustomEngine';
import SearchConfigUnActivatedEngine from '@modules/search/SearchConfigUnActivatedEngine';

const SearchConfigCard = () => {
  return (
    <Stack>
      <SearchConfigActivatedEngine />
      <SearchConfigUnActivatedEngine />
      <SearchConfigCustomEngine />
    </Stack>
  );
};

export default SearchConfigCard;
