/* eslint-disable simple-import-sort/sort */
import "./style.scss";
import EmptyView from "/imports/ui/common/EmptyView";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import ApplicationCollection from "/imports/api/Application";
import SolverCollection from "/imports/api/Solver";
import TeamsCollection from "/imports/api/Team";
import WorkplaceCollection from "/imports/api/Workplace";

import DashboardLayout from "./Layout";
import WorkplaceTabs from "./components/Tabs";
import WorkplaceHeader from "./components/Header";
import WorkplaceEmpty from "./components/Empty";

import Board from "./Board";
import Drop from "./Drop";
import Chat from "./Chat";

const Workplace = ({
  isLoading,
  // ...
  hasRole,
  isSolver,
  isSolverDropped,
  // ...
  data,
  teamId,
  solvers,
  teams,
}) => {
  const history = useHistory();
  const [currTab, setCurrTab] = useState(0);
  // ...
  const onPublishWorkplace = () => {
    Meteor.call("workplace.publish", { workplaceId: data._id });
  };
  // ...
  useEffect(() => {
    if (isSolver && isSolverDropped) {
      history.push("/dashboard");
    }
  }, [isSolverDropped]);
  // ...
  if (isLoading) return null;
  if (isSolver && isSolverDropped) return <div />;
  // ...
  return (
    <DashboardLayout>
      <Box className="Workplace">
        <WorkplaceTabs
          currTab={currTab}
          handler={setCurrTab}
          hasRole={hasRole}
        />
        <Box component="main" className="Workplace__main">
          <WorkplaceHeader
            data={data}
            hasRole={hasRole}
            handler={onPublishWorkplace}
          />
          {hasRole && !teams.length && currTab !== 2 && (
            <WorkplaceEmpty empty />
          )}
          {!hasRole && !teams.length && (
            <WorkplaceEmpty>
              <EmptyView label="" />
            </WorkplaceEmpty>
          )}
          {currTab === 0 && (
            <Board
              hasRole={hasRole}
              teamId={teamId}
              data={data}
              solvers={solvers}
              teams={teams}
            />
          )}
          {currTab === 1 && (
            <Chat
              hasRole={hasRole}
              teamId={teamId}
              data={data}
              solvers={solvers}
              teams={teams}
            />
          )}
          {currTab === 2 && <Drop solvers={solvers} />}
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default withTracker(() => {
  const userId = Meteor.userId();
  // ...
  const hasRole = Roles.userIsInRole(userId, [
    "SEEKER_OWNER",
    "SEEKER_CREATOR",
  ]);
  const isSolver = Roles.userIsInRole(userId, ["SOLVER_OWNER"]);
  let isSolverDropped = false;
  // ...
  const params = useParams();
  const workplaceId = params.workplaceId;
  const teamId = params.teamId;
  const handle = Meteor.subscribe("workplace", { workplaceId });
  // ...
  const isLoading = !handle.ready();
  // ...
  if (isLoading) {
    return {
      isLoading,
      // ...
      hasRole,
      isSolver,
      isSolverDropped,
      // ...
      data: {},
      solvers: [],
      teams: [],
      teamId,
    };
  }
  const data = WorkplaceCollection.findOne({ _id: workplaceId });
  const solvers = SolverCollection.find({}).fetch();
  const teams = TeamsCollection.find({ workplaceId }).fetch();
  // ...
  if (isSolver) {
    const currSolver = SolverCollection.findOne({ ownerId: userId });
    const hisApp = ApplicationCollection.findOne({ solverId: currSolver?._id });
    const isDropped = hisApp.dropped;
    // ...
    isSolverDropped = isDropped;
  }

  // ...
  return {
    isLoading,
    // ...
    hasRole,
    isSolver,
    isSolverDropped,
    // ...
    data,
    solvers,
    teams,
    teamId,
  };
})(Workplace);
