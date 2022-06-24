import "./style.scss";

import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import Logo from "../../common/Logo";
import NavbarUser from "../../common/NavbarUser";
import NavLink from "../../common/NavLink";

const TabPanel = ({ children, value, index, className }) => (
  <Box
    className={className}
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && children}
  </Box>
);

const a11yProps = (index) => {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
};

const SettingsLayout = ({ settingsTabs }) => {
  // - Tabs
  const [currTab, setCurrTab] = useState(0);
  const onChangeTab = (event, newTab) => {
    setCurrTab(newTab);
  };
  // ...
  return (
    <Box className="SettingsLayout">
      <Box className="SettingsLayout__navbar">
        <Box className="__logo">
          <NavLink to="/dashboard">
            <Logo />
          </NavLink>
        </Box>
        <NavbarUser />
      </Box>

      <Box className="SettingsLayout__content">
        <Box className="SettingsLayout__content__header">
          <Box className="SettingsLayout__content__header__inner">
            <Box className="SettingsLayout__content__header__sections">
              <Tabs value={currTab} onChange={onChangeTab}>
                {settingsTabs.map((tab, index) => (
                  <Tab
                    key={index}
                    label={tab.label}
                    disableRipple
                    {...a11yProps(index)}
                  />
                ))}
              </Tabs>
            </Box>
          </Box>
        </Box>
        <Box className="SettingsLayout__content__outer">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <Box className="SettingsLayout__content__inner">
              <Box className="SettingsLayout__content__inner__inner">
                {settingsTabs.map((tab, index) => (
                  <TabPanel value={currTab} index={index} key={index}>
                    <tab.Paper />
                  </TabPanel>
                ))}
              </Box>
            </Box>
          </ScrollArea>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsLayout;
