import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import Logo from "../../../common/Logo";
import NavbarUser from "../../../common/NavbarUser";
import NavLink from "../../../common/NavLink";
import Typography from "../../../common/Typography";

const AdminDashboardLayout = ({
  className,
  children,
  // ...
  sidebarLinks,
  currTab = 0,
  // ...
  userId,
}) => (
  // ...
  <Box className={cx("AdminDashboardLayout", { [className]: !!className })}>
    <Box className="AdminDashboardLayout__sidebar">
      <Box className="AdminDashboardLayout__sidebar__header">
        <NavLink to="/dashboard/stats">
          <Logo />
        </NavLink>
      </Box>
      <Box className="AdminDashboardLayout__sidebar__links">
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

    <Box className="AdminDashboardLayout__main">
      <Box className="AdminDashboardLayout__navbar">
        <Box className="AdminDashboardLayout__navbar__inner">
          <Box className="__logo" />
          <NavbarUser />
        </Box>
      </Box>
      <Box className="AdminDashboardLayout__content">{children}</Box>
    </Box>
  </Box>
);

const AdminDashboardLayoutT = withTracker(() => {
  const userId = Meteor.userId();
  return { userId };
})(AdminDashboardLayout);

export default AdminDashboardLayoutT;
