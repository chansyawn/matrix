import { Heading, Icon, Square, Wrap } from '@chakra-ui/react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { FiMinus } from 'react-icons/fi';

import { useDispatch, useSelector } from '@common/hooks';
import { SearchEngine } from '@modules/search/builtInSearchEngines';
import SearchConfigEngineItem from '@modules/search/SearchConfigEngineItem';
import {
  SearchEngineDndType,
  selectUnActivatedSearchEngines,
  unActivateSearchEngine,
} from '@modules/search/searchSlice';

const SearchConfigUnActivatedEngine = () => {
  const { t } = useTranslation();
  const unActivatedEngines = useSelector(selectUnActivatedSearchEngines);
  const dispatch = useDispatch();

  const [, removeDrop] = useDrop(() => ({
    accept: SearchEngineDndType,
    drop: (engine: SearchEngine) => {
      dispatch(unActivateSearchEngine(engine.id));
    },
  }));

  return (
    <>
      <Heading size="xs">{t`search.unactivated`}</Heading>
      <Wrap>
        {unActivatedEngines.map((engine) => (
          <SearchConfigEngineItem
            key={engine.id}
            engine={engine}
            isActivated={false}
          />
        ))}
        <Square
          size="10"
          border="dashed"
          borderColor="gray.200"
          rounded="md"
          color="gray.200"
          ref={removeDrop}
        >
          <Icon as={FiMinus} />
        </Square>
      </Wrap>
    </>
  );
};

export default SearchConfigUnActivatedEngine;
