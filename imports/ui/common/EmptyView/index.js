import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import SVG from "../Svg";
import Typography from "../Typography";

const EmptyView = ({ search, label, handler }) => {
  return (
    <Box className="EmptyView" onClick={handler}>
      <Box style={{ color: "#03256c", fontSize: "5rem" }}>
        {search && <SVG src="/empty/search.svg" />}
        {!search && <SVG src="/empty/list.svg" />}
      </Box>
      <Typography
        size="2rem"
        color="#03256c"
        face="Bold"
        style={{ margin: "2rem 0 0 0" }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default EmptyView;
