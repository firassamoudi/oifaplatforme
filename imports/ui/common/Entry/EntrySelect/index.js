import "../style.scss";
import "./style.scss";

import Box from "@material-ui/core/Box";
// import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import cx from "classnames";
import React from "react";

const EntrySelect = ({
  className,
  id,
  name,
  label,
  placeholder,
  onInputChange,
  value = "",
  options,
  readOnly,
  error,
}) => {
  const handleChange = (event) => {
    const value = event.target.value;
    onInputChange({
      [name]: id ? { id: value } : value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: "",
    });
  };
  // ...
  let cOptions = [];
  if (placeholder) {
    cOptions = [{ label: placeholder, value: "" }, ...options];
  } else {
    cOptions = [...options];
  }
  // ...
  return (
    <Box className={cx("Entry", "EntrySelect", { [className]: !!className })}>
      <TextField
        select
        label={label}
        value={value}
        onChange={handleChange}
        helperText={error || ""}
        error={!!error}
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        readOnly={readOnly}
      >
        {cOptions.map((option, index) => (
          <MenuItem
            key={index}
            className="EntrySelect__item"
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      {!value && <Box className="EntrySelect__placeholder">{placeholder}</Box>}
    </Box>
  );
};

export default EntrySelect;
