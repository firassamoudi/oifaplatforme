import { Box } from "@material-ui/core";
import React from "react";

import Button from "../../../../../common/Button";
import Typography from "../../../../../common/Typography";

const RightSideFooter = ({
  data,
  // ...
  isEvaluated,
  isEvalNotStated,
  isEvaluation,
  canEvaluate,
  handler,
}) => {
  const canSubmit = !!data.dateStart && !!data.dateEnd && !!data.feedback;
  // ...
  return (
    <Box className="ApplicationEvaluation__eval__footer">
      <Typography
        size="1.4rem"
        color="#8993A8"
        height="18px"
        face="Book"
        style={{ width: "60%" }}
      >
        {isEvalNotStated && "Evaluation phase has not started yet"}
        {isEvaluation &&
          !isEvaluated &&
          "You need to finish all your evaluation in order to submit it"}
        {isEvaluation &&
          isEvaluated &&
          "Your evalution has been submitted successfully"}
      </Typography>
      <Button big disabled={!canEvaluate || !canSubmit} onClick={handler}>
        {isEvaluation && isEvaluated && "Submitted"}
        {((isEvaluation && !isEvaluated) || isEvalNotStated) && "Submit"}
      </Button>
    </Box>
  );
};

export default RightSideFooter;
