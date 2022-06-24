import Tooltip from "@material-ui/core/Tooltip";
import React from "react";

const index = ({ title, children }) => {
  if (!title) return children;
  return <Tooltip title={title}>{children}</Tooltip>;
};

export default index;
