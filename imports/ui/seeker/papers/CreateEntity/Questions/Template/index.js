import Box from "@material-ui/core/Box";
import React from "react";

import ProgramQuestionCard from "../../../../components/ProgramQuestionCard";
import ProgramQuestionModal from "../../../../components/ProgramQuestionModal";
import store from "../../../../store";

const ProgramQuestionsTemplate = ({ dataId, data, onQuestionsChanged }) => {
  const onAddQuestion = ({ question }) => {
    const questions = [...data, question];
    onQuestionsChanged({ dataId, questions });
  };
  // ...
  const onEditQuestion = ({ id, question }) => {
    const questions = data.map((q, i) => {
      if (i === id) return { ...question };
      return { ...q };
    });
    // ...
    onQuestionsChanged({ dataId, questions });
  };
  // ...
  const onQuestionDelete = ({ id }) => {
    const questions = data.filter((q, i) => i !== id);
    onQuestionsChanged({ dataId, questions });
  };
  // ...
  return (
    <Box className="ProgramQuestionsTemplate">
      {data.map((q, i) => {
        return (
          <ProgramQuestionCard
            key={i}
            index={i}
            dataId={dataId}
            data={{ ...q }}
            onEditQuestion={onEditQuestion}
            onQuestionDelete={onQuestionDelete}
          />
        );
      })}

      <ProgramQuestionModal
        data={data}
        // ...
        onAddQuestion={onAddQuestion}
        onEditQuestion={onEditQuestion}
        // ...
        closeModal={() => {
          store.set("question", {
            open: false,
            index: null,
          });
        }}
      />
    </Box>
  );
};

export default ProgramQuestionsTemplate;
