import "./style.scss";

import Box from "@material-ui/core/Box";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import React from "react";

import NavLink from "../../../../../common/NavLink";
import Typography from "../../../../../common/Typography";

const EvalNav = ({ program }) => {
  return (
    <Box component="nav" className="EvalNav">
      <NavLink
        className="EvalNav__back"
        to={`/dashboard/programs/${program._id}/applications`}
      >
        <ArrowBackIosIcon
          style={{
            color: "#8993A8",
            fontSize: "2.4rem",
          }}
        />
        <Typography
          size="1.8rem"
          color="#8993A8"
          face="Medium"
          m="0 0 0 1.2rem"
        >
          Back to Applications
        </Typography>
      </NavLink>
      <Box className="EvalNav__view">
        <a
          href={`/dashboard/i/program-overview/${program._id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", textDecoration: "none" }}
        >
          <Typography size="1.8rem" color="#F9BF58" face="Medium">
            View program
          </Typography>
        </a>
      </Box>
    </Box>
  );
};

export default EvalNav;
