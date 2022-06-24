import "./style.scss";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import React from "react";

import Typography from "../../../../../common/Typography";
import IncentiveCard from "./IncentiveCard";

const Incentive = ({ id, data }) => {
  const incentive = data.incentive || {};
  const incentives = [
    {
      title: "Incubation",
      desc: incentive.incubation,
      icon: "/incentives/incubation.svg",
    },
    {
      title: "Cash prize",
      desc: incentive.cashPrize,
      icon: "/incentives/cash.svg",
    },
    {
      title: "Test product on market",
      desc: incentive.testProductOnMarket,
      icon: "/incentives/test.svg",
    },
    {
      title: "Equipments",
      desc: incentive.equipments,
      icon: "/incentives/equipment.svg",
    },
    {
      title: "Trainings",
      desc: incentive.trainings,
      icon: "/incentives/training.svg",
    },
    {
      title: "Other",
      desc: incentive.other,
      icon: "/incentives/other.svg",
    },
  ].filter((inc) => !!inc.desc);
  // ...
  return (
    <Box id={id} className="Incentive">
      <Typography face="Bold" color="#051438" size="2rem">
        Incentive
      </Typography>
      <Divider className="Incentive__divider" />
      <Box className="IncentiveList">
        {incentives.map((inc, i) => (
          <IncentiveCard key={i} {...inc} />
        ))}
      </Box>
    </Box>
  );
};

export default Incentive;
