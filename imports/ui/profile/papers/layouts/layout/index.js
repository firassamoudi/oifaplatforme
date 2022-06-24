import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Navigation from "./Navigation/Navigation";

const ProgramOverviewLayout = ({ profile, children }) => {
  return (
    <Box className="ProgramOverviewLayout">
      <Navigation />
      {children}
    </Box>
  );
};

export default ProgramOverviewLayout;
