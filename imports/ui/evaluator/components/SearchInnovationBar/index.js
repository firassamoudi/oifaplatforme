import "./style.scss";

import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

import Button from "../../../common/Button";
import Typography from "../../../common/Typography";

const SearchInnovationBar = () => (
  <Box className="SearchInnovationBar">
    <InputBase
      className="SearchInnovationBar__input"
      placeholder="Mazam"
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
    <Box className="SearchInnovationBar__field" />
    <Box className="SearchInnovationBar__country" />
    <Box className="SearchInnovationBar__btnBox">
      <Button>Search</Button>
    </Box>
  </Box>
);

export default SearchInnovationBar;
