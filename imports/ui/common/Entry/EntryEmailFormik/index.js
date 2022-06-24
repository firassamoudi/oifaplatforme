import "./style.scss";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import cx from "classnames";
import React from "react";

const EntryEmail = ({
  className,
  name = "email",
  label = "Email",
  placeholder = "Your address email",
  value = "",
  onChange,
  onBlur,
  error,
  readOnly,
}) => {
  // ...
  return (
    <Box className={cx("Entry", "EntryEmail", { [className]: !!className })}>
      <TextField
        label={label}
        type="email"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
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
