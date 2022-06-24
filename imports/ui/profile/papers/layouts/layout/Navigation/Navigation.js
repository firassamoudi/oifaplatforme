import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";
import { useHistory } from "react-router-dom";

import Logo from "../../../../../common/Logo";
import NavbarUser from "../../../../../common/NavbarUser";
import NavLink from "../../../../../common/NavLink";

const Navigation = () => {
  // ...
  return (
    <Box component="nav" className="Navigation Navigation--w">
      <Box className="container container--std">
        <Box className="Navigation__inner">
          <NavLink to="/dashboard">
            <Logo />
          </NavLink>
          <Box className="Navigation__nav">
            <NavbarUser />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navigation;
