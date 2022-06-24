import "./style.scss";

import MuiButton from "@material-ui/core/Button";
import cx from "classnames";
import React from "react";

import LoadingDots from "/imports/ui/common/LoadingDots";

const Button = ({
  className,
  small,
  trans,
  ghost,
  type,
  startIcon,
  endIcon,
  onClick,
  disabled,
  style = {},
  disableRipple,
  children,
  isLoading,
}) => (
  <MuiButton
    className={cx(
      "Button",
      { [className]: className },
      { "Button--small": small },
      { "Button--trans": trans },
      { "Button--ghost": ghost }
    )}
    type={type}
    startIcon={startIcon}
    endIcon={endIcon}
    onClick={isLoading ? null : onClick}
    disableRipple={trans || disableRipple}
    disabled={disabled}
    style={{ ...style }}
  >
    <span
      className="Button__inner"
      style={{ visibility: isLoading ? "hidden" : "visible" }}
    >
      {children}
    </span>
    {isLoading && <LoadingDots />}
  </MuiButton>
);

export default Button;
