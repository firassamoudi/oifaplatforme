import { Box } from "@material-ui/core";
import React from "react";

import { timeSpent } from "/imports/libs/time";

import Avatar from "../../../../../common/Avatar";
import Typography from "../../../../../common/Typography";

const RightSideHeader = ({ ownerId, data }) => {
  const evaluator = Meteor.users.findOne({ _id: ownerId });
  const evaluatorFirstName = evaluator?.profile.firstName ?? "";
  const evaluatorLastName = evaluator?.profile.lastName ?? "";
  const avatar = `${evaluatorFirstName} ${evaluatorLastName}`;
  // ...
  const time = timeSpent({
    start: data.dateStart,
    end: data.dateEnd,
  });
  // ...
  return (
    <Box className="ApplicationEvaluation__eval__header">
      <Box style={{ height: "5rem" }}>
        <Typography
          size="1.5rem"
          color="#1A1A1A"
          face="Medium"
          style={{ margin: "0 0 0.7rem 0" }}
        >
          Evaluation Time
        </Typography>
        <Typography size="1.5rem" color="rgb(137, 147, 168)" face="Medium">
          {time}
        </Typography>
      </Box>
      <Avatar
        label={avatar}
        style={{
          width: "5.5rem",
          height: "5.5rem",
        }}
      />
    </Box>
  );
};

export default RightSideHeader;
