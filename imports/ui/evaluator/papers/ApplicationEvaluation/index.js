/* eslint-disable sonarjs/no-identical-functions */
import "./style.scss";

import { Box } from "@material-ui/core";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import ScrollArea from "react-scrollbars-custom";

import ApplicationsCollection from "/imports/api/Application";
import ProgramsCollection from "/imports/api/Program";
import ProgramTimeline from "/imports/libs/timeline";

import LeftSideContent from "./components/LeftSideContent";
import LeftSideHeader from "./components/LeftSideHeader";
import RightSideContent from "./components/RightSideContent";
import RightSideFooter from "./components/RightSideFooter";
import RightSideHeader from "./components/RightSideHeader";

const ApplicationEvaluation = ({
  isLoading,
  user,
  userId,
  program,
  solver,
  owner,
  application,
}) => {
  const history = useHistory();
  const solverType = solver.type;
  const baseCriteria =
    program?.criteria
      ?.filter((criterion) => {
        return criterion.types.indexOf(solverType) > -1;
      })
      .map((criterion) => ({ ...criterion, value: 0 })) ?? [];
  // ...
  const [data, setData] = useState({
    dateStart: null,
    dateEnd: null,
    feedback: "",
    criteria: [...baseCriteria],
  });
  const onInputChange = (inp) => {
    setData((state) => ({ ...state, ...inp }));
  };
  // - Timeline
  const timeline = new ProgramTimeline({ data: program?.timeline });
  const evalPhase = timeline.getPhase("evaluations");
  const dateNow = Date.now();
  const isEvalNotStated = dateNow < evalPhase.start;
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
  // Submit Evaluation
  const onSubmitEvaluation = () => {
    const evaluation = {
      appId: application._id,
      programId: program._id,
      solverId: solver._id,
      data,
      submitted: false,
    };
    // ...
    Meteor.call("application.evaluation.add", evaluation, (err) => {
      if (err) return;
      history.push(`/dashboard/programs/${program._id}/applications`);
    });
  };
  // ...
  useEffect(() => {
    if (!data.criteria.length) {
      // - Submitted Evaluation
      const evaluations = application.evaluations;
      const evaluationf = evaluations.filter((evaluation) => {
        return evaluation.ownerId === user._id;
      });
      const evaluation = evaluationf[0] ?? null;
      // ...
      if (evaluation) {
        setData((state) => ({ ...state, ...evaluation, submitted: true }));
      } else {
        setData((state) => ({ ...state, criteria: [...baseCriteria] }));
      }
    }
  }, [program, solver, application]);
  // ...
  return (
    <Box className="ApplicationEvaluation">
      <Box className="ApplicationEvaluation__inner">
        <Box className="ApplicationEvaluation__LeftSide">
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

        <Box className="ApplicationEvaluation__eval">
          <RightSideHeader
            owner={user}
            data={data}
            onInputChange={onInputChange}
            canEvaluate={canEvaluate}
            isEvalNotStated={isEvalNotStated}
            isLoading={isLoading}
          />
          <Box className="ApplicationEvaluation__eval__content">
            <ScrollArea
              momentum
              style={{ flex: 1, width: "100%", height: "100%" }}
            >
              <RightSideContent
                data={data}
                user={user}
                solver={solver}
                program={program}
                application={application}
                onInputChange={onInputChange}
                isEvaluator={isEvaluator}
                canEvaluate={canEvaluate}
              />
            </ScrollArea>
          </Box>

          <RightSideFooter
            data={data}
            isEvaluation={isEvaluation}
            isEvaluated={isEvaluated}
            canEvaluate={canEvaluate}
            isEvalNotStated={isEvalNotStated}
            handler={onSubmitEvaluation}
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
    const handle = Meteor.subscribe("program-application", {
      programId: progId,
      applicationId: applId,
    });
    // ...
    const isLoading = !handle.ready();
    // ...
    if (isLoading) {
      return {
        isLoading,
        user,
        userId,
        progId,
        applId,
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
      isLoading,
      user,
      userId,
      progId,
      applId,
      program,
      solver,
      owner,
      application,
    };
  })(ApplicationEvaluation)
);
