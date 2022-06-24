import "../style.scss";
import "./style.scss";

import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import cx from "classnames";
import React from "react";

const EntrySwitch = ({ className, name, value, onInputChange }) => {
  const handleDateChange = (e) => {
    const checked = e.target.checked;
    onInputChange({ [name]: checked });
  };
  // ...
  return (
    <Box className={cx("Entry EntrySwitch", { [className]: !!className })}>
      <Switch name={name} checked={value} onChange={handleDateChange} />
    </Box>
  );
};

export default EntrySwitch;
