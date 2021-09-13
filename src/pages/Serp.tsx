import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/index.css";
import { SearchResultCard } from "../components/SearchResultCard";
import { SearchResult } from "../shared/types";
import HelpIcon from "@material-ui/icons/Help";
import { Button } from "@material-ui/core";
import { questions } from "../data/questions";
import { THRESHOLD } from "../shared/constants";
import { SearchBar } from "../components/SearchBar";
import { QuestionCard } from "../components/QuestionCard";

export const Serp = () => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isVisibleQuestionDialog, setIsVisibleQuestionDialog] =
    useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [phase, setPhase] = useState<number>(1);

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "30px",
          marginLeft: "10%",
          marginRight: "10%",
        }}
      >
        <div>
          <SearchBar
            query={query}
            changeQuery={changeQuery}
            fetchSearchResults={fetchSearchResults}
          />
          {searchResults &&
            searchResults.map((searchResult) => {
              return (
                <SearchResultCard key={searchResult.id} result={searchResult} />
              );
            })}
        </div>
        <div style={{ marginLeft: "30px" }}>
          {isVisibleQuestionDialog ? (
            <QuestionCard question={question} />
          ) : (
            <div style={{ width: "340px" }} />
          )}
          <div>
            <Button
              onClick={() =>
                setIsVisibleQuestionDialog(!isVisibleQuestionDialog)
              }
            >
              <HelpIcon style={{ color: "#5686FF", fontSize: "50px" }} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
