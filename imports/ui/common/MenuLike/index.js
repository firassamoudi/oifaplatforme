import "./style.scss";

import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React from "react";
import ScrollArea from "react-scrollbars-custom";

import Typography from "../Typography";

const MenuLike = ({
  selectOpen,
  setselectOpen,
  handleClickAway,
  options,
  children,
  style = {},
  title,
}) => {
  // ...
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className="MenuLike">
        <Box
          className="MenuLike__trigger"
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
            <Paper
              className="MenuLike__Menu"
              elevation={1}
              style={{ ...style }}
            >
              {title && (
                <div className="MenuLike__title">
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

              <ScrollArea
                momentum
                style={{ flex: 1, width: "100%", height: "100%" }}
              >
                <Box>
                  {options.map((option, index) => (
                    <Box
                      key={index}
                      className="MenuLike__item"
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
                </Box>
              </ScrollArea>
            </Paper>
          </Fade>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default MenuLike;
