/* eslint-disable sonarjs/no-duplicate-string */
import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import ScrollArea from "react-scrollbars-custom";

import ApplicationsCollection from "/imports/api/Application";
import ProgramsCollection from "/imports/api/Program";

import NavLink from "../../../../common/NavLink";
import Typography from "../../../../common/Typography";
import EvaluationCard from "../../../components/EvaluationCard";
import TitleDot from "../../../components/TitleDot";

const tableCols = [
  {
    label: "evaluator",
    className: "__col __col--evaluator",
  },
  {
    label: "note",
    className: "__col __col--note",
  },
  {
    label: "time spent",
    className: "__col __col--time",
  },
  {
    label: "",
    className: "__col __col--actions",
  },
];

const Evaluations = ({ program, application }) => {
  const history = useHistory();
  const pathName = history.location.pathname;
  const isCFA = pathName.indexOf("call-for-applications") > -1;
  // - Solver
  const solver = application?.solver?.();
  const solverName = solver?.getOrgName?.() ?? "";
  // ...
  return (
    <Box className="Evaluations">
      <Box className="Evaluations__header">
        <Typography
          size="1.8rem"
          color="#021c30"
          face="Bold"
          style={{ display: "flex", alignItems: "center" }}
        >
          <NavLink
            to={`/dashboard/${isCFA ? "call-for-applications" : "programs"}`}
          >
            {isCFA ? "CFAs" : "Programs"}
          </NavLink>
          <TitleDot />
          {program?.title}
          <TitleDot />
          <NavLink
            to={`/dashboard/${isCFA ? "call-for-applications" : "programs"}/${
              program?._id
            }/applications`}
          >
            Applications
          </NavLink>
          <TitleDot />
          {solverName}
        </Typography>
      </Box>

      <Box className="Evaluations__table">
        <Box className="Evaluations__table__cols">
          {tableCols.map((tab, index) => (
            <Box key={index} className={tab.className}>
              {tab.label}
            </Box>
          ))}
        </Box>

        <Box className="Evaluations__table__body">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <Box className="Evaluations__table__body__inner">
              {application?.evaluations?.map((data, index) => (
                <EvaluationCard
                  key={index}
                  data={data}
                  progId={program._id}
                  appId={application._id}
                />
              ))}
            </Box>
          </ScrollArea>
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(
  withTracker((props) => {
    const progId = props.match.params.id;
    const applId = props.match.params.aid;
    const handle = Meteor.subscribe("program-application", {
      programId: progId,
      applicationId: applId,
    });
    if (!handle.ready()) return {};
    // ...
    const program = ProgramsCollection.findOne(progId);
    const application = ApplicationsCollection.findOne(applId);
    // ...
    return {
      program,
      application,
    };
  })(Evaluations)
);
