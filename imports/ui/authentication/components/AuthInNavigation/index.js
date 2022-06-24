import "./style.scss";

import Box from "@material-ui/core/Box";
import { Meteor } from "meteor/meteor";
import React from "react";

import Logo from "../../../common/Logo";
import NavLink from "../../../common/NavLink";
import Typography from "../../../common/Typography";

const AuthInNavigation = ({ signup }) => {
  const label = signup ? "Not a member?" : "Already a member?";
  // ...
  return (
    <Box className="AuthInNavigation">
      <Box className="AuthInNavigation__logo">
        <NavLink to="/">
          <Logo w />
        </NavLink>
      </Box>

      <Typography
        className="AuthInNavigation__link"
        face="Medium"
        color="#80858f"
        size="1.4rem"
        height="2rem"
      >
        <Box component="span">{label}</Box>
        {signup && (
          <a
            href={`${Meteor.settings.public.APP_URL}/sign-up`}
            style={{ color: "#03256c", margin: "0 0 0 0.7rem" }}
          >
            Register now
          </a>
        )}
        {!signup && (
          <NavLink
            to="/auth/login"
            style={{ color: "#03256c", margin: "0 0 0 0.7rem" }}
          >
            Login now
          </NavLink>
        )}
      </Typography>
    </Box>
  );
};

export default AuthInNavigation;
