import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  ScaleFade,
  useDisclosure,
} from '@chakra-ui/react';
import { useDebounce } from '@common/hooks';
import { SearchEngine } from '@common/types';
import React, { useEffect, useRef, useState } from 'react';

import SearchSuggestion from '@modules/search/SearchSuggestion';
import { useGetSearchSuggestionQuery } from '@services/searchApi';

import icon_baidu from '@assets/icons/icon_baidu.svg';
import icon_bilibili from '@assets/icons/icon_bilibili.svg';
import icon_bing from '@assets/icons/icon_bing.svg';
import icon_google from '@assets/icons/icon_google.svg';

const searchEngines: SearchEngine[] = [
  {
    name: 'Google',
    url: 'https://www.google.com/search?q=',
    icon: icon_google,
  },
  {
    name: 'Baidu',
    url: 'https://www.baidu.com/s?wd=',
    icon: icon_baidu,
  },
  {
    name: 'Bing',
    url: 'https://www.bing.com/search?q=',
    icon: icon_bing,
  },
  {
    name: 'BiliBili',
    url: 'https://search.bilibili.com/all?keyword=',
    icon: icon_bilibili,
  },
];

const SearchBar: React.FC = () => {
  const [searchContent, setSearchContent] = useState('');
  const [preSelectSuggestionIndex, setPreSelectSuggestionIndex] = useState(0);
  const [preSelectEngineIndex, setPreSelectEngineIndex] = useState(0);

  const isSearching = searchContent.length > 0;
  const debouncedSearchContent = useDebounce(searchContent, 200);
  const engine = searchEngines[preSelectEngineIndex];

  const { data: suggestionsData, isFetching } = useGetSearchSuggestionQuery(
    {
      keyword: debouncedSearchContent,
      searchEngineName: engine.name,
    },
    {
      skip: !isSearching,
    },
  );
  const suggestions = [searchContent, ...(suggestionsData?.slice(0, 8) ?? [])];

  const {
    isOpen: isSuggestionOpen,
    onOpen: openSuggestion,
    onClose: closeSuggestion,
  } = useDisclosure();

  const inputRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    const url = engine.url + suggestions[preSelectSuggestionIndex];
    window.open(url, '_self');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setPreSelectSuggestionIndex(
        (pre) => (pre + 1 + suggestions.length) % suggestions.length,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setPreSelectSuggestionIndex(
        (pre) => (pre - 1 + suggestions.length) % suggestions.length,
      );
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (e.shiftKey)
        setPreSelectEngineIndex(
          (pre) => (pre - 1 + searchEngines.length) % searchEngines.length,
        );
      else
        setPreSelectEngineIndex(
          (pre) => (pre + 1 + searchEngines.length) % searchEngines.length,
        );
    }
  };

  useEffect(() => {
    setPreSelectSuggestionIndex(0);
  }, [suggestionsData]);

  return (
    <Popover
      initialFocusRef={inputRef}
      isOpen={isSuggestionOpen}
      matchWidth
      flip={false}
    >
      <PopoverTrigger>
        <InputGroup
          ref={inputRef}
          onBlur={closeSuggestion}
          onFocus={openSuggestion}
          w="full"
        >
          <InputLeftElement h="full" w="12">
            <SearchIcon />
          </InputLeftElement>
          <Input
            placeholder="输入并搜索"
            h="16"
            px="12"
            size="lg"
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement h="full" w="12">
            <ScaleFade in={isSearching}>
              <Center cursor="pointer">
                <CloseIcon boxSize="3" onClick={() => setSearchContent('')} />
              </Center>
            </ScaleFade>
          </InputRightElement>
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent w="inherit" _focus={{ shadow: 'none', outline: '0' }}>
        <PopoverBody p="0">
          <SearchSuggestion
            suggestions={suggestions}
            preSelectSuggestionIndex={preSelectSuggestionIndex}
            engines={searchEngines}
            preSelectEngineIndex={preSelectEngineIndex}
            isSuggestionFetching={isFetching}
            isSearching={isSearching}
            setPreSelectEngineIndex={setPreSelectEngineIndex}
            setPreSelectSuggestionIndex={setPreSelectSuggestionIndex}
            handleSearch={handleSearch}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SearchBar;
