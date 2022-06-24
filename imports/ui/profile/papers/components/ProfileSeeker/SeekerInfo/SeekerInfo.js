import Box from "@material-ui/core/Box";
import React from "react";

import Typography from "../../../../../common/Typography";

const StartUpInfo = (props) => {
  return (
    <div className="SeekerProfile__info" style={{ padding: "3rem 0 0 0" }}>
      <div className="SeekerProfile__info__sub">
        <Box display="flex" justifyContent="space-between" mb="2.5rem">
          <Typography size="1.4rem" color="#9CA3AF" face="Book">
            Tax registration number
          </Typography>
          <Typography size="1.4rem" color="#434C5E" face="Medium">
            {props.tax}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography size="1.4rem" color="#9CA3AF" face="Book">
            Website
          </Typography>
          <Typography size="1.4rem" color="#434C5E" face="Medium">
            {props.websiteLink}
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default StartUpInfo;
