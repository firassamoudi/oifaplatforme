import "./style.scss";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import React from "react";

import EmptyView from "../../../../../common/EmptyView";
import Typography from "../../../../../common/Typography";
import TimeLineCard from "./Card";

const TimeLine = ({ id, data }) => {
  if (!data.timeline) {
    return <Box id={id} className="TimeLine" />;
  }
  // ...
  return (
    <Box id={id} className="TimeLine">
      <Typography face="Bold" color="#051438" size="2rem">
        Program Timeline
      </Typography>
      <Divider className="TimeLine__divider" />

      <Box className="TimeLineList">
        {data?.timeline?.map((item, index) => (
          <TimeLineCard key={index} {...item} />
        ))}
      </Box>
    </Box>
  );
};

export default TimeLine;
