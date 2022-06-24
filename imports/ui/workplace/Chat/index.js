import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import EmptyView from "/imports/ui/common/EmptyView";

import WorkplaceEmpty from "../components/Empty";
import WorkplaceMain from "../components/Main";
import WorkplaceTeams from "../components/Teams";
import ChatMain from "./ChatMain/ChatMain";

const Chat = ({ hasRole, teamId, data, solvers, teams }) => {
  return (
    <Box className="WorkplaceBoard">
      <WorkplaceTeams
        hasRole={hasRole}
        key="WorkplaceTeams"
        teamId={teamId}
        data={data}
        solvers={solvers}
        teams={teams}
      />

      <WorkplaceMain>
        {!!teamId && (
          <ChatMain teamId={teamId} teams={teams} workplaceId={data._id} />
        )}
        {!teamId && (
          <WorkplaceEmpty>
            <EmptyView label="Select a team" />
          </WorkplaceEmpty>
        )}
      </WorkplaceMain>
    </Box>
  );
};

export default Chat;
