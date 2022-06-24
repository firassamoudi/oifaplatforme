import "./style.scss";

import { Divider } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import cx from "classnames";
import React from "react";

import Typography from "../../../../../common/Typography";
import ChallengeCard from "./ChallengeCard";

const Challenges = ({ isCFA, id, data }) => {
  if (!data.challenges) {
    return <Box id={id} className={cx("Challenges")} />;
  }
  return (
    <Box id={id} className={cx("Challenges", { __isCFA: isCFA })}>
      <Typography face="Bold" color="#051438" size="2rem">
        Challenges
      </Typography>
      <Divider className="Challenges__divider" />

      <Box className="ChallengesList">
        {(data.challenges || [])
          .filter((chl) => chl.selected)
          .map((challenge, index) => (
            <ChallengeCard key={index} {...challenge} />
          ))}
      </Box>
    </Box>
  );
};

export default Challenges;
