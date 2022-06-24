import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import SeekersCollection from "/imports/api/Seeker";

import EmptyView from "../../../../common/EmptyView";
import Typography from "../../../../common/Typography";
import SearchBar from "../../../components/SearchBar";
import SeekerCard from "../../../components/SeekerCard";

const tableCols = [
  {
    label: "Name",
    className: "__col __col--name",
  },
  {
    label: "Challenges",
    className: "__col __col--programs",
  },
  {
    label: "Connected",
    className: "__col __col--solvers",
  },
  {
    label: "Plan",
    className: "__col __col--plan",
  },
  {
    label: "Head office",
    className: "__col __col--country",
  },
  {
    label: "status",
    className: "__col __col--status",
  },
];

const DashboardAdminSeekers = ({ seekers }) => {
  const [search, setSearch] = useState("");
  const onSearchHandler = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  // ...
  return (
    <Box className="DashboardAdminSeekers">
      <Box className="DashboardAdminSeekers__header">
        <Typography size="2.4rem" color="#021c30" face="Bold">
          Seekers
        </Typography>
        <SearchBar
          placeholder="Search seekers"
          value={search}
          handler={onSearchHandler}
        />
      </Box>

      <Box className="DashboardAdminSeekers__table">
        {!!seekers.length && (
          <Box className="DashboardAdminSeekers__table__cols">
            {tableCols.map((tab, index) => (
              <Box key={index} className={tab.className}>
                {tab.label}
              </Box>
            ))}
          </Box>
        )}

        {!seekers.length && (
          <Box className="DashboardAdminSeekers__empty">
            <EmptyView />
          </Box>
        )}

        <Box className="DashboardAdminSeekers__table__body">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <Box className="DashboardAdminSeekers__table__body__inner">
              {seekers
                .filter((s) => {
                  const str = search.trim() || "";
                  return s.organization
                    .toLowerCase()
                    .includes(str.toLowerCase());
                })
                .sort((x, y) => x.owner().accepted - y.owner().accepted)
                .map((seeker) => (
                  <SeekerCard key={seeker._id} data={seeker} />
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
  const handle = Meteor.subscribe("admin-seekers");
  if (!handle.ready()) {
    return { user, userId, seekers: [] };
  }
  const seekers = SeekersCollection.find().fetch();
  // ...
  return {
    user,
    userId,
    seekers,
  };
})(DashboardAdminSeekers);
