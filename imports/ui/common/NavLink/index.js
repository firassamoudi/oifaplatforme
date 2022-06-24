import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import React from "react";
import { useHistory } from "react-router-dom";

const NavLink = ({ className, to = "/", children, style }) => {
  const history = useHistory();
  const onNavigate = () => {
    history.push(to);
  };
  // ...
  return (
    <Box
      component="a"
      className={cx("NavLink", { [className]: className })}
      style={{ ...style }}
      onClick={onNavigate}
    >
      {children}
    </Box>
  );
};

export default NavLink;
