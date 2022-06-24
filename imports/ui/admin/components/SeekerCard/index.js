import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import Country from "../../../common/Country";
import Typography from "../../../common/Typography";

const AdminSeekerCard = ({ data }) => {
  const owner = data?.owner();
  const plan = data?.plan();
  const isActive = owner.accepted;
  // ...
  const onHandle = () => {
    window.open(`/dashboard/i/seeker-profile/${data._id}`);
  };
  // ...
  return (
    <Box className="AdminSeekerCard" onClick={onHandle}>
      <Typography
        className="AdminSeekerCard__name"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {data.organization}
      </Typography>
      <Typography
        className="AdminSeekerCard__programs"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {data.programs().length}
      </Typography>
      <Typography
        className="AdminSeekerCard__solvers"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {data.solversId.length}
      </Typography>
      <Typography
        className="AdminSeekerCard__plan"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {plan?.type === "SUBSCRIPTION" ? "Subscription" : "Pay as you go"}
      </Typography>
      <Typography
        className="AdminSeekerCard__country"
        size="1.6rem"
        color="#061338"
        face="Bold"
        style={{ textTransform: "capitalize" }}
      >
        <Country value={data?.headOffice} />
      </Typography>
      <Typography
        className="AdminSeekerCard__status"
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
})(AdminSeekerCard);
