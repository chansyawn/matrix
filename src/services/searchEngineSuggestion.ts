/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchEngineSuggestion } from '@common/types';

export const suggestions: Record<string, SearchEngineSuggestion> = {
  Google: {
    url: 'http://google.com/complete/search?client=chrome&q=',
    transformer: (data) => data[1],
  },
  Baidu: {
    url: 'https://www.baidu.com/sugrec?prod=pc&wd=',
    transformer: (data) => data.g.map((item: any) => item.q),
  },
  Bing: {
    url: 'https://api.bing.com/qsonhs.aspx?type=cb&q=',
    transformer: (data) =>
      data.AS.Results.reduce(
        (prev: any[], item: any) => [
          ...prev,
          ...item.Suggests.map((item: any) => item.Txt),
        ],
        [],
      ),
  },
  BiliBili: {
    url: 'https://api.bilibili.com/suggestion?term=',
    transformer: (data) => Object.values(data).map((item: any) => item.name),
  },
};

const defaultSearchEngineSuggestion = suggestions.Baidu;

export const getSearchSuggestion = (searchEngineName: string) => {
  return searchEngineName in suggestions
    ? suggestions[searchEngineName]
    : defaultSearchEngineSuggestion;
};
