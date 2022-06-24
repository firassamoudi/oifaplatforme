import "./style.scss";

import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import Slider from "@material-ui/core/Slider";
import React from "react";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 5,
    label: "5",
  },
];

const EntrySlider = ({ value = 0, onInputChange, readOnly }) => {
  const onChange = (e, value) => {
    if (readOnly) return;
    onInputChange(value);
  };
  const valuetext = (value) => {
    return value;
  };
  // ...
  return (
    <Box className="EntrySlider">
      <FormControl className="EntrySlider">
        <Slider
          component="div"
          value={value}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="on"
          marks={marks}
          onChange={onChange}
          min={0}
          max={5}
        />
      </FormControl>
    </Box>
  );
};

export default EntrySlider;
