import { Box } from "@material-ui/core";
import React from "react";

import Typography from "../../../../../common/Typography";
import EvalNav from "../EvalNav";

const LeftSideHeader = ({ program, solver }) => {
  const name = solver?.getOrgName?.() ?? "";
  // ...
  return (
    <>
      <Box className="ApplicationEvaluationView__LeftSide__nav">
        <EvalNav program={program} />
      </Box>
      <Box className="ApplicationEvaluationView__LeftSide__title">
        <Typography size="3rem" color="#0A0937" face="Bold">
          {name}
        </Typography>
      </Box>
    </>
  );
};

export default LeftSideHeader;
