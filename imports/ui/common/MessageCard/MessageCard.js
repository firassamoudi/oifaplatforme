import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Avatar from "../Avatar";
import Typography from "../Typography";
import Files from "./Files/Files";
import Images from "./Images/Images";

const MessageCard = () => {
  return (
    <Box className="MessageCard">
      <Box className="MessageCard__head">
        <Box width="3.3rem" height="3.3rem">
          <Avatar small label="MA" />
        </Box>
        <Box className="MessageCard__head-inner">
          <Typography
            size="1.6rem"
            color="#282d58"
            face="Medium"
            m="0 0 0 .7rem"
          >
            Xperiencia
          </Typography>
          <Typography
            size="1.2rem"
            face="Medium"
            color="#b3b9ce"
            m="0 0 0 1rem"
          >
            01:34 AM
          </Typography>
        </Box>
      </Box>
      <Box className="MessageCard__content">
        <Box className="MessageCard__para">
          <Typography
            size="1.49rem"
            face="Book"
            color="#717c99"
            height="1.61"
            align="justify"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            purus neque, vestibulum attortor sit amet, pharetra euismod nunc.
            Praesent acconvallis nibh. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Maecenas purus neque, vestibulum attortor sit amet,
            pharetra euismod nunc. Praesent acconvallis nibh.
          </Typography>
        </Box>
        <Files />
        <Images />
      </Box>
    </Box>
  );
};

export default MessageCard;
