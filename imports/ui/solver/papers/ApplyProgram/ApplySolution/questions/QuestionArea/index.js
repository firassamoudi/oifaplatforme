import React from "react";

import { EntryText } from "../../../../../../common/Entry";

const QuestionArea = ({ data, question, onQuestionResponse }) => {
  const id = question.id;
  // ...
  return (
    <EntryText
      multiline
      onInputChange={(inp) =>
        onQuestionResponse({ [id]: { ...question, answer: inp[id] } })
      }
      value={data[id]?.answer ?? ""}
      name={id}
      label={question.label}
      placeholder="Describe..."
      rows={4}
    />
  );
};

export default QuestionArea;
