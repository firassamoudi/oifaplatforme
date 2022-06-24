import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";

import Typography from "../../../../../common/Typography";

const TabLabel = ({ text }) => (
  <Typography
    name="span"
    face="Bold"
    color="#051438"
    size="1.6rem"
    style={{
      textTransform: "initial",
    }}
  >
    {text}
  </Typography>
);

const TabPanel = ({
  // data,
  tabs,
  value,
  onNavigateHandler,
  handleTabChange,
}) => {
  // ...
  return (
    <AppBar position="static" className="ProgramTabs__app-bar" elevation={0}>
      <Tabs
        className="ProgramTabs__tabs"
        value={value}
        onChange={handleTabChange}
        centered
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className="ProgramTabs__tab"
            label={<TabLabel text={tab.label} />}
            onClick={() => onNavigateHandler(index)}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default TabPanel;
