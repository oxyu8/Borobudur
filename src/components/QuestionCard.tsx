import React from "react";

type Props = {
  question: string;
};

export const QuestionCard: React.FC<Props> = ({ question }) => {
  return (
    <div
      style={{
        backgroundColor: "#5686FF",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px",
        padding: "10px",
        maxWidth: "320px",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "20px",
          overflowWrap: "normal",
        }}
      >
        {question}
      </div>
    </div>
  );
};
