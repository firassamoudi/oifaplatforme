import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import Logo from "../../common/Logo";
import NavbarUser from "../../common/NavbarUser";
import NavLink from "../../common/NavLink";

const MessagesLayout = ({ className, children }) => (
  // ...
  <Box className={cx("MessagesLayout", { [className]: !!className })}>
    <Box className="MessagesLayout__inner">
      <Box className="MessagesLayout__navbar">
        <Box className="MessagesLayout__navbar__inner">
          <Box className="__logo">
            <NavLink to="/dashboard/programs">
              <Logo />
            </NavLink>
          </Box>
          <NavbarUser />
        </Box>
      </Box>
      <Box className="MessagesLayout__content">{children}</Box>
    </Box>
  </Box>
);

const MessagesLayoutT = withTracker(() => {
  const userId = Meteor.userId();
  return { userId };
})(MessagesLayout);

export default MessagesLayoutT;
