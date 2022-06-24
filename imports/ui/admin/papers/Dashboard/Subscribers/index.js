import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import SubscribeCollection from "/imports/api/Subscribe";

import EmptyView from "../../../../common/EmptyView";
import Typography from "../../../../common/Typography";
import SearchBar from "../../../components/SearchBar";
import SubscriberCard from "../../../components/SubscriberCard";

const tableCols = [
  {
    label: "Email",
    className: "__col __col--email",
  },
  {
    label: "Subscription date",
    className: "__col __col--date",
  },
];

const DashboardAdminSubscribers = ({ subscribers }) => {
  const [search, setSearch] = useState("");
  const onSearchHandler = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  // ...
  return (
    <Box className="DashboardAdminSubscribers">
      <Box className="DashboardAdminSubscribers__header">
        <Typography size="2.4rem" color="#021c30" face="Bold">
          Subscribers
        </Typography>
        <SearchBar
          placeholder="Search for subscribers"
          value={search}
          handler={onSearchHandler}
        />
      </Box>

      <Box className="DashboardAdminSubscribers__table">
        {!!subscribers.length && (
          <Box className="DashboardAdminSubscribers__table__cols">
            {tableCols.map((tab, index) => (
              <Box key={index} className={tab.className}>
                {tab.label}
              </Box>
            ))}
          </Box>
        )}

        {!subscribers.length && (
          <Box className="DashboardAdminSubscribers__empty">
            <EmptyView />
          </Box>
        )}

        <Box className="DashboardAdminSubscribers__table__body">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <Box className="DashboardAdminSubscribers__table__body__inner">
              {subscribers
                .filter((s) => {
                  const str = search.trim() || "";
                  return s?.email.toLowerCase().includes(str.toLowerCase());
                })
                .sort((x, y) => y.date - x.date)
                .map((subscriber) => (
                  <Box key={subscriber._id}>
                    <SubscriberCard data={subscriber} />
                  </Box>
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
  const handle = Meteor.subscribe("admin-subscribers");
  if (!handle.ready()) {
    return { user, userId, subscribers: [] };
  }
  const subscribers = SubscribeCollection.find().fetch();
  // ...
  return {
    user,
    userId,
    subscribers,
  };
})(DashboardAdminSubscribers);
