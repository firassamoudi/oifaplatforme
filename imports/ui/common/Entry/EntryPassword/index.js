import "../style.scss";
import "./style.scss";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";

import Typography from "../../Typography";

const EntryPassword = ({
  name,
  label,
  value,
  placeholder = "Your password",
  onInputChange,
  error,
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
  const [showPassword, setShowPassword] = useState(false);
  // ...
  const onShowPassword = () => {
    setShowPassword(() => !showPassword);
  };
  return (
    <Box className="Entry EntryPassword">
      <TextField
        label={label}
        type={showPassword ? "text" : "password"}
        name={name}
        variant="outlined"
        fullWidth
        value={value}
        placeholder={placeholder}
        InputLabelProps={{ shrink: true }}
        onChange={onChangeHandler}
        error={!!error}
        helperText={error}
        InputProps={{
          endAdornment: (
            <Typography
              className="__show-hide"
              onClick={onShowPassword}
              face="Medium"
              color="rgb(3, 37, 108)"
              size="13px"
              style={{
                cursor: "pointer",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </Typography>
          ),
        }}
      />
    </Box>
  );
};

export default EntryPassword;
