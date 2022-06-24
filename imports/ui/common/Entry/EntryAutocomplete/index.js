import "../style.scss";
import "./style.scss";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import cx from "classnames";
import React from "react";

const NoOption = () => (
  <span className="MuiAutocomplete-NoOption">No option found!</span>
);

const EntryAutocomplete = ({
  className,
  name,
  label,
  placeholder = "",
  value = [],
  options,
  freeSolo,
  onInputChange,
  multiline,
  error,
}) => {
  const onChangeHandler = (e, value) => {
    onInputChange({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: "",
    });
  };
  // ...
  return (
    <Box
      className={cx("Entry", "EntryAutocomplete", { [className]: !!className })}
    >
      <Autocomplete
        freeSolo={freeSolo}
        multiple={multiline}
        options={options}
        value={value}
        noOptionsText={<NoOption />}
        getOptionLabel={(opt) => opt.label || ""}
        getOptionSelected={(option) => {
          const _exist = value.filter((opt) => opt.value === option.value);
          return !!_exist.length;
        }}
        filterSelectedOptions
        onChange={onChangeHandler}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={label}
            placeholder={placeholder}
            InputLabelProps={{ shrink: true }}
            helperText={error || ""}
            error={!!error}
          />
        )}
      />
    </Box>
  );
};

export default EntryAutocomplete;
