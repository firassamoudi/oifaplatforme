import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Svg from "../../../../../../common/Svg";
import Typography from "../../../../../../common/Typography";

const IncentiveCard = ({ title, desc, icon }) => {
  return (
    <Box className="IncentiveCard">
      <Box className="IncentiveCard__img">
        <Svg src={icon} style={{ width: "6.1rem", height: "6.1rem" }} />
      </Box>
      <Box className="IncentiveCard__info">
        <Box>
          <Typography
            face="Medium"
            color="#051438"
            size="1.6rem"
            m="0 0 1rem 0"
          >
            {title}
          </Typography>
          <Typography face="Book" color="#838FA7" size="1.4rem" height="2.4rem">
            {desc}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default IncentiveCard;
