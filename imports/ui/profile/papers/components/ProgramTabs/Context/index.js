import "./style.scss";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import React from "react";
import ReactPlayer from "react-player";

import Typography from "../../../../../common/Typography";

const Context = ({ id, data }) => {
  // ...
  return (
    <Box id={id} className="Context">
      <Box className="Context__para">
        <Typography
          face="Book"
          size="1.8rem"
          color="#838FA7"
          align="justify"
          height="3.2rem"
        >
          {data.context}
        </Typography>
      </Box>
      {!!ReactPlayer.canPlay(data.contextVideo) && (
        <Box className="Context__context-vid">
          <Typography face="Bold" color="#051438" size="2rem">
            Context video
          </Typography>
          <Divider className="Context__divider" />
          <Box className="Context__context-vid__vid">
            <ReactPlayer url={data.contextVideo} width="100%" height="100%" />
            <Box className="Context__context-vid__play">control</Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Context;
