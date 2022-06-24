import "./style.scss";

import Box from "@material-ui/core/Box";
import DoneIcon from "@material-ui/icons/Done";
import { Meteor } from "meteor/meteor";
import React from "react";

import Button from "../../../common/Button";
import Typography from "../../../common/Typography";

const EmailConfirmation = () => (
  <Box className="EmailConfirmation">
    <Box className="AuthUpContainer__content EmailConfirmation__content">
      <Box className="AuthUpContainer__box EmailConfirmation__box __no-bg">
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
          Verify your email to finish signing up for OIFA. We are looking
          forward to have you among us !
        </Typography>
        <a
          href={Meteor.settings.public.APP_URL}
          style={{ textDecoration: "none" }}
        >
          <Button>Back to OIFA</Button>
        </a>
      </Box>
    </Box>
  </Box>
);

export default EmailConfirmation;
