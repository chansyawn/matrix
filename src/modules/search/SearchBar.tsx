import {
  Alert,
  AlertIcon,
  Center,
  Icon,
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
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

import { useDebounce, useSelector } from '@common/hooks';
import { selectActivatedSearchEngines } from '@modules/search/searchSlice';
import SearchSuggestion from '@modules/search/SearchSuggestion';
import { useGetSearchSuggestionQuery } from '@services/searchApi';

const SearchBar = () => {
  const [searchContent, setSearchContent] = useState('');
  const [preSelectSuggestionIndex, setPreSelectSuggestionIndex] = useState(0);
  const [preSelectEngineIndex, setPreSelectEngineIndex] = useState(0);
  const searchEngines = useSelector(selectActivatedSearchEngines);

  const isAnyActivatedSearchEngine = searchEngines.length > 0;
  const isSearching = searchContent.length > 0;
  const debouncedSearchContent = useDebounce(searchContent, 200);
  const engine = searchEngines[preSelectEngineIndex];

  const toast = useToast();

  const arrayCycle = (arr: unknown[], dir: 'forward' | 'backward') => {
    return (pre: number) =>
      (pre + (dir === 'forward' ? 1 : -1) + arr.length) % arr.length;
  };

  const { currentData: suggestionsData, isFetching } =
    useGetSearchSuggestionQuery(
      {
        keyword: debouncedSearchContent,
        suggestion: engine?.suggestion,
      },
      {
        skip: !isSearching || !isAnyActivatedSearchEngine,
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
    if (!isAnyActivatedSearchEngine) {
      toast({
        title: 'No search engine activated',
        description: 'Please activate at least one search engine',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    } else {
      const url = engine.url.replace(
        '%s',
        suggestions[preSelectSuggestionIndex],
      );
      window.open(url, '_self');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ['Enter', 'ArrowUp', 'ArrowDown', 'Escape', 'Tab'];
    if (allowedKeys.includes(e.key)) {
      e.preventDefault();
      switch (e.key) {
        case 'Enter':
          handleSearch();
          break;
        case 'ArrowUp':
          setPreSelectSuggestionIndex(arrayCycle(suggestions, 'backward'));
          break;
        case 'ArrowDown':
          setPreSelectSuggestionIndex(arrayCycle(suggestions, 'forward'));
          break;
        case 'Tab':
          e.shiftKey
            ? setPreSelectEngineIndex(arrayCycle(searchEngines, 'backward'))
            : setPreSelectEngineIndex(arrayCycle(searchEngines, 'forward'));
          break;
        case 'Escape':
          closeSuggestion();
          inputRef.current?.blur();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    setPreSelectSuggestionIndex(0);
  }, [searchContent]);

  useEffect(() => {
    setPreSelectEngineIndex(0);
  }, [searchEngines]);

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
            <Icon as={FiSearch} />
          </InputLeftElement>
          <Input
            placeholder="Search"
            h="16"
            px="12"
            size="lg"
            value={suggestions[preSelectSuggestionIndex]}
            onChange={(e) => {
              openSuggestion();
              setSearchContent(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement h="full" w="12">
            <ScaleFade in={isSearching}>
              <Center cursor="pointer">
                <Icon
                  as={FiX}
                  boxSize="4"
                  onClick={() => setSearchContent('')}
                />
              </Center>
            </ScaleFade>
          </InputRightElement>
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent
        w="inherit"
        _focus={{ shadow: 'none', outline: '0' }}
        {...(!isAnyActivatedSearchEngine && { border: 'none' })}
        overflow="hidden"
      >
        <PopoverBody p="0">
          {isAnyActivatedSearchEngine ? (
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
          ) : (
            <Alert status="warning">
              <AlertIcon />
              No search engine activated
            </Alert>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SearchBar;
