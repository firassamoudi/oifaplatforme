import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Svg from "../../../common/Svg";
import Typography from "../../../common/Typography";

const AuthComposition = () => (
  <Box className="AuthComposition">
    <Box className="AuthComposition__preview">
      <Box component="img" src="/auth/signin.jpg" alt="" />
    </Box>
    <Box className="AuthComposition__content">
      <Typography
        className="AuthComposition__title"
        face="Book"
        color="#fff"
        size="1.6rem"
        height="1.11"
        m="0 0 2.4rem 0"
      >
        {/* “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        eget urna nulla. Morbi a finibus augue, non molestie velit. Phasellus
        commodo ipsum eget nulla sodales tempor.Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Vestibulum eget urna nulla. Morbi a finibus
        augue, non molestie velit. Phasellus commodo ipsum eget nulla sodales
        tempor.” */}
      </Typography>
      {/* <Box className="AuthComposition__t">
        <Box className="AuthComposition__t__img" src={null} alt="">
          <Box component="img" src="/auth/t.png" alt="" />
        </Box>
        <Box className="AuthComposition__t__content">
          <Typography
            className="AuthComposition__title"
            face="Medium"
            color="#F9BF58"
            size="12px"
            height="12px"
            style={{ textTransform: "uppercase", margin: "0 0 0.6rem 0" }}
          >
            Janie Allison
          </Typography>
          <Typography
            className="AuthComposition__title"
            face="Medium"
            color="#fff"
            size="12px"
            height="12px"
            style={{ textTransform: "uppercase", margin: "0 0 1.1rem 0" }}
          >
            Manager, COO
          </Typography>
          <Svg src="/auth/mercy_corps.svg" />
        </Box>
      </Box> */}
    </Box>
  </Box>
);

export default AuthComposition;
