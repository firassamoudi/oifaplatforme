import "./style.scss";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import cx from "classnames";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import ErrorIcon from "@material-ui/icons/Error";
import React from "react";

const EntryEmail = ({
  className,
  name = "email",
  label = "Email",
  placeholder = "Your address email",
  value = "",
  onInputChange,
  error,
  readOnly,
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
    <Box className={cx("Entry", "EntryEmail", { [className]: !!className })}>
      <TextField
        label={label}
        type="email"
        name="email"
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        autoComplete="email"
        variant="outlined"
        fullWidth
        readOnly={readOnly}
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

export default EntryEmail;
