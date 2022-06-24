import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Typography from "../../../../../common/Typography";

const Snippet = ({ title, icon, para }) => {
  return (
    <Box className="Snippet">
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
        {icon && <Box className="Snippet__icon">{icon && "icon"}</Box>}
        <Box className="Snippet__para">
          <Typography size="1.4rem" color="#8993A8" height="23px" face="Book">
            {para || "N/A"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Snippet;
