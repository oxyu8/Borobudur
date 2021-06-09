import React, { useState } from "react";
import axios from "axios";
import "./styles/index.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const ENDPOINT = "https://api.bing.microsoft.com/v7.0/search";

  const fetchSearchResults = async () => {
    const params = {
      q: "遺伝子組み替え",
    };
    const headers = {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": process.env.REACT_APP_BING_APY_KEY,
    };
    const res = await axios.get(ENDPOINT, { params, headers });
    setSearchResults(res.data.webPages.value);
    console.log(res);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <input
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
