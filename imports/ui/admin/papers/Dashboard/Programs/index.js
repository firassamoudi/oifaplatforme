import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import ProgramsCollection from "/imports/api/Program";

import EmptyView from "../../../../common/EmptyView";
import Typography from "../../../../common/Typography";
import ProgramCard from "../../../components/ProgramCard";
import SearchBar from "../../../components/SearchBar";

const tableCols = [
  {
    label: "tite",
    className: "__col __col--title",
  },
  {
    label: "Applications",
    className: "__col __col--applications",
  },
  {
    label: "Timeline",
    className: "__col __col--timeline",
  },
  {
    label: "status",
    className: "__col __col--status",
  },
];

const DashboardAdmin = ({ programs }) => {
  const [search, setSearch] = useState("");
  const onSearchHandler = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  // ...
  return (
    <Box className="DashboardAdmin">
      <Box className="DashboardAdmin__header">
        <Typography size="2.4rem" color="#021c30" face="Bold">
          Programs
        </Typography>
        <SearchBar
          placeholder="Search for program"
          value={search}
          handler={onSearchHandler}
        />
      </Box>

      <Box className="DashboardAdmin__table">
        {!!programs.length && (
          <Box className="DashboardAdmin__table__cols">
            {tableCols.map((tab, index) => (
              <Box key={index} className={tab.className}>
                {tab.label}
              </Box>
            ))}
          </Box>
        )}

        {!programs.length && (
          <Box className="DashboardAdmin__empty">
            <EmptyView />
          </Box>
        )}

        <Box className="DashboardAdmin__table__body">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <Box className="DashboardAdmin__table__body__inner">
              {programs
                .filter((p) => {
                  const str = search.trim() || "";
                  return p?.title.toLowerCase().includes(str.toLowerCase());
                })
                .sort((x, y) => x.accepted - y.accepted)
                .map((program) => (
                  <ProgramCard key={program._id} data={program} />
                ))}
            </Box>
          </ScrollArea>
        </Box>
      </Box>
    </Box>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  const handle = Meteor.subscribe("admin-programs");
  if (!handle.ready()) {
    return { user, userId, programs: [] };
  }
  const programs = ProgramsCollection.find().fetch();
  // ...
  return {
    user,
    userId,
    programs,
  };
})(DashboardAdmin);
