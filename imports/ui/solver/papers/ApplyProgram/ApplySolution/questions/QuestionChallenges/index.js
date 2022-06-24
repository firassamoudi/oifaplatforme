import "./style.scss";

import Box from "@material-ui/core/Box";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React from "react";

import Image from "../../../../../../common/Image";
import Typography from "../../../../../../common/Typography";

const QuestionChallengesItem = ({ data, onToggleChalenge, isSelected }) => {
  // ...
  return (
    <Box
      className={`QuestionChallenges__item ${isSelected && "__selected"}`}
      onClick={onToggleChalenge}
    >
      <Box className="QuestionChallenges__item__preview">
        {!!data?.imgId && <Image data={data?.imgId} />}
        {!data?.imgId && <img src="/default_challenge_preview.jpg" alt="" />}
      </Box>
      <Box className="QuestionChallenges__item__content">
        <Typography
          face="Medium"
          size="13px"
          height="2rem"
          style={{ margin: "0 0 1.6rem 0", color: "#434c5e" }}
        >
          {data.sector}
        </Typography>
        <Typography
          face="Medium"
          size="13px"
          height="2rem"
          style={{ margin: "0 0 1.6rem 0", color: "#434c5e" }}
        >
          {data.title}
        </Typography>
        <Typography
          face="Book"
          size="13px"
          height="1.9rem"
          style={{ color: "#9FA6BF" }}
        >
          {data.context}
        </Typography>

        {isSelected && (
          <CheckCircleIcon style={{ color: "#03256c", fontSize: "3rem" }} />
        )}
      </Box>
    </Box>
  );
};

const QuestionChallenges = ({ data, question, onQuestionResponse }) => {
  const id = question.id;
  const challenges = data?.[id] ?? [];
  // ...
  const onToggleChalenge = (index) => {
    const _chs = [...challenges];
    const isPicked = _chs[index].picked;
    _chs[index].picked = !isPicked;
    // ...
    onQuestionResponse({ [id]: [..._chs] });
  };
  // ...
  return (
    <Box className="QuestionChallenges">
      <Typography
        face="Medium"
        size="13px"
        height="2rem"
        style={{ margin: "0 0 2rem 0", color: "#434c5e" }}
      >
        {question.label}
      </Typography>
      <Box className="QuestionChallenges__list">
        {challenges.map((challenge, index) => (
          <QuestionChallengesItem
            key={index}
            data={challenge}
            onToggleChalenge={() => onToggleChalenge(index)}
            isSelected={challenge.picked}
          />
        ))}
      </Box>
    </Box>
  );
};

export default QuestionChallenges;
