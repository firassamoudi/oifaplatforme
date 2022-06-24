import "./style.scss";

import Box from "@material-ui/core/Box";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import cx from "classnames";
import React from "react";

import Typography from "../../../common/Typography";

const ProgramChallengeCard = (props) => {
  return (
    <Box
      onClick={props.select}
      className={cx("ProgramChallengeCard", {
        "ProgramChallengeCard--checked": props.check,
      })}
    >
      <Box className="ProgramChallengeCard__head">
        <Box className="ProgramChallengeCard__title">
          <Box className="ProgramChallengeCard__img" />
          <Typography
            size="1.6rem"
            color="#9fa6bf"
            face="Medium"
            m="0 0 0 1.7rem"
          >
            Information technology
          </Typography>
        </Box>
        {props.check ? (
          <CheckCircleOutlineIcon
            style={{ color: "#F9BF58", fontSize: "2.5rem" }}
          />
        ) : null}
      </Box>
      <Box className="ProgramChallengeCard__body">
        <Typography size="1.4rem" color="#33343a" face="Medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        <Typography size="1.2rem" color="#9fa6bf" face="Book" height="1.58">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          consectetur arcu lacus, at rhoncus felis consequat quis. Donec
          vestibulum enim id lacinia accumsan. Suspendisse potenti. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Vestibulum blandit.
        </Typography>
      </Box>
    </Box>
  );
};

export default ProgramChallengeCard;
