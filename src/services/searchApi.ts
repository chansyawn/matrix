import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getSearchSuggestion } from '@services/searchEngineSuggestion';

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getSearchSuggestion: builder.query<
      string[],
      {
        keyword: string;
        searchEngineName: string;
      }
    >({
      query: ({ keyword, searchEngineName }) => {
        const suggestion = getSearchSuggestion(searchEngineName);
        return {
          url: suggestion.url + keyword,
        };
      },
      transformResponse: (response, meta, { searchEngineName }) => {
        try {
          const suggestion = getSearchSuggestion(searchEngineName);
          return suggestion.transformer(response);
        } catch (ignore) {
          return [];
        }
      },
    }),
  }),
});

export const { useGetSearchSuggestionQuery } = searchApi;
