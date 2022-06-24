/* eslint-disable sonarjs/no-identical-functions */
import "./style.scss";

import { Box } from "@material-ui/core";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import ScrollArea from "react-scrollbars-custom";

import ApplicationsCollection from "/imports/api/Application";
import ProgramsCollection from "/imports/api/Program";
import ProgramTimeline from "/imports/libs/timeline";

import LeftSideContent from "./components/LeftSideContent";
import LeftSideHeader from "./components/LeftSideHeader";
import RightSideContent from "./components/RightSideContent";
import RightSideHeader from "./components/RightSideHeader";

const SeekerApplicationEvaluation = ({
  user,
  userId,
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
  const onInputChange = (inp) => {
    setData((state) => ({ ...state, ...inp }));
  };
  // - Timeline
  const timeline = new ProgramTimeline({ data: program?.timeline });
  const isEvaluation = timeline.isEvaluation();
  // - IsEvaluated
  const evaluations = application.evaluations.filter((evaluation) => {
    return userId === evaluation.ownerId;
  });
  const evaluation = evaluations[0] || { criteria: [] };
  const criteria = evaluation.criteria;
  const isEvaluated = !!evaluation && !!criteria.length;
  // - UserRole
  const isEvaluator = Roles.userIsInRole(userId, ["EVALUATOR_OWNER"]);
  // ...
  const canEvaluate = !isEvaluated && isEvaluation;
  // ...
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
    <Box className="SeekerApplicationEvaluation">
      <Box className="SeekerApplicationEvaluation__inner">
        <Box className="SeekerApplicationEvaluation__LeftSide">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <LeftSideHeader program={program} solver={solver} />
            <LeftSideContent
              owner={owner}
              solver={solver}
              program={program}
              application={application}
            />
          </ScrollArea>
        </Box>

        <Box className="SeekerApplicationEvaluation__eval">
          <RightSideHeader owner={user} ownerId={ownerId} data={data} />
          <Box className="SeekerApplicationEvaluation__eval__content">
            <ScrollArea
              momentum
              style={{ flex: 1, width: "100%", height: "100%" }}
            >
              <RightSideContent
                data={data}
                user={user}
                ownerId={ownerId}
                solver={solver}
                program={program}
                application={application}
                onInputChange={onInputChange}
                isEvaluator={isEvaluator}
                canEvaluate={canEvaluate}
              />
            </ScrollArea>
          </Box>
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
  })(SeekerApplicationEvaluation)
);
