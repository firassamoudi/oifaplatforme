import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import { EntrySlider } from "../../../../../common/Entry";
import Typography from "../../../../../common/Typography";

const EvaluationSlider = ({ index, data, onSliderChange, readOnly }) => {
  const onSliderChangeHandler = (value) => {
    onSliderChange(index, value);
  };
  // ...
  return (
    <Box className="EvaluationSlider">
      <Typography
        size="1.6rem"
        color="#0A0937"
        face="Medium"
        height="22px"
        style={{ margin: "0 0 2rem 0" }}
      >
        {data.label}
      </Typography>

      <EntrySlider
        value={data.value}
        onInputChange={onSliderChangeHandler}
        readOnly={readOnly}
      />
    </Box>
  );
};

export default EvaluationSlider;
