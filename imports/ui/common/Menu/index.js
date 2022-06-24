import "./style.scss";

import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import Typography from "../Typography";

const Menu = ({
  selectOpen,
  setselectOpen,
  handleClickAway,
  options,
  children,
  style = {},
  userId,
  title,
}) => {
  const fOptions = options.filter((option) => {
    if (option.hasCond && !option.cond) return false;
    // ...
    if (!option.roles) return true;
    return Roles.userIsInRole(userId, option.roles);
  });
  // ...
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className="Menu">
        <Box
          className="Menu__trigger"
          onClick={() => setselectOpen(!selectOpen)}
        >
          {children || (
            <MoreHorizIcon
              style={{
                color: "#8993a8",
                fontSize: "2.9rem",
              }}
            />
          )}
        </Box>

        {selectOpen && (
          <Fade in={selectOpen}>
            <Paper className="Menu__menu" elevation={1} style={{ ...style }}>
              {title && (
                <div className="Menu__title">
                  <Typography
                    name="div"
                    color="#12152C"
                    size="1.645rem"
                    face="Medium"
                  >
                    {title}
                  </Typography>
                </div>
              )}
              {fOptions.map((option, index) => (
                <Box
                  key={index}
                  className="Menu__item"
                  onClick={() => {
                    if (option.handler) {
                      option.handler();
                    }
                    handleClickAway();
                  }}
                >
                  {option.icon}
                  <Typography
                    name="div"
                    face="Book"
                    height="1.4rem"
                    size="1.4rem"
                    color="#88929F"
                  >
                    {option.name}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Fade>
        )}
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
})(Menu);
