import { SearchIcon } from '@chakra-ui/icons';
import {
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
  Kbd,
  List,
  ListItem,
  Spinner,
} from '@chakra-ui/react';
import { SearchEngine } from '@common/types';
import React from 'react';

type SearchSuggestionProps = {
  suggestions: string[];
  preSelectSuggestionIndex: number;
  engines: SearchEngine[];
  preSelectEngineIndex: number;
  isSuggestionFetching: boolean;
  isSearching: boolean;
  setPreSelectEngineIndex: (index: number) => void;
  setPreSelectSuggestionIndex: (index: number) => void;
  handleSearch: () => void;
};

const SearchSuggestion: React.FC<SearchSuggestionProps> = (props) => {
  const {
    suggestions,
    preSelectSuggestionIndex,
    preSelectEngineIndex,
    engines,
    isSuggestionFetching,
    isSearching,
    setPreSelectEngineIndex,
    setPreSelectSuggestionIndex,
    handleSearch,
  } = props;

  return (
    <List
      onMouseDown={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      cursor="pointer"
    >
      <ListItem
        bg={0 === preSelectSuggestionIndex ? 'gray.50' : 'transparent'}
        onMouseEnter={() => setPreSelectSuggestionIndex(0)}
      >
        <Flex p="2">
          <HStack>
            {engines.map((engine, idx) => (
              <IconButton
                key={idx}
                aria-label="Search"
                size="md"
                shadow={idx === preSelectEngineIndex ? 'outline' : 'none'}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setPreSelectEngineIndex(idx);
                }}
                icon={
                  <Image
                    src={engine.icon}
                    fallback={<SearchIcon />}
                    boxSize="6"
                  />
                }
              />
            ))}
          </HStack>
          <Center ml="auto">
            <HStack>
              {isSuggestionFetching && <Spinner size="sm" speed="0.75s" />}
              <Kbd>Tab</Kbd>
            </HStack>
          </Center>
        </Flex>
      </ListItem>
      {!isSuggestionFetching &&
        isSearching &&
        suggestions.slice(1).map((item, idx) => (
          <ListItem
            key={idx}
            p="2"
            fontSize="lg"
            bg={
              idx + 1 === preSelectSuggestionIndex ? 'gray.100' : 'transparent'
            }
            onMouseEnter={() => setPreSelectSuggestionIndex(idx + 1)}
          >
            {item}
          </ListItem>
        ))}
    </List>
  );
};

export default SearchSuggestion;
