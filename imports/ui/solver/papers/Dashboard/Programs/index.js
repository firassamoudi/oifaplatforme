import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import ScrollArea from "react-scrollbars-custom";

import ProgramsCollection from "/imports/api/Program";
import TeamCollection from "/imports/api/Team";

import EmptyView from "../../../../common/EmptyView";
import Typography from "../../../../common/Typography";
import SolverProgramCard from "../../../components/SolverProgramCard";

const tableCols = [
  { label: "Challenge title", className: "col--title" },
  { label: "Application status", className: "col--status" },
  { label: "Deadline", className: "col--deadline" },
  { label: "Timeline", className: "col--timeline" },
  { label: "Application results", className: "col--results" },
  { label: "", className: "col--actions" },
];

const Programs = ({ solverId, programs, teams }) => {
  // ...
  return (
    <Box className="Programs">
      <Box className="Programs__header">
        <Typography size="2.4rem" color="#021c30" face="Bold">
          Programs
        </Typography>
      </Box>

      <Box className="Programs__table">
        {!!programs.length && (
          <Box className="Programs__table__cols">
            {tableCols.map((col, index) => (
              <Typography
                key={index}
                className={`${col.className}`}
                name="div"
                size="1.2rem"
                color="#8993a8"
                face="Medium"
              >
                {col.label}
              </Typography>
            ))}
          </Box>
        )}

        {!programs.length && (
          <Box className="Programs__empty">
            <EmptyView />
          </Box>
        )}

        <Box className="Programs__table__body">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <Box className="Programs__table__body__inner">
              {programs.map((program) => (
                <Box key={program._id}>
                  <SolverProgramCard
                    data={program}
                    solverId={solverId}
                    teams={teams}
                  />
                </Box>
              ))}
            </Box>
          </ScrollArea>
        </Box>
      </Box>
    </Box>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  const handle = Meteor.subscribe("programs-solver");
  if (!handle.ready()) {
    return { user, userId, solverId: null, programs: [], teams: [] };
  }
  const solverId = user.solverId;
  const programs = ProgramsCollection.find().fetch();
  const teams = TeamCollection.find().fetch();
  // ...
  return {
    user,
    userId,
    solverId,
    programs,
    teams,
  };
})(Programs);
