import { Box, Icon, IconButton } from '@chakra-ui/react';
import { ConnectDropTarget, useDrag } from 'react-dnd';
import { FiTrash2 } from 'react-icons/fi';

import { useDispatch } from '@common/hooks';
import { SearchEngine } from '@modules/search/builtInSearchEngines';
import SearchIcon from '@modules/search/SearchIcon';
import {
  activateSearchEngine,
  removeCustomSearchEngine,
  SearchEngineDndType,
  unActivateSearchEngine,
} from '@modules/search/searchSlice';

type SearchConfigEngineItemProps = {
  engine: SearchEngine;
  isActivated?: boolean;
  drop?: ConnectDropTarget;
};

const SearchConfigEngineItem = ({
  engine,
  isActivated,
  drop,
}: SearchConfigEngineItemProps) => {
  const dispatch = useDispatch();
  const [, drag] = useDrag(
    () => ({
      type: SearchEngineDndType,
      item: engine,
    }),
    [engine],
  );

  const handleItemClick = () => {
    if (isActivated) dispatch(unActivateSearchEngine(engine.id));
    else dispatch(activateSearchEngine(engine.id));
  };

  return (
    <Box pos="relative">
      {!isActivated && engine.type === 'custom' && (
        <IconButton
          pos="absolute"
          right={0}
          top={0}
          size="inherit"
          p="0.5"
          rounded="sm"
          transform="translate(25%, -25%)"
          color="error"
          onClick={() => dispatch(removeCustomSearchEngine(engine.id))}
          aria-label={''}
          icon={<Icon as={FiTrash2} boxSize="3" />}
        />
      )}
      <SearchIcon
        src={engine.icon}
        ref={(r) => {
          drag(r);
          if (drop) drop(r);
        }}
        onClick={handleItemClick}
      />
    </Box>
  );
};

export default SearchConfigEngineItem;
