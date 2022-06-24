import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Logo from "../../common/Logo";
import NavbarUser from "../../common/NavbarUser";
import NavLink from "../../common/NavLink";

const DashboardLayout = ({ children }) => {
  return (
    <Box className="WorkPlaceLayout">
      <Box className="WorkPlaceLayout__main">
        <Box className="DashboardLayout__navbar">
          <Box className="DashboardLayout__navbar__inner">
            <Box className="__logo">
              <NavLink to="/dashboard">
                <Logo />
              </NavLink>
            </Box>
            <NavbarUser />
          </Box>
        </Box>
        <Box className="WorkPlaceLayout__content">{children}</Box>
      </Box>
    </Box>
  );
};
export default DashboardLayout;
