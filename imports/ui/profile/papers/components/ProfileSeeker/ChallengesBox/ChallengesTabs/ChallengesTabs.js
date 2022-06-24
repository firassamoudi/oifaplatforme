import "./style.scss";

import { Divider } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";

import Typography from "../../../../../../common/Typography";
import ChallengesList from "../ChallengesList/ChallengesList";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box pt="1.7rem">
          <Typography name="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const ChallengesTabs = (props) => {
  const cfaList = props.challenges.filter((challenge) => challenge.isCFA);
  const programs = props.challenges.filter((challenge) => !challenge.isCFA);

  const tabs = [
    {
      label: "Programs",

      content: ChallengesList,
      props: { list: programs, emptyLabel: "No Programs" },
    },
    {
      label: "Call for applications",

      content: ChallengesList,
      props: { list: cfaList, emptyLabel: "No Call For Applications" },
    },
  ];
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const RenderTabs = (tabs, elevation = 0) => {
    const label = (text) => (
      <Typography
        face="Medium"
        color="#434C5E"
        size="1.4rem"
        style={{
          textTransform: "initial",
        }}
      >
        {text}
      </Typography>
    );

    return (
      <>
        <AppBar position="static" elevation={elevation}>
          <Tabs className="" value={value} onChange={handleChange}>
            {tabs.map((tab, index) => {
              return <Tab key={index} className="" label={label(tab.label)} />;
            })}
          </Tabs>
        </AppBar>
        <Divider className="ChallengesTabs__divider" />
      </>
    );
  };

  const RenderTabPanels = (tabs) => {
    return tabs.map((tab, index) => {
      return (
        <TabPanel key={index} value={value} index={index}>
          <div className="ChallengesTabs__card">
            <tab.content {...tab.props} />
          </div>
        </TabPanel>
      );
    });
  };
  return (
    <Box className="ChallengesTabs">
      {RenderTabs(tabs)}
      {RenderTabPanels(tabs)}
    </Box>
  );
};

export default ChallengesTabs;
