/* eslint-disable prettier/prettier */
import { Box } from "@material-ui/core";
import React from "react";

import { EntryText } from "../../../../../common/Entry";
import Typography from "../../../../../common/Typography";
import EvaluationSlider from "../EvaluationSlider";

const RightSideContent = ({
  user,
  solver,
  canEvaluate,
  data,
  onInputChange,
}) => {
  const solverType = solver?.type;
  const criteria = data.submitted
    ? data.criteria
    : data.criteria.filter((crit) => {
      return crit.selected && crit.types.indexOf(solverType) > -1;
    });

  const onSliderChange = (index, value) => {
    const crit = [...criteria];
    crit[index].value = value;
    onInputChange({ criteria: [...crit] });
  };
  // ...
  return (
    <Box className="ApplicationEvaluation__eval__content__inner">
      <Box className="ApplicationEvaluation__eval__hello">
        <Box m="0 0 2rem 0">
          <Typography name="span" size="3.8rem" color="#0A0937" face="Bold">
            Hello,
            <span
              style={{
                color: "#1A1A1A",
                fontSize: "3.4rem",
                fontWeight: "normal",
              }}
            >
              {` ${user.profile.firstName}`}
            </span>
          </Typography>
        </Box>
        <Typography size="1.7rem" color="#8993A8" face="Medium" height="22px">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          eleifend neque Lorem ipsum dolor sit amet, consectetur elit adipiscing
        </Typography>
      </Box>

      {criteria.map((criterion, index) => {
        return (
          <EvaluationSlider
            key={index}
            index={index}
            data={criterion}
            onSliderChange={onSliderChange}
            readOnly={!canEvaluate}
          />
        );
      })}

      <Box>
        <Typography size="1.7rem" color="#0A0937" face="Medium" height="22px">
          Elaborate a full review about this application in order to give us an
          overview about this application.
        </Typography>
        <EntryText
          name="feedback"
          value={data.feedback}
          placeholder="Type your answer here"
          multiline
          rows={10}
          onInputChange={onInputChange}
          readOnly={!canEvaluate}
        />
      </Box>
    </Box>
  );
};

export default RightSideContent;
