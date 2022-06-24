import "./style.scss";

import Box from "@material-ui/core/Box";
import DoneIcon from "@material-ui/icons/Done";
import React from "react";

import Button from "../../../../common/Button";
import NavLink from "../../../../common/NavLink";
import Typography from "../../../../common/Typography";

const ProgramCongrats = ({ isCFA }) => {
  const type = isCFA ? "CFA" : "program";
  // ...
  return (
    <Box className="ProgramCongrats">
      <Box className="AuthUpContainer__content ProgramCongrats__content">
        <Box className="AuthUpContainer__box ProgramCongrats__box __no-bg">
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
            Congratulations! You have successfully submitted your program on
            OIFA! Our team is reviewing it right now and will notify you within
            the next 24 hours. In the meantime, take a moment to search for our
            super innovation talents and get the chance to connect with them.
          </Typography>
          <NavLink
            to={
              isCFA ? "/dashboard/call-for-applications" : "/dashboard/programs"
            }
          >
            <Button>Back to Dashboard</Button>
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
};

export default ProgramCongrats;
