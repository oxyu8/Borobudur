import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/index.css";
import { SearchResultCard } from "./components/SearchResultCard";
import { SearchResult } from "./shared/types";
import HelpIcon from "@material-ui/icons/Help";
import { Button, Box } from "@material-ui/core";
import { questions } from "./data/questions";

function App() {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isVisibleQuestionDialog, setIsVisibleQuestionDialog] =
    useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");

  const [phase, setPhase] = useState<number>(1);

  const THRESHOLD = 0;

  useEffect(() => {
    setQuestion(questions[phase - 1]);
  }, [phase]);

  const checkSimilarity = (searchResult: any) => {
    const similarity = searchResult[phase - 1];
    if (similarity > THRESHOLD) {
      const newPhase = phase + 1;
      setPhase(newPhase);
    }
  };

  const changeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const fetchSearchResults = async () => {
    const res = await axios.get("http://localhost:3000/search", {
      params: {
        query: query,
      },
    });
    const searchResults = res.data;
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
                  {question}
                </div>
              </div>
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
