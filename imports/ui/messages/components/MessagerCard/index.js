import "./style.scss";

import Box from "@material-ui/core/Box";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import moment from "moment";
import React from "react";

import Avatar from "../../../common/Avatar";
import Typography from "../../../common/Typography";

const MessagerCard = ({ data, handler }) => {
  const lastMessage = data.lastMessage() || {};
  // ...
  const isUpdated = data.isUpdated();
  // - Set name
  const otherOrg = data.theOther();
  const organization = otherOrg.getOrgName();
  const avatar = otherOrg.getAvatar();
  const imgId = otherOrg?.imgId;
  // ...
  return (
    <Box className="MessagerCard" onClick={() => handler({ data })}>
      <Box className="MessagerCard__inner">
        <Box className="MessagerCard__receiver">
          <Avatar label={avatar} imgId={imgId} />
          <Box className="MessagerCard__receiver__details">
            <Typography
              className="MessagerCard__receiver__details__last"
              size="1.6rem"
              height="1.8rem"
              color="#282d58"
              face="Medium"
            >
              {organization}
            </Typography>
            <Typography
              className="MessagerCard__receiver__details__last"
              size="1.4rem"
              height="1.6rem"
              color="#717c99"
              face="Medium"
            >
              {lastMessage?.content}
              {!lastMessage?.content &&
                lastMessage?.files?.length &&
                "Shared files"}
              {!lastMessage?.content &&
                !lastMessage?.files?.length &&
                "Send your first message"}
            </Typography>
          </Box>
        </Box>

        <Box className="MessagerCard__info">
          <div title={moment(data?.updatedAt).format("DD MMMM YYYY, HH:mm:ss")}>
            <Typography
              size="12px"
              height="1.3rem"
              color="#b4b7c7"
              face="Medium"
              style={{ whiteSpace: "nowrap" }}
            >
              {moment(data?.updatedAt).format("ddd LT")}
            </Typography>
          </div>
          {isUpdated && (
            <FiberManualRecordIcon
              style={{
                color: "#f9bf58",
                fontSize: "11px",
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MessagerCard;
