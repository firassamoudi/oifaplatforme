import "./style.scss";

import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

import { countriesOptions, programTypes } from "/imports/libs/inputs";

import { EntrySelect } from "../../../common/Entry";

const SearchPogramBar = ({ data, onInputChange }) => {
  const onChangeHandler = (e) => {
    const target = e.target;
    onInputChange({ [target.name]: target.value });
  };
  // ...
  return (
    <Box className="SearchPogramBar">
      <InputBase
        name="progName"
        className="SearchPogramBar__input"
        placeholder="Search for challenges"
        value={data.progName}
        onChange={onChangeHandler}
        startAdornment={
          <SearchIcon
            style={{
              fontSize: "2.3rem",
              color: "#7c8799",
              margin: "0 1.1rem 0 1.8rem",
            }}
          />
        }
      />
      <Box className="SearchPogramBar__field">
        <EntrySelect
          name="type"
          value={data.type}
          onInputChange={onInputChange}
          options={programTypes}
        />
      </Box>
      <Box className="SearchPogramBar__country">
        <EntrySelect
          name="country"
          placeholder="All Countries"
          value={data.country}
          onInputChange={onInputChange}
          options={countriesOptions}
        />
      </Box>
    </Box>
  );
};

export default SearchPogramBar;
