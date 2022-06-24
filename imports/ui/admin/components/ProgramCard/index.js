import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";

import ProgramTimeline from "/imports/libs/timeline";

import Typography from "../../../common/Typography";

const AdminProgramsCard = ({ data }) => {
  // - Timeline
  const timeline = new ProgramTimeline({ data: data.timeline });
  const current = timeline.current();
  const phaseRemains = timeline.phaseRemain();
  // - Accept Program
  const onOpenProgram = () => {
    window.open(`/dashboard/i/program-overview/${data._id}`);
  };
  // ...
  return (
    <Box className="AdminProgramsCard" onClick={onOpenProgram}>
      <Typography
        className="AdminProgramsCard__title"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {data.title}
      </Typography>
      <Typography
        className="AdminProgramsCard__applications"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {data.applications().length}
      </Typography>
      <Box className="AdminProgramsCard__timeline">
        <Typography
          size="1.6rem"
          color="#061237"
          face="Bold"
          style={{ margin: "0 0 0.8rem 0" }}
        >
          {current?.label ?? "Draft"}
        </Typography>
        <Typography size="1.3rem" color="#8993a8">
          {phaseRemains}
        </Typography>
      </Box>
      <Typography
        className="AdminProgramsCard__status"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {data.accepted ? "Accepted" : "Pending"}
      </Typography>
    </Box>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  // ...
  return {
    user,
    userId,
  };
})(AdminProgramsCard);
