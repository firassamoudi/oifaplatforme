import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import ScrollArea from "react-scrollbars-custom";

import ProgramsCollection from "/imports/api/Program";

import EmptyView from "../../../../common/EmptyView";
import Typography from "../../../../common/Typography";
import ProgramsEvaluatorCard from "../../../components/ProgramsEvaluatorCard";

const tableCols = [
  {
    label: "tite",
    className: "__col __col--title",
  },
  {
    label: "seeker",
    className: "__col __col--seeker",
  },
  {
    label: "applications to review",
    className: "__col __col--applications",
  },
  {
    label: "start date",
    className: "__col __col--start",
  },
  {
    label: "end date",
    className: "__col __col--deadline",
  },
  {
    label: "",
    className: "__col __col--actions",
  },
];

const ProgramsEvaluator = ({ programs }) => {
  // ...
  return (
    <Box className="ProgramsEvaluator">
      <Box className="ProgramsEvaluator__header">
        <Typography size="2.4rem" color="#021c30" face="Bold">
          Programs
        </Typography>
      </Box>

      <Box className="ProgramsEvaluator__table">
        {!!programs.length && (
          <Box className="ProgramsEvaluator__table__cols">
            {tableCols.map((tab, index) => (
              <Box key={index} className={tab.className}>
                {tab.label}
              </Box>
            ))}
          </Box>
        )}

        {!programs.length && (
          <Box className="ProgramsEvaluator__empty">
            <EmptyView />
          </Box>
        )}

        <Box className="ProgramsEvaluator__table__body">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <Box className="ProgramsEvaluator__table__body__inner">
              {programs.map((program) => (
                <Box key={program._id}>
                  <ProgramsEvaluatorCard data={program} />
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
  const handle = Meteor.subscribe("programs-evaluator");
  if (!handle.ready()) {
    return { user, userId, programs: [] };
  }
  const programs = ProgramsCollection.find().fetch();
  // ...
  return {
    user,
    userId,
    programs,
  };
})(ProgramsEvaluator);
