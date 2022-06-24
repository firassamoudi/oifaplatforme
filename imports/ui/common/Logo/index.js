import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Svg from "../Svg";

const Logo = ({ w }) => (
  <Box className="Logo">
    {w ? <Svg src="/oifa_icon_white.svg" /> : <Svg src="/oifa_icon.svg" />}
  </Box>
);

export default Logo;
