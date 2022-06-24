import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import React from "react";
import ScrollArea from "react-scrollbars-custom";

import Button from "../../../common/Button";
import Logo from "../../../common/Logo";
import NavLink from "../../../common/NavLink";
import Typography from "../../../common/Typography";

const OnbordingLayout = ({
  stepIndex,
  onCreateProfile,
  createProfileValidate,
  children,
}) => {
  const lastStep = stepIndex === 1;
  const onNavigate = ({ to }) => {
    onCreateProfile({ to });
  };
  const onLogout = () => {
    Meteor.logout();
  };
  // ...
  return (
    <Box className="OnbordingLayout">
      <Box className="OnbordingLayout__navbar">
        <Box className="__logo">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </Box>

        <Box className="__dashboard">
          {!lastStep && (
            <Typography
              color="#03256C"
              face="Medium"
              size="1.6rem"
              height="2rem"
              style={{ cursor: "pointer" }}
              onClick={onLogout}
            >
              Logout
            </Typography>
          )}
          {lastStep && (
            <NavLink to="/dashboard">
              <Typography
                color="#03256C"
                face="Medium"
                size="1.6rem"
                height="2rem"
              >
                Go to dashboard
              </Typography>
            </NavLink>
          )}
        </Box>
      </Box>

      <Box className="OnbordingLayout__content">
        <Box className="OnbordingLayout__content__outer">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <Box className="OnbordingLayout__content__inner">
              <Box
                className={cx("OnbordingLayout__content__inner__inner", {
                  __guide: lastStep,
                })}
              >
                {children}
              </Box>
            </Box>
          </ScrollArea>
        </Box>
      </Box>

      {!lastStep && (
        <Box className="OnbordingLayout__footer">
          <Box className="OnbordingLayout__footer__inner">
            <Button
              disabled={!createProfileValidate}
              onClick={() => onNavigate({ to: "/dashboard/ombording/guide" })}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default OnbordingLayout;
