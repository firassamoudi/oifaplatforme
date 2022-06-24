import "../style.scss";
import "./style.scss";

import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import cx from "classnames";
import React from "react";

const EntryCheckBox = ({
  className,
  name,
  label,
  value = false,
  onInputChange,
}) => {
  const handleDateChange = (e) => {
    const { checked } = e.target;
    onInputChange({ [name]: checked });
  };
  // ...
  return (
    <Box className={cx("Entry EntryCheckBox", { [className]: !!className })}>
      <FormControlLabel
        label={label}
        disableRipple
        control={
          <Checkbox
            name={name}
            checked={value}
            onChange={handleDateChange}
            disableRipple
          />
        }
      />
    </Box>
  );
};

export default EntryCheckBox;
