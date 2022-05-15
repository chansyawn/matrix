import { useDrop } from 'react-dnd';

import { useDispatch } from '@common/hooks';
import { SearchEngine } from '@modules/search/builtInSearchEngines';
import SearchConfigEngineItem from '@modules/search/SearchConfigEngineItem';
import {
  moveActivatedSearchEngine,
  SearchEngineDndType,
} from '@modules/search/searchSlice';

type SearchConfigActivatedEngineItemProps = {
  engine: SearchEngine;
};

const SearchConfigActivatedEngineItem = ({
  engine,
}: SearchConfigActivatedEngineItemProps) => {
  const dispatch = useDispatch();

  const [, drop] = useDrop(
    () => ({
      accept: SearchEngineDndType,
      drop: (sourceEngine: SearchEngine) => {
        dispatch(
          moveActivatedSearchEngine({
            sourceEngineId: sourceEngine.id,
            targetEngineId: engine.id,
          }),
        );
      },
    }),
    [engine],
  );

  return <SearchConfigEngineItem drop={drop} engine={engine} isActivated />;
};

export default SearchConfigActivatedEngineItem;
