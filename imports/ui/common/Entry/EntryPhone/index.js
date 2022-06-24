import "../style.scss";
import "./style.scss";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import cx from "classnames";
import MuiPhoneNumber from "material-ui-phone-number";
import React from "react";

const EntryPhone = ({
  className,
  name,
  label,
  value,
  onInputChange,
  error,
  readOnly,
  multiline,
  rows,
  ...props
}) => {
  const onChangeHandler = (e) => {
    const value = e.target.value;
    onInputChange({ [name]: value });
  };
  // ...
  return (
    <Box className={cx("Entry", "EntryPhone", { [className]: !!className })}>
      <MuiPhoneNumber
        name={name}
        label={label}
        // value={value}
        // defaultValue={value}
        variant="outlined"
        fullWidth
        InputLabelProps={
          {
            // shrink: false,
          }
        }
        defaultCountry="us"
        placeholder=""
        // onChange={onChangeHandler}
      />
    </Box>
  );
};

export default EntryPhone;
