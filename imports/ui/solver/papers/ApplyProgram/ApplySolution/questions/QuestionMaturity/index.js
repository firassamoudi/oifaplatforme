import React from "react";

import { solutionMaturities } from "/imports/libs/inputs";

import { EntrySelect } from "../../../../../../common/Entry";

const QuestionMaturity = ({ data, question, onQuestionResponse }) => {
  const id = question.id;
  // ...
  return (
    <EntrySelect
      onInputChange={(inp) =>
        onQuestionResponse({ [id]: { ...question, answer: inp[id] } })
      }
      value={data[id]?.answer ?? ""}
      name={id}
      label={question.label}
      placeholder="Choose your solution maturity level"
      options={solutionMaturities}
    />
  );
};

export default QuestionMaturity;
