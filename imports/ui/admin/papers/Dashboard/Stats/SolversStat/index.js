import { withTracker } from "meteor/react-meteor-data";
import moment from "moment";
import React from "react";

import ApplicationCollection from "/imports/api/Application";
import SolversCollection from "/imports/api/Solver";
import { getOptionLabel } from "/imports/libs/inputs";

import BarChartBox from "../BarChartBox/BarChartBox";
import InfoBox from "../InfoBox/InfoBox";
import PieChartBox from "../PieChartBox/PieChartBox";

const prepGroupsData = (raw) => {
  const ret_ = [];
  Object.keys(raw).forEach((rK) => {
    ret_.push([rK, raw[rK].length]);
  });
  return ret_;
};

const SolversStat = ({
  solvers,
  appStarted,
  appSubmitted,
  appAccepted,
  appNotDropped,
}) => {
  // - Totals
  const total = `${solvers?.length ?? "0"} `;
  // - SignUps
  const rSignups = _.groupBy(solvers, (s) =>
    moment(s.solvers).startOf("month").format("MM/YYYY")
  );
  const signups = prepGroupsData(rSignups);
  // - By Type
  const rByType = _.groupBy(solvers, (s) => s.type);
  const byType = prepGroupsData(rByType);
  // - By Country
  const rByCountries = _.groupBy(solvers, (s) =>
    getOptionLabel({ optionsList: "countriesOptions", value: s.country })
  );
  const byCountries = prepGroupsData(rByCountries);
  // - Applications
  const byApplications = [
    ["Started", appStarted?.length ?? 0],
    ["Submitted", appSubmitted?.length ?? 0],
    ["Accepted", appAccepted?.length ?? 0],
    ["Final", appNotDropped?.length ?? 0],
  ];
  // ...
  return (
    <div className="DashboardAdminStatsCharts">
      <div className="DashboardAdminStatsCharts__section">
        <BarChartBox data={{ total, signups }} isSolver />
      </div>
      <div className="DashboardAdminStatsCharts__section DashboardAdminStatsCharts__section--pie">
        <div className="DashboardAdminStatsCharts__pie-col">
          <PieChartBox title="Solvers by sector" data={byType} />
        </div>
        <div className="DashboardAdminStatsCharts__pie-col">
          <PieChartBox title="Solvers by country" data={byCountries} />
        </div>
      </div>
      <div className="DashboardAdminStatsCharts__section">
        <InfoBox title="Applications" data={byApplications} />
      </div>
    </div>
  );
};

export default withTracker(() => {
  const handle = Meteor.subscribe("admin-solvers-stats");
  if (!handle.ready()) {
    return { solvers: [] };
  }
  const solvers = SolversCollection.find().fetch();
  const appStarted = ApplicationCollection.find({ published: false }).fetch();
  const appSubmitted = ApplicationCollection.find({
    published: true,
    evaluated: false,
  }).fetch();
  const appAccepted = ApplicationCollection.find({
    published: true,
    evaluated: true,
  }).fetch();
  const appNotDropped = ApplicationCollection.find({
    published: true,
    evaluated: true,
    accepted: true,
  }).fetch();
  // ...
  return {
    solvers,
    appStarted,
    appSubmitted,
    appAccepted,
    appNotDropped,
  };
})(SolversStat);
