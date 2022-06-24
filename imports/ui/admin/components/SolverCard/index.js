import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { getOptionLabel } from "/imports/libs/inputs";

import Country from "../../../common/Country";
import Typography from "../../../common/Typography";

const AdminSolverCard = ({ data }) => {
  const owner = data.owner();
  const isActive = owner.accepted;
  const orgName = data.getOrgName();
  // ...
  const onOpenSolver = () => {
    window.open(`/dashboard/i/solver-profile/${data._id}`);
  };
  // ...
  return (
    <Box className="AdminSolverCard" onClick={onOpenSolver}>
      <Typography
        className="AdminSolverCard__name"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {orgName}
      </Typography>

      <Typography
        className="AdminSolverCard__type"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {data.type}
      </Typography>

      <Typography
        className="AdminSolverCard__mlevel"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {getOptionLabel({
          optionsList: "maturities",
          value: data.maturityLevel,
        })}
      </Typography>

      <Typography
        className="AdminSolverCard__country"
        size="1.6rem"
        color="#061338"
        face="Bold"
        style={{ textTransform: "capitalize" }}
      >
        <Country value={data.country} />
      </Typography>

      <Typography
        className="AdminSolverCard__status"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {isActive ? "Active" : "Inactive"}
      </Typography>
    </Box>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  // ...
  return {
    user,
    userId,
  };
})(AdminSolverCard);
