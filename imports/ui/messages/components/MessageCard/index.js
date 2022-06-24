import "./style.scss";

import Box from "@material-ui/core/Box";
import GetAppIcon from "@material-ui/icons/GetApp";
import moment from "moment";
import React from "react";

import Avatar from "../../../common/Avatar";
import File from "../../../common/File";
import Typography from "../../../common/Typography";

const MessageCard = ({ data }) => {
  const orgOwner = data.orgOwner();
  // - Set name
  const organization = orgOwner?.getOrgName?.() ?? "";
  const avatar = orgOwner?.getAvatar?.() ?? "";
  const imgId = orgOwner?.imgId;
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
        <div title={moment(data?.createdAt).format("DD MMMM YYYY, HH:mm:ss")}>
          <Typography
            size="1.2rem"
            face="Medium"
            color="#b3b9ce"
            height="2rem"
            m="0 0 0 1rem"
          >
            {moment(data?.createdAt).format("ddd LT")}
          </Typography>
        </div>
      </Box>
      <Box>
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
