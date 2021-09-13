import React from "react";

type Props = {
  query: string;
  fetchSearchResults: any;
  changeQuery: any;
};

export const SearchBar: React.FC<Props> = ({
  query,
  fetchSearchResults,
  changeQuery,
}) => {
  return (
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
        <button style={{ width: 60, height: 40 }} onClick={fetchSearchResults}>
          検索
        </button>
      </div>
    </div>
  );
};
