import "../style.scss";
import "./style.scss";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import cx from "classnames";
import React from "react";

const EntryText = ({
  className,
  name,
  label,
  value,
  defaultValue,
  placeholder = "",
  type = "text",
  onInputChange,
  error,
  readOnly,
  multiline,
  rows,
  // ...props
}) => {
  const onChangeHandler = (e) => {
    const value = e.target.value;
    onInputChange({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: "",
    });
  };
  // ...
  return (
    <Box className={cx("Entry", "EntryText", { [className]: !!className })}>
      <TextField
        multiline={multiline}
        rows={rows}
        name={name}
        label={label}
        placeholder={placeholder}
        type={type}
        onChange={onChangeHandler}
        variant="outlined"
        value={value}
        defaultValue={defaultValue}
        fullWidth
        helperText={error || ""}
        error={!!error}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          readOnly,
        }}
      />
    </Box>
  );
};

export default EntryText;
