export interface SearchResult {
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

export interface BingResBody {
  webPages: {
    totalEstimatedMatches: number;
    value: SearchResult[];
  };
}
