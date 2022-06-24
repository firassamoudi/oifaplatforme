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
  onChange,
  onBlur,
  error = "",
}) => {
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
        onChange={onChange}
        onBlur={onBlur}
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
