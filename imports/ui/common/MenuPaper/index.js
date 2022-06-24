import "./style.scss";

import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import Typography from "../Typography";

const MenuPaper = ({
  selectOpen,
  setselectOpen,
  handleClickAway,
  children,
  style = {},
  userId,
}) => {
  // ...
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className="MenuPaper" style={{ ...style }}>
        {selectOpen && children}
      </Box>
    </ClickAwayListener>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  // ...
  return {
    user,
    userId,
  };
})(MenuPaper);
