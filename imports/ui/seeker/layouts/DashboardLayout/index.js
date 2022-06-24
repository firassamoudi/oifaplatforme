import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import Logo from "../../../common/Logo";
import NavbarUser from "../../../common/NavbarUser";
import NavLink from "../../../common/NavLink";
import Typography from "../../../common/Typography";

const DashboardLayout = ({
  className,
  children,
  // ...
  sidebarLinks,
  currTab = 0,
  // ...
  userId,
}) => (
  // ...
  <Box className={cx("DashboardLayout", { [className]: !!className })}>
    <Box className="DashboardLayout__sidebar">
      <Box className="DashboardLayout__sidebar__header">
        <NavLink to="/dashboard/programs">
          <Logo />
        </NavLink>
      </Box>
      <Box className="DashboardLayout__sidebar__links">
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

    <Box className="DashboardLayout__main">
      <Box className="DashboardLayout__navbar">
        <Box className="DashboardLayout__navbar__inner">
          <Box className="__logo" />
          <NavbarUser />
        </Box>
      </Box>
      <Box className="DashboardLayout__content">{children}</Box>
    </Box>
  </Box>
);

const DashboardLayoutT = withTracker(() => {
  const userId = Meteor.userId();
  return { userId };
})(DashboardLayout);

export default DashboardLayoutT;
