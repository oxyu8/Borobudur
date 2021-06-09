import React, { useState } from "react";
import aspida from "@aspida/axios";
import api from "./shared/api/$api";
import "./styles/index.css";
import { Data } from "./shared/api/v7.0/search/index";

function App() {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] =
    useState<Data["webPages"]["value"]>();

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
    const res = await client.v7_0.search.get({
      query: params,
      config: { headers },
    });
    setSearchResults(res.body.webPages.value);
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
      {/* @ts-ignore */}
      {searchResults &&
        searchResults.map((searchResult) => {
          return (
            <>
              <div style={{ height: 20 }}></div>
              <div style={{ width: 600 }}>
                <div style={{ color: "#6ac46a" }}>
                  https://www.maff.go.jp/j/syouan/nouan/carta/kiso_joho/...
                </div>
                <div
                  style={{ fontSize: 20, color: "#1A0DAB", fontWeight: "bold" }}
                >
                  {/* @ts-ignore */}
                  {searchResult.name}
                </div>
                {/* @ts-ignore */}
                <div>{searchResult.snippet}</div>
              </div>
            </>
          );
        })}
    </>
  );
}

export default App;
