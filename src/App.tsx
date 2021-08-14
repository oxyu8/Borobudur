import React, { useState } from "react";
import aspida from "@aspida/axios";
import api from "./shared/api/$api";
import "./styles/index.css";
import { SearchResultCard } from "./components/SearchResultCard";
import { SearchResult } from "./shared/types";
import { useStopwatch } from "./hooks/useStopwatch";
import HelpIcon from "@material-ui/icons/Help";
import { Button, Box } from "@material-ui/core";
import { BorderColor } from "@material-ui/icons";

function App() {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isVisibleQuestionDialog, setIsVisibleQuestionDialog] =
    useState<boolean>(false);
  const { isRunning, elapsedTime, startTimer, stopTimer } = useStopwatch();

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
          {/* <div>
            {convertSec2Min().min}
            {"分"}
            {convertSec2Min().sec}
            {"秒"}
          </div>
          <div>
            <button onClick={startTimer}>start</button>
            <button onClick={stopTimer}>stop</button>
          </div> */}
        </div>
        {searchResults &&
          searchResults.map((searchResult) => {
            return (
              <SearchResultCard key={searchResult.id} result={searchResult} />
            );
          })}
        {isVisibleQuestionDialog && (
          <div style={{ position: "fixed", top: 580, right: 350 }}>
            <Box
              border={1}
              height={"160px"}
              width={"400px"}
              borderRadius="10px"
              style={{
                padding: "10px",
                paddingBottom: "50px",
                borderBottomRightRadius: "0px",
              }}
            >
              <div style={{ fontSize: "25px", fontWeight: "bold" }}>
                問いかけ文
              </div>
              <div style={{ height: "10px" }}></div>
              <div
                style={{
                  backgroundColor: "#5686FF",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                  padding: "10px",
                  width: "320px",
                }}
              >
                <div style={{ color: "white", fontSize: "29px" }}>
                遺伝子組み換えは本当に安全であると言えますか？
                </div>
              </div>
              {/* <div style={{ height: "20px" }}></div>
              <div
                style={{
                  backgroundColor: "#5686FF",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                  padding: "10px",
                  width: "250px",
                }}
              >
                <div style={{ color: "white" }}>
                  遺伝子組み換え食品は本当に安全であると言えますか？
                </div>
              </div> */}
            </Box>
          </div>
        )}
        <div style={{ position: "fixed", top: 810, right: 340 }}>
          <Button
            onClick={() => setIsVisibleQuestionDialog(!isVisibleQuestionDialog)}
          >
            <HelpIcon style={{ color: "#5686FF", fontSize: "50px" }} />
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
