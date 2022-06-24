import "./style.scss";

import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

import { countriesOptions, targets } from "/imports/libs/inputs";

// import Button from "../../../common/Button";
import { EntrySelect } from "../../../common/Entry";
// import Typography from "../../../common/Typography";

const SearchInnovationBar = ({ data, onInputChange, onSearchSolvers }) => {
  const onChangeHandler = (e) => {
    const target = e.target;
    onInputChange({ [target.name]: target.value });
  };
  // ...
  return (
    <Box className="SearchInnovationBar">
      <InputBase
        name="orgName"
        className="SearchInnovationBar__input"
        placeholder="Innovation agent name"
        value={data.orgName}
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
      <Box className="SearchInnovationBar__field">
        <EntrySelect
          name="type"
          // placeholder="Solver type"
          value={data.type}
          onInputChange={onInputChange}
          options={targets}
        />
      </Box>
      <Box className="SearchInnovationBar__country">
        <EntrySelect
          name="country"
          placeholder="All Countries"
          value={data.country}
          onInputChange={onInputChange}
          options={countriesOptions}
        />
      </Box>
      {/* <Box className="SearchInnovationBar__btnBox">
        <Button onClick={onSearchSolvers}>
          <Typography face="Medium" size="1.6rem" height="2rem" color="#ffc857">
            Search
          </Typography>
        </Button>
      </Box> */}
    </Box>
  );
};

export default SearchInnovationBar;
