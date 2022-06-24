import "./style.scss";

import { Divider } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import ScrollArea from "react-scrollbars-custom";

import Typography from "../../../../common/Typography";
import SeekersStat from "./SeekersStat";
import SolversStat from "./SolversStat";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  // ...
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box className="StatTabs__tabpanel">
          <Typography name="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const RenderTabs = ({ tabs, value, handleChange, elevation = 0 }) => {
  const label = (text) => (
    <Typography
      face="Medium"
      color="#061237"
      size="1.6rem"
      style={{
        textTransform: "initial",
      }}
    >
      {text}
    </Typography>
  );
  // ...
  return (
    <>
      <AppBar position="static" elevation={elevation}>
        <Tabs className="" value={value} onChange={handleChange}>
          {tabs.map((tab, index) => {
            return <Tab key={index} className="" label={label(tab.label)} />;
          })}
        </Tabs>
      </AppBar>
      <Divider className="StatTabs__divider" />
    </>
  );
};

const RenderTabPanels = ({ tabs, value }) => {
  return tabs.map((tab, index) => {
    return (
      <TabPanel key={index} value={value} index={index}>
        <div className="StatTabs__card">
          <tab.Content {...tab.props} />
        </div>
      </TabPanel>
    );
  });
};

const DashboardAdminStats = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // ...
  const tabs = [
    { label: "Seekers", Content: SeekersStat },
    { label: "Solvers", Content: SolversStat },
  ];
  // ...
  // ...
  return (
    <Box className="DashboardAdminStats">
      <Box className="DashboardAdminStats__inner">
        <Box className="StatTabs">
          {RenderTabs({ tabs, value, handleChange })}
          <div style={{ width: "100%", height: "calc(100vh - 16.5rem)" }}>
            <ScrollArea
              momentum
              style={{ flex: 1, width: "100%", height: "100%" }}
            >
              <div>{RenderTabPanels({ tabs, value, handleChange })}</div>
            </ScrollArea>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardAdminStats;
