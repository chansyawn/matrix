import { Heading, Icon, Square, Wrap } from '@chakra-ui/react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { FiPlus } from 'react-icons/fi';

import { useDispatch, useSelector } from '@common/hooks';
import { SearchEngine } from '@modules/search/builtInSearchEngines';
import SearchConfigActivatedEngineItem from '@modules/search/SearchConfigActivatedEngineItem';
import {
  activateSearchEngine,
  SearchEngineDndType,
  selectActivatedSearchEngines,
} from '@modules/search/searchSlice';

const SearchConfigActivatedEngine = () => {
  const { t } = useTranslation();
  const activatedSearchEngines = useSelector(selectActivatedSearchEngines);
  const dispatch = useDispatch();

  const [, addDrop] = useDrop(() => ({
    accept: SearchEngineDndType,
    drop: (engine: SearchEngine) => {
      dispatch(activateSearchEngine(engine.id));
    },
  }));

  return (
    <>
      <Heading size="xs">{t`search.activated`}</Heading>
      <Wrap>
        {activatedSearchEngines.map((engine) => (
          <SearchConfigActivatedEngineItem key={engine.id} engine={engine} />
        ))}
        <Square
          size="10"
          border="dashed"
          borderColor="gray.200"
          rounded="md"
          color="gray.200"
          ref={addDrop}
        >
          <Icon as={FiPlus} />
        </Square>
      </Wrap>
    </>
  );
};

export default SearchConfigActivatedEngine;
