/* eslint-disable sonarjs/no-identical-functions */
import "./style.scss";

import { Box } from "@material-ui/core";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";

import ApplicationsCollection from "/imports/api/Application";
import ProgramsCollection from "/imports/api/Program";

import LeftSideContent from "./components/LeftSideContent";
import LeftSideHeader from "./components/LeftSideHeader";

const SeekerApplicationEvaluationView = ({
  program,
  solver,
  owner,
  application,
  ownerId,
}) => {
  const [data, setData] = useState({
    dateStart: null,
    dateEnd: null,
    feedback: "",
    criteria: [],
  });
  // ...
  useEffect(() => {
    if (!data.criteria.length) {
      const evaluations = application.evaluations;
      const evaluationf = evaluations.filter((evaluation) => {
        return evaluation.ownerId === ownerId;
      });
      const evaluation = evaluationf[0] ?? {};
      setData((state) => ({ ...state, ...evaluation }));
    }
  }, [program, solver, application]);
  // ...
  return (
    <Box className="ApplicationEvaluationView">
      <Box className="ApplicationEvaluationView__inner">
        <Box className="ApplicationEvaluationView__LeftSide">
          <LeftSideHeader program={program} solver={solver} />
          <LeftSideContent
            owner={owner}
            solver={solver}
            program={program}
            application={application}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(
  withTracker((props) => {
    const user = Meteor.user();
    const userId = Meteor.userId();
    const progId = props.match.params.id;
    const applId = props.match.params.aid;
    const ownerId = props.match.params.oid;
    const handle = Meteor.subscribe("program-application", {
      programId: progId,
      applicationId: applId,
    });

    if (!handle.ready()) {
      return {
        user,
        userId,
        progId,
        applId,
        ownerId,
        program: { timeline: [] },
        solver: {},
        owner: { profile: {}, emails: [{ address: "" }] },
        application: { evaluations: [] },
      };
    }
    const program = ProgramsCollection.findOne(progId);
    const application = ApplicationsCollection.findOne(applId);
    const solver = application.solver();
    const owner = solver.owner();
    // ...
    return {
      user,
      userId,
      progId,
      applId,
      ownerId,
      program,
      solver,
      owner,
      application,
    };
  })(SeekerApplicationEvaluationView)
);
