interface SearchResult {
  dateLastCrawled: string;
  displayUrl: string;
  id: string;
  isFamilyFriendly: boolean;
  isNavigational: boolean;
  language: string;
  name: string;
  snippet: string;
  url: string;
}

interface Data {
  webPages: {
    totalEstimatedMatches: number;
    value: SearchResult;
  };
}

export interface Methods {
  get: {
    resBody: Data;
  };
}
