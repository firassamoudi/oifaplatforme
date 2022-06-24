import "./style.scss";

import Box from "@material-ui/core/Box";
import React, { useEffect } from "react";

// import Typography from "../../../../common/Typography";
import {
  QuestionArea,
  QuestionChallenges,
  QuestionLinks,
  QuestionMaturity,
} from "./questions";

const QuestionTranslator = ({ data, question, onQuestionResponse }) => {
  return (
    <Box className="QuestionTranslator">
      {question.type === "text" && (
        <QuestionArea
          data={data}
          question={question}
          onQuestionResponse={onQuestionResponse}
        />
      )}
      {question.type === "challenges" && (
        <QuestionChallenges
          data={data}
          question={question}
          onQuestionResponse={onQuestionResponse}
        />
      )}
      {question.type === "prototype" && (
        <QuestionMaturity
          data={data}
          question={question}
          onQuestionResponse={onQuestionResponse}
        />
      )}
      {question.type === "links" && (
        <QuestionLinks
          data={data}
          question={question}
          onQuestionResponse={onQuestionResponse}
        />
      )}
    </Box>
  );
};

const ApplySolution = ({ solverType, data, program, onInputChange }) => {
  const isStartup = solverType?.toLowerCase() === "startup";
  const isDesigner = solverType?.toLowerCase() === "designer";
  const isDeveloper = solverType?.toLowerCase() === "developer";
  const isStudent = solverType?.toLowerCase() === "student";
  const isResearcher = solverType?.toLowerCase() === "researcher";
  // - QuestionTemplate
  let questionTemplate = [];
  if (isStartup) questionTemplate = program?.questionsStartup;
  if (isDesigner) questionTemplate = program?.questionsDesigner;
  if (isDeveloper) questionTemplate = program?.questionsDeveloper;
  if (isStudent) questionTemplate = program?.questionsStudent;
  if (isResearcher) questionTemplate = program?.questionsResearcher;
  // ...
  const onQuestionResponse = (inp) => {
    onInputChange({ solution: { ...data.solution, ...inp } });
  };
  // ...
  return (
    <Box className="ApplySolution">
      <Box className="__form">
        {questionTemplate
          .filter((question) => question.selected)
          .filter((question) => question.id !== "hear-about")
          .map((question, index) => (
            <QuestionTranslator
              key={index}
              data={data.solution}
              question={{ ...question }}
              onQuestionResponse={onQuestionResponse}
            />
          ))}
      </Box>
    </Box>
  );
};
export default ApplySolution;
