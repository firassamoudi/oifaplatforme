import "./style.scss";

import Box from "@material-ui/core/Box";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import React from "react";

import Avatar from "../Avatar";
import Typography from "../Typography";

const MessagerCard = (props) => {
  return (
    <Box className="MessagerCard">
      <Box className="MessagerCard__inner">
        <Box className="MessagerCard__avatarBox">
          <Avatar
            label={props.name}
            size="1.4rem"
            color="#e55934"
            bg="rgba(229, 89, 52, 0.1)"
          />
        </Box>

        <Box ml="1.9rem">
          <Box display="flex" justifyContent="space-between">
            <Typography size="1.6rem" color="#282d58" face="Medium">
              {props.title}
            </Typography>
            <Typography size="1.4rem" color="#b4b7c7" face="Medium">
              1h ago
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Typography
              className="MessagerCard__para"
              size="1.4rem"
              color="#717c99"
              face="Medium"
            >
              {props.para}
            </Typography>
            <FiberManualRecordIcon
              style={{
                color: "#f9bf58",
                fontSize: "11px",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MessagerCard;
