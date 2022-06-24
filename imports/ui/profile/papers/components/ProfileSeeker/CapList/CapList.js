import Chip from "@material-ui/core/Chip";
import React from "react";

import Typography from "../../../../../common/Typography";

const CapList = (props) => {
  return (
    <>
      <Typography size="1.6rem" color="#021C30" face="Medium" m="0 0 1.5rem 0">
        {props.title}
      </Typography>

      {props.capabilities.map((cap, index) => {
        return (
          <Chip
            className={`cap-chip cap-chip--${cap.value}`}
            key={index}
            label={cap.label}
          />
        );
      })}
    </>
  );
};

export default CapList;
