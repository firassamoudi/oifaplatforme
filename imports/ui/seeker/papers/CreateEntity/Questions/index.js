import "./style.scss";

import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { useState } from "react";

import Template from "./Template";

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

const a11yProps = (index) => ({
  id: `tab-${index}`,
  "aria-controls": `tabpanel-${index}`,
});

const ProgramQuestions = ({ data, onInputChange }) => {
  const targetAudience = data.targetAudience;
  // - Questions Template
  const questionsDesigner = data.questionsDesigner || [];
  const questionsDeveloper = data.questionsDeveloper || [];
  const questionsResearcher = data.questionsResearcher || [];
  const questionsStartup = data.questionsStartup || [];
  const questionsStudent = data.questionsStudent || [];
  // ...
  const onQuestionsChanged = ({ dataId, questions }) => {
    onInputChange({ [dataId]: questions });
  };
  // - Tabs
  const [currTab, setCurrTab] = useState(0);
  const onChangeTab = (event, newTab) => {
    setCurrTab(newTab);
  };
  // ...
  return (
    <Box className="ProgramQuestions">
      <Tabs value={currTab} onChange={onChangeTab}>
        {targetAudience.map((t, i) => (
          <Tab key={i} label={t.label} disableRipple {...a11yProps(i)} />
        ))}
      </Tabs>

      {targetAudience.map((t, i) => {
        const type = t.label.toLowerCase();
        return (
          <TabPanel
            key={i}
            className="ProgramQuestions__tabPanel"
            value={currTab}
            index={i}
          >
            {type === "startup" && (
              <Template
                dataId="questionsStartup"
                data={questionsStartup}
                onQuestionsChanged={onQuestionsChanged}
              />
            )}
            {type === "designer" && (
              <Template
                dataId="questionsDesigner"
                data={questionsDesigner}
                onQuestionsChanged={onQuestionsChanged}
              />
            )}
            {type === "developer" && (
              <Template
                dataId="questionsDeveloper"
                data={questionsDeveloper}
                onQuestionsChanged={onQuestionsChanged}
              />
            )}
            {type === "student" && (
              <Template
                dataId="questionsStudent"
                data={questionsStudent}
                onQuestionsChanged={onQuestionsChanged}
              />
            )}
            {type === "researcher" && (
              <Template
                dataId="questionsResearcher"
                data={questionsResearcher}
                onQuestionsChanged={onQuestionsChanged}
              />
            )}
          </TabPanel>
        );
      })}
    </Box>
  );
};

export default ProgramQuestions;
