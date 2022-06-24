import Box from "@material-ui/core/Box";
import React from "react";

import Button from "../../../common/Button";
import Typography from "../../../common/Typography";

const Sep = () => (
  <Box
    style={{
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      backgroundColor: "rgb(249, 191, 88)",
      margin: "0px 1.2rem",
    }}
  />
);

const WorkplaceTabs = ({ data, hasRole, handler }) => {
  const program = data && data.program ? data.program() : {};
  const isPublished = data?.published;
  // ...
  return (
    <Box className="Workplace__header">
      <Typography
        className="Workplace__header__path"
        size="1.6rem"
        color="#021C30"
        face="Medium"
        style={{ display: "flex", alignItems: "center" }}
      >
        Programs
        <Sep />
        {program.title}
        <Sep />
        Workplace
      </Typography>
      {hasRole && !isPublished && (
        <Button disabled={data?.published} onClick={handler}>
          Publish Workplace
        </Button>
      )}
      {hasRole && isPublished && (
        <Typography
          className="Workplace__header__path"
          size="1.6rem"
          color="#021C30"
          face="Medium"
          style={{ display: "flex", alignItems: "center" }}
        >
          Workplace is published
        </Typography>
      )}
    </Box>
  );
};

export default WorkplaceTabs;
