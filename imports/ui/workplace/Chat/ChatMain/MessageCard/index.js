import "./style.scss";

import Box from "@material-ui/core/Box";
import GetAppIcon from "@material-ui/icons/GetApp";
import React from "react";

import SeekerCollection from "/imports/api/Seeker";
import SolverCollection from "/imports/api/Solver";
// ...
import Avatar from "/imports/ui/common/Avatar";
import File from "/imports/ui/common/File";
import Typography from "/imports/ui/common/Typography";

const MessageCard = ({ data }) => {
  const seeker = SeekerCollection.findOne({ _id: data?.ownerId });
  const solver = SolverCollection.findOne({ _id: data?.ownerId });
  const owner = seeker ?? solver;
  // ...
  // - Set name
  const organization = owner?.getOrgName?.() ?? "";
  const avatar = owner?.getAvatar?.() ?? "";
  const imgId = owner?.imgId;
  // ...
  return (
    <Box className="MessageCard">
      <Box
        className="MessageCard__head"
        display="flex"
        alignItems="center"
        mb="1rem"
      >
        <Box width="3.3rem" height="3.3rem">
          <Avatar small label={avatar} imgId={imgId} />
        </Box>
        <Typography
          size="1.6rem"
          color="#282d58"
          face="Medium"
          m="0 0 0 1.5rem"
        >
          {organization}
        </Typography>
        <Typography size="1.2rem" face="Medium" color="#b3b9ce" m="0 0 0 1rem">
          01:34 AM
        </Typography>
      </Box>
      <Box pl="4rem">
        <Typography size="1.49rem" face="Book" color="#717c99" height="1.61">
          {data.content}
        </Typography>
      </Box>

      {!!data?.files?.length && (
        <Box className="MessageCard__files">
          {data?.files?.map((fileId) => (
            <Box className="MessageCard__files__file" key={fileId}>
              <File fileId={fileId} />
              <Box className="MessageCard__files__file__icon">
                <GetAppIcon
                  style={{ width: "2rem", height: "2rem", color: "#B3B9CE" }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default MessageCard;
