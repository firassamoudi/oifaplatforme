import "./style.scss";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import React from "react";

import Typography from "../../../../../common/Typography";

const CopyRight = ({ id, data }) => {
  if (!data.copyright) {
    return <Box id={id} className="CopyRight" />;
  }
  return (
    <Box id={id} className="CopyRight">
      <Typography face="Bold" color="#051438" size="2rem">
        Copyright
      </Typography>
      <Divider className="Incentive__divider" />
      <Typography
        face="Book"
        size="1.6rem"
        color="#838FA7"
        align="justify"
        height="2.8rem"
      >
        {data?.copyright}
      </Typography>
    </Box>
  );
};

export default CopyRight;
