import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import Logo from "../../../common/Logo";
import NavbarUser from "../../../common/NavbarUser";
import NavLink from "../../../common/NavLink";
import Typography from "../../../common/Typography";

const DashboardEvaluatorLayout = ({
  className,
  children,
  // ...
  sidebarLinks,
  currTab = 0,
  // ...
  userId,
}) => (
  // ...
  <Box className={cx("DashboardEvaluatorLayout", { [className]: !!className })}>
    {/* <Box className="DashboardEvaluatorLayout__sidebar">
      <Box className="DashboardEvaluatorLayout__sidebar__header">
        <NavLink to="/dashboard/programs">
          <Logo w />
        </NavLink>
      </Box>
      <Box className="DashboardEvaluatorLayout__sidebar__links">
        {sidebarLinks.map((link, index) => {
          const hasRole = Roles.userIsInRole(userId, link.roles);
          if (!hasRole) return null;
          // ...
          return (
            <NavLink key={index} to={link.url}>
              <Typography
                className={cx("__link", { __active: currTab === index })}
                color="#fff"
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
    </Box> */}

    <Box className="DashboardEvaluatorLayout__main">
      <Box className="DashboardEvaluatorLayout__navbar">
        <Box className="DashboardEvaluatorLayout__navbar__inner">
          <Box className="__logo">
            <NavLink to="/dashboard/programs">
              <Logo />
            </NavLink>
          </Box>
          <NavbarUser noMsg />
        </Box>
      </Box>
      <Box className="DashboardEvaluatorLayout__content">{children}</Box>
    </Box>
  </Box>
);

export default withTracker(() => {
  const userId = Meteor.userId();
  return { userId };
})(DashboardEvaluatorLayout);
