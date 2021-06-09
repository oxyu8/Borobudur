import React, { useState } from "react";
import aspida from "@aspida/axios";
import api from "./shared/api/$api";
import "./styles/index.css";
import { SearchResultCard } from "./components/SearchResultCard";
import { SearchResult } from "./shared/types";

function App() {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const changeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const fetchSearchResults = async () => {
    const client = api(aspida());
    const params = {
      q: query,
    };
    const headers = {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": process.env.REACT_APP_BING_APY_KEY,
    };
    //TODO: error handling
    const res = await client.v7_0.search.get({
      query: params,
      config: { headers },
    });
    const searchResults = res.body.webPages.value;
    setSearchResults(searchResults);
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <input
          value={query}
          onChange={changeQuery}
          style={{
            width: 500,
            height: 35,
            fontSize: 18,
            paddingLeft: 5,
            paddingRight: 5,
          }}
        />
        <div>
          <button
            style={{ width: 60, height: 40 }}
            onClick={fetchSearchResults}
          >
            検索
          </button>
        </div>
      </div>
      {searchResults &&
        searchResults.map((searchResult) => {
          return (
            <SearchResultCard key={searchResult.id} result={searchResult} />
          );
        })}
    </>
  );
}

export default App;
