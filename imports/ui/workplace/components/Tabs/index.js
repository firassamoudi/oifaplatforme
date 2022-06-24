import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import React from "react";
import ReactTooltip from "react-tooltip";

import Typography from "../../../common/Typography";

const tooltipStyles = {
  className: "tool",
  type: "dark",
  place: "right",
  arrowColor: "#010d25",
  textColor: "#CDCFD4",
};
const Icon = ({ IconC, currTab, index, handler, label, id }) => (
  <Box
    data-tip
    data-for={id}
    component="aside"
    className={cx("WorkplaceTabs__tab", { __active: currTab === index })}
    onClick={() => handler(index)}
  >
    <img src={IconC} alt="" style={{ fontSize: "2.2rem" }} />
    <ReactTooltip id={id} {...tooltipStyles}>
      <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
        {label}
      </Typography>
    </ReactTooltip>
  </Box>
);

const WorkplaceTabs = ({ currTab, handler, hasRole }) => {
  return (
    <Box component="aside" className="WorkplaceTabs">
      <Icon
        IconC="/assets/Teams tasks.svg"
        currTab={currTab}
        index={0}
        handler={handler}
        label="Teams Tasks"
        id="Tasks"
      />
      <Icon
        IconC="/assets/Announcement.svg"
        currTab={currTab}
        index={1}
        handler={handler}
        label="Announcement"
        id="Announcement"
      />

      {hasRole && (
        <Icon
          IconC="/assets/preselected.svg"
          currTab={currTab}
          index={2}
          handler={handler}
          label="Preselected"
          id="Preselected"
        />
      )}
    </Box>
  );
};

export default WorkplaceTabs;
