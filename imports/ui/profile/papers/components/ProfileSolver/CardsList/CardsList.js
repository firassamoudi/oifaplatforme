import { Box } from "@material-ui/core";
import React from "react";

import Typography from "../../../../../common/Typography";
import TeamCard from "./TeamCard/TeamCard";

const CardsList = (props) => {
  return (
    !!props.team.length && (
      <Box component="section">
        <Typography
          size="1.6rem"
          color="#021C30"
          face="Medium"
          m="0 0 1.5rem 0"
        >
          {props.title}
        </Typography>
        <div className="TeamList">
          {props.team.map((member, index) => {
            return (
              <TeamCard
                key={index}
                connected={props.connected}
                name={`${member.firstName} ${member.lastName}`}
                pos={member.position}
                linked={member.linkedinLink}
              />
            );
          })}
        </div>
      </Box>
    )
  );
};

export default CardsList;
