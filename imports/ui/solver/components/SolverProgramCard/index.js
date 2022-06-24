/* eslint-disable sonarjs/cognitive-complexity */
import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import ApplicationCollection from "/imports/api/Application";
import nowRemain from "/imports/libs/nowRemain";
import ProgramTimeline from "/imports/libs/timeline";

import Typography from "../../../common/Typography";

const tooltipStyles = {
  className: "tool",
  type: "dark",
  place: "bottom",
  arrowColor: "#010d25",
  textColor: "#CDCFD4",
};

const SolverProgramCard = ({ solverId, data, teams, application }) => {
  const history = useHistory();
  // ...

  // - Timeline
  const timeline = new ProgramTimeline({ data: data.timeline });
  const appPhase = timeline.getPhase("applications");
  const current = timeline.current();
  const phaseRemains = timeline.phaseRemain();
  // ...
  const appPublished = application?.published;
  const appAccepted = application?.accepted;
  const appEvaluated = application?.evaluated;
  const appDropped = application?.dropped;
  // ...

  // - Workplace
  const isWorkplacePhase = timeline.isWorkplace();
  const workplace = data?.workplace();
  const workplacePublished = workplace?.published;
  // ...
  const isInTeam = teams.filter((team) => {
    let isExist = false;
    team.members.forEach((memberId) => {
      if (solverId === memberId) isExist = true;
    });
    return isExist;
  });
  const hasTeam = isInTeam[0] ?? null;
  // ...

  const workplaceIcon =
    isWorkplacePhase && workplacePublished && hasTeam && !appDropped ? (
      <>
        <div
          data-tip
          data-for="Workplace"
          onClick={() => {
            history.push(
              `/dashboard/workplace/${workplace._id}/${hasTeam._id}`
            );
          }}
        >
          <img src="/assets/Workplace.svg" alt="workplace" />
        </div>
        <ReactTooltip id="Workplace" {...tooltipStyles}>
          <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
            My workplace
          </Typography>
        </ReactTooltip>
      </>
    ) : null;
  // ...
  return (
    <Box className="SolverProgramCard">
      <Typography
        className="SolverProgramCard__title"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {data.title || "Untitled"}
      </Typography>
      <Box className="SolverProgramCard__status">
        <Box className="SolverProgramCard__status__inner">
          {appPublished && <Box className="__completed">Completed</Box>}
          {!appPublished && (
            <Box className="__not-completed">Not completed</Box>
          )}
        </Box>
      </Box>
      <Typography
        className="SolverProgramCard__deadline"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {moment(appPhase.end).format("DD/MM/YYYY")}
      </Typography>
      <Box className="SolverProgramCard__timeline">
        <Typography
          size="1.6rem"
          color="#061237"
          face="Bold"
          style={{ margin: "0 0 0.8rem 0" }}
        >
          {current.label}
        </Typography>
        <Typography size="1.3rem" color="#8993a8">
          {phaseRemains}
        </Typography>
      </Box>
      <Box className="SolverProgramCard__results">
        <Box className="SolverProgramCard__results__inner">
          {!appEvaluated && "-"}
          {appEvaluated && appAccepted && (
            <Box className="__accepted">Accepted</Box>
          )}
          {appEvaluated && !appAccepted && (
            <Box className="__not-accepted">Not accepted</Box>
          )}
        </Box>
      </Box>
      <Box className="SolverProgramCard__actions">
        <div
          data-tip
          data-for="View"
          onClick={() => {
            window.open(
              `/dashboard/i/${
                data.isCFA ? "cfa-overview" : "program-overview"
              }/${data._id}`
            );
          }}
        >
          <img src="/assets/View.svg" alt="view" />
        </div>
        <ReactTooltip id="View" {...tooltipStyles}>
          <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
            {`View ${data.isCFA ? "CFA" : "program"}`}
          </Typography>
        </ReactTooltip>
        <div
          data-tip
          data-for="Application"
          onClick={() => {
            window.open(
              `/dashboard/program/${data._id}/applications/${application._id}/details`
            );
          }}
        >
          <img src="/assets/Application.svg" alt="application" />
        </div>
        <ReactTooltip id="Application" {...tooltipStyles}>
          <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
            View applications
          </Typography>
        </ReactTooltip>
        {workplaceIcon}
      </Box>
    </Box>
  );
};

export default withTracker(({ solverId, data, teams }) => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  // ...
  const application = ApplicationCollection.findOne({ programId: data._id });
  // ...
  return {
    user,
    userId,
    solverId,
    data,
    teams,
    application,
  };
})(SolverProgramCard);
