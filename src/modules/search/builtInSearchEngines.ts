/* eslint-disable @typescript-eslint/no-explicit-any */
import icon_baidu from '@assets/icons/icon_baidu.svg';
import icon_bilibili from '@assets/icons/icon_bilibili.svg';
import icon_bing from '@assets/icons/icon_bing.svg';
import icon_google from '@assets/icons/icon_google.svg';
import icon_weibo from '@assets/icons/icon_weibo.svg';

export enum SearchSuggestion {
  Baidu = 'baidu',
  Bilibili = 'bilibili',
  Bing = 'bing',
  Google = 'google',
  Weibo = 'weibo',
}

export type SearchEngine = {
  id: string;
  name: string;
  url: string;
  icon: string;
  type: 'custom' | 'builtin';
  suggestion?: SearchSuggestion;
};

export type SearchEngineSuggestion = {
  name: SearchSuggestion;
  url: string;
  transformer: (response: any) => string[];
};

export const builtInSearchEngines: SearchEngine[] = [
  {
    id: 'google',
    name: 'Google',
    url: 'https://www.google.com/search?q=%s',
    icon: icon_google,
    type: 'builtin',
    suggestion: SearchSuggestion.Google,
  },
  {
    id: 'baidu',
    name: 'Baidu',
    url: 'https://www.baidu.com/s?wd=%s',
    icon: icon_baidu,
    type: 'builtin',
    suggestion: SearchSuggestion.Baidu,
  },
  {
    id: 'bing',
    name: 'Bing',
    url: 'https://www.bing.com/search?q=%s',
    icon: icon_bing,
    type: 'builtin',
    suggestion: SearchSuggestion.Bing,
  },
  {
    id: 'bilibili',
    name: 'BiliBili',
    url: 'https://search.bilibili.com/all?keyword=%s',
    icon: icon_bilibili,
    type: 'builtin',
    suggestion: SearchSuggestion.Bilibili,
  },
  {
    id: 'weibo',
    name: 'Weibo',
    url: 'https://s.weibo.com/weibo?q=%s',
    icon: icon_weibo,
    type: 'builtin',
    suggestion: SearchSuggestion.Weibo,
  },
];

export const suggestions: SearchEngineSuggestion[] = [
  {
    name: SearchSuggestion.Google,
    url: 'https://suggestqueries.google.com/complete/search?output=chrome&q=',
    transformer: (data) => data[1],
  },
  {
    name: SearchSuggestion.Baidu,
    url: 'https://www.baidu.com/sugrec?prod=pc&wd=',
    transformer: (data) => data.g.map((item: any) => item.q),
  },
  {
    name: SearchSuggestion.Bing,
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
  {
    name: SearchSuggestion.Bilibili,
    url: 'https://api.bilibili.com/suggestion?term=',
    transformer: (data) => Object.values(data).map((item: any) => item.name),
  },
  {
    name: SearchSuggestion.Weibo,
    url: 'https://weibo.com/ajax/side/search?q=',
    transformer: (data) =>
      data.data.hotquery.map((item: any) => item.suggestion),
  },
];

const defaultSearchEngineSuggestion = suggestions.find(
  (item) => item.name === SearchSuggestion.Baidu,
);

export const getSearchSuggestion = (searchSuggestion?: SearchSuggestion) => {
  const suggestion = suggestions.find((item) => item.name === searchSuggestion);
  if (suggestion) return suggestion;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  else return defaultSearchEngineSuggestion!;
};
