import "./style.scss";

import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import EmptyView from "/imports/ui/common/EmptyView";
import Typography from "/imports/ui/common/Typography";

import InnovationCard from "./InnovationCard";

const tableCols = [
  {
    label: "NAME",
    className: "__col __col--name",
  },
  {
    label: "Country",
    className: "__col __col--country",
  },
  {
    label: "Category",
    className: "__col __col--category",
  },
  {
    label: "Status",
    className: "__col __col--sector",
  },
  {
    label: "",
    className: "__col __col--actions",
  },
];

const Drop = ({ solvers }) => {
  // ...
  return (
    <Box className="Workplace__Drop">
      <Box className="Workplace__Drop__table">
        {!!solvers.length && (
          <Box className="Workplace__Drop__table__cols">
            {tableCols.map((col, index) => (
              <Typography
                key={index}
                name="div"
                size="1.2rem"
                color="#8993a8"
                face="Medium"
                className={col.className}
              >
                {col.label}
              </Typography>
            ))}
          </Box>
        )}

        <Box className="Workplace__Drop__body">
          {!!solvers.length && (
            <ScrollArea
              momentum
              style={{ flex: 1, width: "100%", height: "100%" }}
            >
              <Box className="Workplace__Drop__body__inner">
                {solvers.map((solver, index) => (
                  <InnovationCard data={solver} key={index} />
                ))}
              </Box>
            </ScrollArea>
          )}
          {!solvers.length && (
            <Box className="Workplace__Drop__empty">
              <EmptyView search />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Drop;
