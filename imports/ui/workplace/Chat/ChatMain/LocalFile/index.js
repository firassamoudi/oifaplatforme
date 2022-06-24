import "./style.scss";

import Box from "@material-ui/core/Box";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import cx from "classnames";
import React from "react";

const LocalFile = ({ data, onDelete }) => {
  // ...
  return (
    <Box className="LocalFile">
      <Box className="LocalFile__name" title={data.name}>
        {data.name}
      </Box>
      <Box className="LocalFile__delete" onClick={onDelete}>
        <HighlightOffIcon
          style={{
            width: "2rem",
            height: "2rem",
            fontSize: "2rem",
            color: "#03256c",
          }}
        />
      </Box>
    </Box>
  );
};

export default LocalFile;
