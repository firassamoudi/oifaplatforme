import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import React from "react";

import Typography from "../../../../../common/Typography";

const BoxInfo = (props) => {
  return (
    <Box className={cx("BoxInfo", props.className)}>
      {props.title && (
        <Box className="BoxInfo__title">
          <Typography
            size="1.7rem"
            color="#0A0937"
            face="Book"
            m="0 0 1.8rem 0"
          >
            {props.title}
          </Typography>
        </Box>
      )}

      {props.children}
    </Box>
  );
};

export default BoxInfo;
