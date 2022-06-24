import "./style.scss";

import Box from "@material-ui/core/Box";
import TableChartIcon from "@material-ui/icons/TableChart";
import React from "react";

import Typography from "../../../common/Typography";

const WorkplaceMain = ({ children }) => {
  // ...
  return (
    <Box className="WorkplaceMain">
      <Box className="WorkplaceMain__header">
        <TableChartIcon
          style={{
            fontSize: "4rem",
            color: "#03256C",
            marginRight: "1.6rem",
          }}
        />
        <Typography size="1.8rem" color="#021C30" face="Medium">
          Product Workplace
        </Typography>
      </Box>

      <Box className="WorkplaceMain__inner">{children}</Box>
    </Box>
  );
};

export default WorkplaceMain;
