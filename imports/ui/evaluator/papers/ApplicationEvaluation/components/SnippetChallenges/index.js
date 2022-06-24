import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Typography from "../../../../../common/Typography";

const SnippetChallenges = ({ title, list }) => {
  return (
    <Box className="SnippetChallenges">
      <Typography
        size="1.7rem"
        color="#0A0937"
        height="22px"
        face="Medium"
        m="0 0 1rem 0"
      >
        {title}
      </Typography>
      <Box display="flex" alignItems="center">
        <Box className="SnippetChallenges__para">
          {list.map((challenge, ind) => (
            <Typography
              key={ind}
              size="1.4rem"
              color="#8993A8"
              height="23px"
              face="Book"
            >
              {challenge.title || "N/A"}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SnippetChallenges;
