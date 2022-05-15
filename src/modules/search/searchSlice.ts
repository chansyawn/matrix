import {
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';

import { RootState } from '@app/store';
import { removeResource, setResource } from '@common/storage/resource';
import {
  builtInSearchEngines,
  SearchEngine,
} from '@modules/search/builtInSearchEngines';

export const SearchEngineDndType = Symbol('SearchEngine');

type SearchState = {
  activatedSearchEngineId: string[];
  customSearchEngines: SearchEngine[];
};

const initialState: SearchState = {
  activatedSearchEngineId: [],
  customSearchEngines: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    activateSearchEngine: (state, action: PayloadAction<string>) => {
      if (!state.activatedSearchEngineId.includes(action.payload))
        state.activatedSearchEngineId.push(action.payload);
    },
    unActivateSearchEngine: (state, action: PayloadAction<string>) => {
      state.activatedSearchEngineId = state.activatedSearchEngineId.filter(
        (searchEngineId) => searchEngineId !== action.payload,
      );
    },
    moveActivatedSearchEngine: (
      state,
      action: PayloadAction<{ targetEngineId: string; sourceEngineId: string }>,
    ) => {
      const { targetEngineId, sourceEngineId } = action.payload;
      const sourceIndex = state.activatedSearchEngineId.indexOf(sourceEngineId);
      const targetIndex = state.activatedSearchEngineId.indexOf(targetEngineId);
      if (targetIndex === -1) return;
      if (sourceIndex !== -1)
        state.activatedSearchEngineId.splice(sourceIndex, 1);
      state.activatedSearchEngineId.splice(targetIndex, 0, sourceEngineId);
    },
    addCustomSearchEngine: {
      reducer: (state, action: PayloadAction<SearchEngine>) => {
        state.customSearchEngines.push(action.payload);
      },
      prepare: ({
        name,
        url,
        icon,
      }: {
        name: string;
        url: string;
        icon: Blob;
      }) => {
        const type = 'custom';
        return {
          payload: {
            id: nanoid(),
            name,
            url,
            icon: setResource(icon),
            type: type as 'custom',
          },
        };
      },
    },
    removeCustomSearchEngine: (state, action: PayloadAction<string>) => {
      state.customSearchEngines = state.customSearchEngines.filter(
        (searchEngine) => {
          if (searchEngine.id === action.payload) {
            removeResource(searchEngine.icon);
            return false;
          }
          return true;
        },
      );
    },
  },
});

export const {
  activateSearchEngine,
  unActivateSearchEngine,
  moveActivatedSearchEngine,
  addCustomSearchEngine,
  removeCustomSearchEngine,
} = searchSlice.actions;

export const selectActivatedSearchEngineId = (state: RootState) =>
  state.search.activatedSearchEngineId;
export const selectCustomSearchEngines = (state: RootState) =>
  state.search.customSearchEngines;
export const selectAllSearchEngines = createSelector(
  [selectCustomSearchEngines],
  (customSearchEngines) => [...builtInSearchEngines, ...customSearchEngines],
);
export const selectActivatedSearchEngines = createSelector(
  [selectActivatedSearchEngineId, selectAllSearchEngines],
  (activatedSearchEngineId, allSearchEngines) => {
    const engines: SearchEngine[] = activatedSearchEngineId.reduce(
      (pre: SearchEngine[], searchEngineId) =>
        pre.concat(
          allSearchEngines.find(
            (searchEngine) => searchEngine.id === searchEngineId,
          ) ?? [],
        ),
      [],
    );
    return engines;
  },
);
export const selectUnActivatedSearchEngines = createSelector(
  [selectActivatedSearchEngineId, selectAllSearchEngines],
  (activatedSearchEngineId, allSearchEngines) =>
    allSearchEngines.filter(
      (searchEngine) => !activatedSearchEngineId.includes(searchEngine.id),
    ),
);

export default searchSlice.reducer;
