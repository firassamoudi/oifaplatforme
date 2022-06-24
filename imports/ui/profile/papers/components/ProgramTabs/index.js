import "./style.scss";

import { Divider } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import cx from "classnames";
import React from "react";

import programOverviewTabs from "./configs";
import FixedHeader from "./FixedHeader";
import TabPanel from "./TabPanel";

const TabsPanel = ({ isCFA, tabs }) => (
  <Box className="TabsPanel">
    {tabs.map((tab, index) => {
      const { Component, props } = tab;
      const isChallenges = props.id === "program-challenges";
      // ...
      return (
        <Box
          key={index}
          pb="3rem"
          className={cx("Program-section", { __isCFA: isChallenges && isCFA })}
        >
          <Box
            className={`Program-section-target Program-section-target--${index}`}
          />
          <Component isCFA={isCFA} {...props} />
        </Box>
      );
    })}
  </Box>
);

const ProgramTabs = ({
  data,
  fixed,
  scrollBarRef,
  programTabsRef,
  onNavigateHandler,
  // ...
  isSolver,
  isAdmin,
  canApply,
  canAccept,
  isEligible,
  isInAppPhaseOut,
  onProgramApply,
  onAdminAccept,
  isLoading,
}) => {
  const isCFA = data?.isCFA;
  // ...
  const [value, setValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  // ...
  return (
    <Box className="ProgramTabs">
      <FixedHeader
        data={data}
        fixed={fixed}
        tabs={programOverviewTabs(data, isCFA)}
        value={value}
        handleTabChange={handleTabChange}
        scrollBarRef={scrollBarRef}
        onNavigateHandler={onNavigateHandler}
        // ...
        isSolver={isSolver}
        isAdmin={isAdmin}
        canApply={canApply}
        canAccept={canAccept}
        isEligible={isEligible}
        isInAppPhaseOut={isInAppPhaseOut}
        onProgramApply={onProgramApply}
        onAdminAccept={onAdminAccept}
        isLoading={isLoading}
      />

      <Box
        className={cx("ProgramTabs__tabs", {
          "ProgramTabs__tabs--hide": fixed,
        })}
      >
        <Box className="container container--std">
          <TabPanel
            tabs={programOverviewTabs(data, isCFA)}
            value={value}
            scrollBarRef={scrollBarRef}
            handleTabChange={handleTabChange}
            onNavigateHandler={onNavigateHandler}
          />
        </Box>
      </Box>

      <Box className="container container--std">
        <Divider className="ProgramTabs__divider" ref={programTabsRef} />
      </Box>

      <Box className="container container--small">
        <TabsPanel isCFA={isCFA} tabs={programOverviewTabs(data)} />
      </Box>
    </Box>
  );
};

export default ProgramTabs;
