import "../style.scss";
import "./style.scss";
import "date-fns";

import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import cx from "classnames";
import React from "react";

const EntryDate = ({
  className,
  name,
  label,
  value,
  placeholder,
  onInputChange,
  startDate,
  endDate,
  minDate,
}) => {
  const hasHours = startDate || endDate;
  // ...
  const handleDateChange = (date) => {
    if (startDate) date?.setHours(0, 0, 0, 0);
    if (endDate) date?.setHours(23, 59, 59, 0);
    // ...
    onInputChange({ [name]: date });
  };
  // ...
  return (
    <Box className={cx("Entry EntryDate", { [className]: !!className })}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          minDate={minDate}
          disableToolbar
          margin="normal"
          label={label}
          format={hasHours ? "dd-MM-yyyy HH:mm:ss" : "dd-MM-yyyy"}
          value={value}
          name={name}
          onChange={handleDateChange}
          variant="inline"
          inputVariant="outlined"
          InputLabelProps={{ shrink: true }}
          placeholder={placeholder || "Day-Month-Year"}
          fullWidth
          autoOk
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </Box>
  );
};

export default EntryDate;
