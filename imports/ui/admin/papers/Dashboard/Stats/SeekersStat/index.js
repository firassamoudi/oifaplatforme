import { withTracker } from "meteor/react-meteor-data";
import moment from "moment";
import React from "react";

import ProgramCollection from "/imports/api/Program";
import SeekerCollection from "/imports/api/Seeker";
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

const SeekersStat = ({ seekers, programs, cfas }) => {
  // - Totals
  const total = `${seekers?.length ?? "0"} `;
  // - SignUps
  const rSignups = _.groupBy(seekers, (s) =>
    moment(s.seekers).startOf("month").format("MM/YYYY")
  );
  const signups = prepGroupsData(rSignups);
  // - By Sector
  const bBySectors = seekers
    .map((seeker) => {
      return seeker.sector?.map((sec) => sec.label) || [];
    })
    .reduce((all, sectors) => {
      return [...all, ...sectors];
    }, []);
  const rBySectors = _.groupBy(bBySectors, (s) => s);
  const bySectors = prepGroupsData(rBySectors);
  // - By Country
  const rByCountries = _.groupBy(seekers, (s) =>
    getOptionLabel({ optionsList: "countriesOptions", value: s.headOffice })
  );
  const byCountries = prepGroupsData(rByCountries);
  // - Program
  const challenges = [
    ["Programs", programs?.length ?? 0],
    ["CFAs", cfas?.length ?? 0],
  ];
  // ...
  return (
    <div className="DashboardAdminStatsCharts">
      <div className="DashboardAdminStatsCharts__section">
        <BarChartBox data={{ total, signups }} isSeeker />
      </div>
      <div className="DashboardAdminStatsCharts__section DashboardAdminStatsCharts__section--pie">
        <div className="DashboardAdminStatsCharts__pie-col">
          <PieChartBox title="Seekers by sector" data={bySectors} />
        </div>
        <div className="DashboardAdminStatsCharts__pie-col">
          <PieChartBox title="Seekers by country" data={byCountries} />
        </div>
      </div>
      <div className="DashboardAdminStatsCharts__section">
        <InfoBox title="Challenges" data={challenges} />
      </div>
    </div>
  );
};

export default withTracker(() => {
  const handle = Meteor.subscribe("admin-seekers-stats");
  if (!handle.ready()) {
    return { seekers: [] };
  }
  const seekers = SeekerCollection.find().fetch();
  const programs = ProgramCollection.find({ isCFA: false }).fetch();
  const cfas = ProgramCollection.find({ isCFA: true }).fetch();
  // ...
  return { seekers, programs, cfas };
})(SeekersStat);
