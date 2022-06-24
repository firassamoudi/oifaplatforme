import "./style.scss";

import Box from "@material-ui/core/Box";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React, { useState } from "react";

import Avatar from "../../../common/Avatar";
import Typography from "../../../common/Typography";
import EvaluationInfo from "../EvaluationInfo";

const EvaluationCard = () => {
  const [info, setInfo] = useState(null);
  const showInfo = () => {
    setInfo((state) => !state);
  };
  // ...
  // ...
  return (
    <>
      <Box className="EvaluationCard">
        <Box
          className="EvaluationCard__evaluator"
          display="flex"
          alignItems="center"
        >
          <Avatar
            label="SA"
            size="1.4rem"
            color="#e55934"
            bg="rgba(229, 89, 52, 0.1)"
          />
          <Typography
            size="1.4rem"
            color="#23252C"
            face="Medium"
            m="0 0 0 1.6rem"
          >
            Sallie Allison
          </Typography>
        </Box>
        <Box
          className="EvaluationCard__note"
          display="flex"
          alignItems="center"
        >
          <Typography
            size="1.4rem"
            color="#23252C"
            face="Medium"
            align="center"
            style={{
              width: "100%",
            }}
          >
            15
          </Typography>
        </Box>
        <Box
          className="EvaluationCard__time"
          display="flex"
          alignItems="center"
        >
          <Typography
            size="1.4rem"
            color="#23252C"
            face="Medium"
            align="center"
            style={{
              width: "100%",
            }}
          >
            1 hour 38 minutes
          </Typography>
        </Box>
        <Box
          className="EvaluationCard__criteria"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={showInfo}
        >
          <VisibilityIcon />
        </Box>
      </Box>
      {info && <EvaluationInfo />}
    </>
  );
};

export default EvaluationCard;
