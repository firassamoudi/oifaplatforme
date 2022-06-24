import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import ProgramTimeline from "/imports/libs/timeline";

import Typography from "../../../common/Typography";

const tooltipStyles = {
  className: "tool",
  type: "dark",
  place: "bottom",
  arrowColor: "#010d25",
  textColor: "#CDCFD4",
};

const ProgramsEvaluatorCard = ({ userId, data }) => {
  const history = useHistory();
  // - Timeline
  const timeline = new ProgramTimeline({ data: data.timeline });
  const phase = timeline.getPhase("evaluations");
  // ...

  const applications = data?.applications() ?? [];
  let applicationsRemains = applications.length;
  // ...
  applications.forEach((application) => {
    const evaluations = application.evaluations;
    const evaluated = evaluations.filter((evaluation) => {
      return evaluation.ownerId === userId;
    });
    // ...
    if (evaluated.length > 0) {
      applicationsRemains -= 1;
    }
  });
  // ...
  const seeker = data?.seeker?.();
  // ...
  return (
    <Box className="ProgramsEvaluatorCard">
      <Typography
        className="ProgramsEvaluatorCard__title"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {data.title || "Untitled"}
      </Typography>
      <Typography
        className="ProgramsEvaluatorCard__seeker"
        size="2rem"
        color="#061338"
        face="Bold"
      >
        {seeker?.organization}
      </Typography>
      <Typography
        className="ProgramsEvaluatorCard__applications"
        size="2rem"
        color="#061338"
        face="Bold"
      >
        {applicationsRemains}
      </Typography>
      <Typography
        className="ProgramsEvaluatorCard__start"
        size="2rem"
        color="#061338"
        face="Bold"
      >
        {moment(phase.start).format("DD/MM/YYYY")}
      </Typography>
      <Typography
        className="ProgramsEvaluatorCard__deadline"
        size="2rem"
        color="#061338"
        face="Bold"
      >
        {moment(phase.end).format("DD/MM/YYYY")}
      </Typography>
      <Box className="ProgramsEvaluatorCard__actions">
        <div
          data-tip
          data-for="View"
          onClick={() => {
            window.open(`/dashboard/i/program-overview/${data._id}`);
          }}
        >
          <img src="/assets/view program.svg" alt="view" />
        </div>
        <ReactTooltip id="View" {...tooltipStyles}>
          <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
            View program
          </Typography>
        </ReactTooltip>
        <div
          data-tip
          data-for="Application"
          onClick={() => {
            history.push(`/dashboard/programs/${data._id}/applications`);
          }}
        >
          <img src="/assets/View application.svg" alt="application" />
        </div>
        <ReactTooltip id="Application" {...tooltipStyles}>
          <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
            View applications
          </Typography>
        </ReactTooltip>
      </Box>
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
})(ProgramsEvaluatorCard);
