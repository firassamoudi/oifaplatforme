import "./style.scss";

import Box from "@material-ui/core/Box";
import GetAppIcon from "@material-ui/icons/GetApp";
import React from "react";

import Button from "../../../Button";
import Typography from "../../../Typography";

const File = () => {
  return (
    <>
      <Box className="File">
        <Box className="File__info-box">
          <Box className="File__img" />
          <Box className="File__info">
            <Typography face="Medium" size="1.2rem" color="#515173">
              BMC Template.pdf
            </Typography>
            <Typography fzce="Book" size="1.1rem" color="#AEB0C8">
              6 mb Pdf file
            </Typography>
          </Box>
        </Box>
        <Box>
          <GetAppIcon />
        </Box>
      </Box>
      <Box className="File__btn">
        <Button>
          <Typography face="Book" size="1.1rem" color="#F9BF58">
            Download
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default File;
