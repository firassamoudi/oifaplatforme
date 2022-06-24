import { Box } from "@material-ui/core";
import React from "react";

import { EntryText } from "../../../../../common/Entry";
import Typography from "../../../../../common/Typography";
import EvaluationSlider from "../EvaluationSlider";

const RightSideContent = ({ ownerId, data }) => {
  const evaluator = Meteor.users.findOne({ _id: ownerId });
  const evaluatorFirstName = evaluator?.profile.firstName ?? "";
  const evaluatorLastName = evaluator?.profile.lastName ?? "";
  const criteria = data.criteria;
  // ...
  return (
    <Box className="ApplicationEvaluation__eval__content__inner">
      <Box className="ApplicationEvaluation__eval__hello">
        <Box m="0 0 2rem 0">
          <Typography name="span" size="3rem" color="#0A0937" face="Bold">
            {`${evaluatorFirstName} ${evaluatorLastName}`}
          </Typography>
        </Box>
      </Box>

      {criteria.map((criterion, index) => {
        return (
          <EvaluationSlider
            key={index}
            index={index}
            data={criterion}
            readOnly
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
          onInputChange={null}
          readOnly
        />
      </Box>
    </Box>
  );
};

export default RightSideContent;
