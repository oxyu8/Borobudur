export interface SearchResult {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  displayUrl: string;
  id: string;
  name: string;
  snippet: string;
}

export interface BingResBody {
  webPages: {
    totalEstimatedMatches: number;
    value: SearchResult[];
  };
}
