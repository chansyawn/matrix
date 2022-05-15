import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  getSearchSuggestion,
  SearchSuggestion,
} from '@modules/search/builtInSearchEngines';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getSearchSuggestion: builder.query<
      string[],
      {
        keyword: string;
        suggestion?: SearchSuggestion;
      }
    >({
      query: ({ keyword, suggestion }) => {
        return {
          url: getSearchSuggestion(suggestion).url + keyword,
        };
      },
      transformResponse: (response, meta, { suggestion }) => {
        try {
          return getSearchSuggestion(suggestion).transformer(response);
        } catch (ignore) {
          return [];
        }
      },
    }),
  }),
});

export const { useGetSearchSuggestionQuery } = searchApi;
