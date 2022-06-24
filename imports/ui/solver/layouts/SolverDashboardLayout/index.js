import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import Logo from "../../../common/Logo";
import NavbarUser from "../../../common/NavbarUser";
import NavLink from "../../../common/NavLink";
import Typography from "../../../common/Typography";

const SolverDashboardLayout = ({
  className,
  children,
  // ...
  sidebarLinks,
  currTab = 0,
  // ...
  userId,
}) => (
  // ...
  <Box className={cx("SolverDashboardLayout", { [className]: !!className })}>
    <Box className="SolverDashboardLayout__sidebar">
      <Box className="SolverDashboardLayout__sidebar__header">
        <NavLink to="/dashboard/programs">
          <Logo />
        </NavLink>
      </Box>
      <Box className="SolverDashboardLayout__sidebar__links">
        {sidebarLinks.map((link, index) => {
          const hasRole = Roles.userIsInRole(userId, link.roles);
          if (!hasRole) return null;
          // ...
          return (
            <NavLink key={index} to={link.url}>
              <Typography
                className={cx("__link", { __active: currTab === index })}
                face="Book"
                size="1.6rem"
                height="2rem"
              >
                {link.label}
              </Typography>
            </NavLink>
          );
        })}
      </Box>
    </Box>

    <Box className="SolverDashboardLayout__main">
      <Box className="SolverDashboardLayout__navbar">
        <Box className="SolverDashboardLayout__navbar__inner">
          <Box className="__logo" />
          <NavbarUser />
        </Box>
      </Box>
      <Box className="SolverDashboardLayout__content">{children}</Box>
    </Box>
  </Box>
);

const SolverDashboardLayoutT = withTracker(() => {
  const userId = Meteor.userId();
  return { userId };
})(SolverDashboardLayout);

export default SolverDashboardLayoutT;
