import React, { useState, useEffect } from "react";
import aspida from "@aspida/axios";
import api from "./shared/api/$api";
import "./styles/index.css";
import { SearchResultCard } from "./components/SearchResultCard";
import { SearchResult } from "./shared/types";
import { useStopwatch } from "./hooks/useStopwatch";

function App() {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [question, setQuestion] = useState<string>("");
  const { isRunning, elapsedTime, startTimer, stopTimer } = useStopwatch();

  useEffect(() => {
    switch (elapsedTime) {
      case 5:
        setQuestion("遺伝子組み換えと品種改良の違いは？");
        break;
      case 10:
        setQuestion("遺伝子組み換えの歴史");
        break;
      case 15:
        setQuestion("遺伝子組み換えは環境に影響をあたえるのか");
        break;
      case 20:
        setQuestion("遺伝子組み換えは経済に影響を与えるのか");
        break;
      case 25:
        setQuestion("遺伝子組み換えの必要性について考えてみよう");
        break;
      case 30:
        setQuestion("遺伝子組み換えの安全性");
        break;
    }
  }, [elapsedTime]);

  const changeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const convertSec2Min = () => {
    const min = Math.floor(elapsedTime / 60);
    const sec = elapsedTime % 60;

    return {
      min,
      sec,
    };
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
      {/* <div
        style={{
          width: 400,
          height: 500,
          border: "solid",
          borderColor: "grey",
          borderWidth: 1,
          position: "absolute",
          right: 200,
        }}
      >
        <div style={{ fontSize: 30 }}>{question}</div>
      </div> */}
      <div style={{ marginLeft: 200, marginTop: 30 }}>
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
          <div>
            {convertSec2Min().min}
            {"分"}
            {convertSec2Min().sec}
            {"秒"}
          </div>
          <div>
            <button onClick={startTimer}>start</button>
            <button onClick={stopTimer}>stop</button>
          </div>
        </div>
        {searchResults &&
          searchResults.map((searchResult) => {
            return (
              <SearchResultCard key={searchResult.id} result={searchResult} />
            );
          })}
      </div>
    </>
  );
}

export default App;
