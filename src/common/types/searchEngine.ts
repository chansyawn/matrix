export type SearchEngine = {
  name: string;
  url: string;
  icon: string;
};

export type SearchEngineSuggestion = {
  url: string;
  jsonpCallback?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformer: (response: any) => string[];
};
