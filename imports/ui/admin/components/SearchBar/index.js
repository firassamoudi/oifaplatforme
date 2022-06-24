import "./style.scss";

import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

const AdminSearchBar = ({ placeholder, value, handler }) => {
  return (
    <Box className="AdminSearchBar">
      <Box className="AdminSearchBar__icon">
        <SearchIcon
          style={{ width: "2.3rem", height: "2.3rem", color: "#021c30" }}
        />
      </Box>
      <Box className="AdminSearchBar__input">
        <input placeholder={placeholder} value={value} onChange={handler} />
      </Box>
    </Box>
  );
};

export default AdminSearchBar;
