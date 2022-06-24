import "./style.scss";

import Box from "@material-ui/core/Box";
import DoneIcon from "@material-ui/icons/Done";
import React from "react";

import Button from "../../../common/Button";
import Logo from "../../../common/Logo";
import NavLink from "../../../common/NavLink";
import Typography from "../../../common/Typography";

const ApplyProgramCongrats = () => {
  // ...
  return (
    <Box className="ApplyProgramCongrats">
      <Box className="CreateProgramLayout__sidebar__header">
        <Box className="__logo">
          <NavLink to="/dashboard/programs">
            <Logo />
          </NavLink>
        </Box>
      </Box>
      <Box className="AuthUpContainer__content ApplyProgramCongrats__content">
        <Box className="AuthUpContainer__box ApplyProgramCongrats__box __no-bg">
          <Box className="__icon">
            <DoneIcon style={{ color: "#243160", fontSize: "4.3rem" }} />
          </Box>
          <Typography
            face="Medium"
            color="#9CA3AF"
            size="1.8rem"
            height="2.6rem"
            style={{ textAlign: "center", margin: "0 0 4.4rem 0" }}
          >
            Congrats!! You just send submitted your application ...
          </Typography>
          <NavLink to="/dashboard/programs">
            <Button>Back to Dashboard</Button>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};

export default ApplyProgramCongrats;
