import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

const Images = () => {
  return (
    <Box className="Images">
      <Box component="ul" className="Images__list">
        {[1, 1, 1, 1, 1].map((_, index) => {
          return (
            <Box className="Images__item" key={index}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1593642532454-e138e28a63f4?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                className="Images__img"
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Images;
