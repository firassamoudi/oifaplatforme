import "./style.scss";
import "date-fns";

import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import cx from "classnames";
import React from "react";

const EntryTime = ({ className, name, label, value, onInputChange }) => {
  const handleDateChange = (date) => {
    onInputChange({ [name]: date });
  };
  // ...
  return (
    <Box className={cx("Entry EntryTime", { [className]: !!className })}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
          disableToolbar
          margin="normal"
          label={label}
          value={value}
          onChange={handleDateChange}
          variant="inline"
          inputVariant="outlined"
          fullWidth
          KeyboardButtonProps={{
            "aria-label": "change time",
          }}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
};

export default EntryTime;
