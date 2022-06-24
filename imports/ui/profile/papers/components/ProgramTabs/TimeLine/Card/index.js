import "./style.scss";

import Box from "@material-ui/core/Box";
import moment from "moment";
import React from "react";

import Typography from "../../../../../../common/Typography";

const TimeLineCard = ({ label, start }) => {
  return (
    <Box className="TimeLineCard">
      <Box className="TimeLineCard__date">
        <Typography face="Medium" color="#03256C" size="2.78rem">
          {start ? moment(start).format("DD") : ""}
        </Typography>
        <Typography face="Medium" color="#03256C" size="1.33rem">
          {start ? moment(start).format("MMMM") : ""}
        </Typography>
      </Box>
      <Box className="TimeLineCard__info">
        <Box>
          <Typography face="Medium" color="#051438" size="1.8rem">
            {label}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TimeLineCard;
