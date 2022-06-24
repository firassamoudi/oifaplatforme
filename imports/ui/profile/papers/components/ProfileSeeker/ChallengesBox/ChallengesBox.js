import "./style.scss";

import React from "react";

import Typography from "../../../../../common/Typography";

const ChallengesBox = (props) => {
  return (
    <div className="ChallengesBox">
      <Typography size="1.6rem" color="#021C30" face="Medium">
        Challenges
      </Typography>
      <div className="ChallengesBox__body">{props.children}</div>
    </div>
  );
};

export default ChallengesBox;
