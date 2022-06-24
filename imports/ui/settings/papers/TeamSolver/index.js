/* eslint-disable sonarjs/cognitive-complexity */
import "./style.scss";

import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";

import SolverCollection from "/imports/api/Solver";

import Button from "../../../common/Button";
import Typography from "../../../common/Typography";
import MemberCard from "./MemberCard";
import MemberModal from "./MemberModal";
import store from "./store";

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

const AccountSolver = ({ user, solver, modal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // ...
  // - Team Data
  const [form, setForm] = useState({
    founders: [],
    members: [],
    initted: false,
  });
  // ...
  const onInputChange = (inp) => {
    setForm((state) => ({ ...state, ...inp }));
  };
  // ...
  // - Tabs
  const [currTab, setCurrTab] = useState(0);
  const onChangeTab = (event, newTab) => {
    setCurrTab(newTab);
  };

  // - Founder/ Members Modal
  const onModalAddFounder = () => {
    store.set("team", { founder: true, member: false, open: true, id: null });
  };
  const onModalAddMember = () => {
    store.set("team", { founder: false, member: true, open: true, id: null });
  };
  const onModalEditFounder = ({ id }) => {
    store.set("team", { founder: true, member: false, open: true, id });
  };
  const onModalEditMember = ({ id }) => {
    store.set("team", { founder: false, member: true, open: true, id });
  };
  const onModalClose = () => {
    store.set("team", {
      founder: false,
      member: false,
      open: false,
      id: null,
    });
  };

  // - Founders
  const onAddFounder = ({ item }) => {
    const founders = [...form.founders, item];
    onInputChange({ founders });
  };
  const onEditFounder = ({ item, id }) => {
    const founders = form.founders.map((itm, index) => {
      if (id === index) return item;
      return itm;
    });
    onInputChange({ founders });
  };
  const onDeleteFounder = ({ id }) => {
    const founders = form.founders.filter((item, index) => {
      return id !== index;
    });
    onInputChange({ founders });
  };

  // - Members
  const onAddMember = ({ item }) => {
    const members = [...form.members, item];
    onInputChange({ members });
  };
  const onEditMember = ({ item, id }) => {
    const members = form.members.map((itm, index) => {
      if (id === index) return item;
      return itm;
    });
    onInputChange({ members });
  };
  const onDeleteMember = ({ id }) => {
    const members = form.members.filter((item, index) => {
      return id !== index;
    });
    onInputChange({ members });
  };

  // ...
  const onPostData = () => {
    const data = { ...form };
    setIsLoading(true);
    // ...
    Meteor.call("solver.update", { data }, (err) => {
      if (err) return;
      // ...
      setIsLoading(false);
      setIsSuccess(true);
    });
  };
  // ...
  useEffect(() => {
    if (solver && solver.founders && solver.members && !form.initted) {
      const founders = solver.founders;
      const members = solver.members;
      // ...
      setForm({
        founders: [...founders],
        members: [...members],
        initted: true,
      });
    }
  }, [user, solver]);
  // ...
  return (
    <Box className="Settings__TeamSolver">
      <Box className="Settings__TeamSolver__tabs">
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
        <Box className="Settings__TeamSolver__members">
          {form.founders.map((member, index) => (
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
          listData={form.founders}
          closeModal={onModalClose}
        />
      </TabPanel>
      <TabPanel value={currTab} index={1}>
        <Box className="Settings__TeamSolver__members">
          {form.members.map((member, index) => (
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
          listData={form.members}
          closeModal={onModalClose}
        />
      </TabPanel>

      <Box className="Settings__footer">
        <Box className="Settings__footer__inner">
          {!!isSuccess && (
            <Typography
              face="Medium"
              size="1.4rem"
              height="1.6rem"
              style={{
                color: "#ffc857",
                minHeight: "1.6rem",
              }}
            >
              You team has been changed successfully
            </Typography>
          )}
          <Button
            isLoading={isLoading}
            disabled={!form.founders.length}
            onClick={onPostData}
            style={{ height: "5rem" }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  const handle = Meteor.subscribe("_roles");
  const modal = store.get("team");
  // ...
  if (!handle.ready()) return { user, solver: null, modal };
  // ...
  const solver = SolverCollection.findOne({ _id: user?.solverId });
  // ...
  return {
    user,
    solver,
    modal,
  };
})(AccountSolver);
