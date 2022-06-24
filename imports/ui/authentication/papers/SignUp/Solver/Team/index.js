import "./style.scss";

import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";

import Button from "../../../../../common/Button";
import Typography from "../../../../../common/Typography";
import store from "../store";
import MemberCard from "./MemberCard";
import MemberModal from "./MemberModal";

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

const SolverTeam = ({ data, onInputChange, modal }) => {
  // - Tabs
  const [currTab, setCurrTab] = useState(0);
  const onChangeTab = (event, newTab) => {
    setCurrTab(newTab);
  };
  // - Founder/ Members Modal
  const onModalAddFounder = () => {
    store.set("member", { founder: true, member: false, open: true, id: null });
  };
  const onModalAddMember = () => {
    store.set("member", { founder: false, member: true, open: true, id: null });
  };
  const onModalEditFounder = ({ id }) => {
    store.set("member", { founder: true, member: false, open: true, id });
  };
  const onModalEditMember = ({ id }) => {
    store.set("member", { founder: false, member: true, open: true, id });
  };
  const onModalClose = () => {
    store.set("member", {
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
    <Box className="SolverTeam">
      <Box className="SolverTeam__tabs">
        <Tabs value={currTab} onChange={onChangeTab}>
          <Tab label="Founders" disableRipple {...a11yProps(0)} />
          <Tab label="Team members" disableRipple {...a11yProps(1)} />
        </Tabs>
        <Button
          onClick={currTab ? onModalAddMember : onModalAddFounder}
          style={{ height: "4rem", padding: "0 2.8rem" }}
        >
          Add
          {currTab ? " Member" : " Founder"}
        </Button>
      </Box>

      <TabPanel value={currTab} index={0}>
        <Box className="SolverTeam__members">
          {data.founders.map((member, index) => (
            <MemberCard
              key={index}
              data={{ ...member }}
              onEdit={() => onModalEditFounder({ id: index })}
              onDelete={() => onDeleteFounder({ id: index })}
            />
          ))}
        </Box>
        <MemberModal
          open={modal.open && modal.founder}
          onAdd={onAddFounder}
          onEdit={onEditFounder}
          listData={data.founders}
          closeModal={onModalClose}
        />
      </TabPanel>
      <TabPanel value={currTab} index={1}>
        <Box className="SolverTeam__members">
          {data.members.map((member, index) => (
            <MemberCard
              key={index}
              data={{ ...member }}
              onEdit={() => onModalEditMember({ id: index })}
              onDelete={() => onDeleteMember({ id: index })}
            />
          ))}
        </Box>
        <MemberModal
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
  const modal = store.get("member");
  // ...
  return { data, onInputChange, modal };
})(SolverTeam);
