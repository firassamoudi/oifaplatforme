import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import SolversCollection from "/imports/api/Solver";

import EmptyView from "../../../../common/EmptyView";
import Typography from "../../../../common/Typography";
import SearchBar from "../../../components/SearchBar";
import SolverCard from "../../../components/SolverCard";

const tableCols = [
  {
    label: "Name",
    className: "__col __col--name",
  },
  {
    label: "Type",
    className: "__col __col--type",
  },
  {
    label: "Maturity level",
    className: "__col __col--mlevel",
  },
  {
    label: "Country",
    className: "__col __col--country",
  },
  {
    label: "Status",
    className: "__col __col--status",
  },
];

const DashboardAdminSolvers = ({ solvers }) => {
  const [search, setSearch] = useState("");
  const onSearchHandler = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  // ...
  return (
    <Box className="DashboardAdminSolvers">
      <Box className="DashboardAdminSolvers__header">
        <Typography size="2.4rem" color="#021c30" face="Bold">
          Solvers
        </Typography>
        <SearchBar
          placeholder="Search for solver"
          value={search}
          handler={onSearchHandler}
        />
      </Box>

      <Box className="DashboardAdminSolvers__table">
        {!!solvers.length && (
          <Box className="DashboardAdminSolvers__table__cols">
            {tableCols.map((tab, index) => (
              <Box key={index} className={tab.className}>
                {tab.label}
              </Box>
            ))}
          </Box>
        )}

        {!solvers.length && (
          <Box className="DashboardAdminSolvers__empty">
            <EmptyView />
          </Box>
        )}

        <Box className="DashboardAdminSolvers__table__body">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <Box className="DashboardAdminSolvers__table__body__inner">
              {solvers
                .filter((s) => {
                  const str = search.trim() || "";
                  return s
                    ?.getOrgName()
                    .toLowerCase()
                    .includes(str.toLowerCase());
                })
                .sort((x, y) => x.owner().accepted - y.owner().accepted)
                .map((solver) => (
                  <SolverCard key={solver._id} data={solver} />
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
  const handle = Meteor.subscribe("solvers");
  if (!handle.ready()) {
    return { user, userId, solvers: [] };
  }
  const solvers = SolversCollection.find().fetch();
  // ...
  return {
    user,
    userId,
    solvers,
  };
})(DashboardAdminSolvers);
