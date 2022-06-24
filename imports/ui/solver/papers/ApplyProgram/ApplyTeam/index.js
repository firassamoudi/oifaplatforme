import "./style.scss";

import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";

import Typography from "../../../../common/Typography";
import store from "../store";
import ApplyMemberCard from "./ApplyMemberCard";
import ApplyMemberModal from "./ApplyMemberModal";

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

const ApplyTeam = ({ solverType, data, onInputChange, modal }) => {
  const isStartup = solverType?.toLowerCase() === "startup";
  // - Tabs
  const [currTab, setCurrTab] = useState(isStartup ? 0 : 1);
  const onChangeTab = (event, newTab) => {
    setCurrTab(newTab);
  };
  // - Founder/ Members Modal
  const onModalAddFounder = () => {
    store.set("applicationMember", {
      founder: true,
      member: false,
      open: true,
      id: null,
    });
  };
  const onModalAddMember = () => {
    store.set("applicationMember", {
      founder: false,
      member: true,
      open: true,
      id: null,
    });
  };
  const onModalEditFounder = ({ id }) => {
    store.set("applicationMember", {
      founder: true,
      member: false,
      open: true,
      id,
    });
  };
  const onModalEditMember = ({ id }) => {
    store.set("applicationMember", {
      founder: false,
      member: true,
      open: true,
      id,
    });
  };
  const onModalClose = () => {
    store.set("applicationMember", {
      founder: false,
      member: false,
      open: false,
      id: null,
    });
  };

  // - Founders
  const onAddFounder = ({ item }) => {
    const founders = [...data.founders, item];
    onInputChange({ founders });
  };
  const onEditFounder = ({ item, id }) => {
    const founders = data.founders.map((itm, index) => {
      if (id === index) return item;
      return itm;
    });
    onInputChange({ founders });
  };
  const onDeleteFounder = ({ id }) => {
    const founders = data.founders.filter((item, index) => {
      return id !== index;
    });
    onInputChange({ founders });
  };

  // - Members
  const onAddMember = ({ item }) => {
    const members = [...data.members, item];
    onInputChange({ members });
  };
  const onEditMember = ({ item, id }) => {
    const members = data.members.map((itm, index) => {
      if (id === index) return item;
      return itm;
    });
    onInputChange({ members });
  };
  const onDeleteMember = ({ id }) => {
    const members = data.members.filter((item, index) => {
      return id !== index;
    });
    onInputChange({ members });
  };

  // ...
  return (
    <Box className="ApplyTeam">
      <Box className="ApplyTeam__tabs">
        <Tabs value={currTab} onChange={onChangeTab}>
          {isStartup && (
            <Tab label="Founders" disableRipple {...a11yProps(0)} />
          )}
          <Tab label="Team members" disableRipple {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={currTab} index={0}>
        <Box className="ApplyTeam__members">
          {data.founders.map((member, index) => (
            <ApplyMemberCard
              key={index}
              data={{ ...member }}
              onEdit={() => onModalEditFounder({ id: index })}
              onDelete={() => onDeleteFounder({ id: index })}
            />
          ))}
          <Typography
            face="Medium"
            size="1.5rem"
            height="2rem"
            color="#243160"
            style={{ margin: "2rem 0 0 0", cursor: "pointer" }}
            onClick={onModalAddFounder}
          >
            + Add a new Founder
          </Typography>
        </Box>
        <ApplyMemberModal
          open={modal.open && modal.founder}
          onAdd={onAddFounder}
          onEdit={onEditFounder}
          listData={data.founders}
          closeModal={onModalClose}
        />
      </TabPanel>
      <TabPanel value={currTab} index={1}>
        <Box className="ApplyTeam__members">
          {data.members.map((member, index) => (
            <ApplyMemberCard
              key={index}
              data={{ ...member }}
              onEdit={() => onModalEditMember({ id: index })}
              onDelete={() => onDeleteMember({ id: index })}
            />
          ))}
          <Typography
            face="Medium"
            size="1.5rem"
            height="2rem"
            color="#243160"
            style={{ margin: "2rem 0 0 0", cursor: "pointer" }}
            onClick={onModalAddMember}
          >
            + Add a new Member
          </Typography>
        </Box>

        <ApplyMemberModal
          open={modal.open && modal.member}
          onAdd={onAddMember}
          onEdit={onEditMember}
          listData={data.members}
          closeModal={onModalClose}
        />
      </TabPanel>
    </Box>
  );
};

export default withTracker(({ data, onInputChange }) => {
  const modal = store.get("applicationMember");
  // ...
  return { data, onInputChange, modal };
})(ApplyTeam);
