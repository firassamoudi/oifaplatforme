import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import File from "./File/File";

const Files = () => {
  return (
    <Box component="ul" className="MessageCard__files-list">
      {[1, 1].map((_, index) => (
        <Box component="li" className="MessageCard__files-item" key={index}>
          <File />
        </Box>
      ))}
    </Box>
  );
};

export default Files;
