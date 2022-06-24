import "./style.scss";

import Box from "@material-ui/core/Box";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import cx from "classnames";
import React, { useState } from "react";

import { EntryText } from "../../../../common/Entry";
import Svg from "../../../../common/Svg";
import Typography from "../../../../common/Typography";

const ProgramIncentive = ({ isCFA, data, onInputChange }) => {
  const type = isCFA ? "CFA" : "Program";
  // ...
  const [incentive, setIncentive] = useState([
    {
      label: "Incubation",
      name: "incubation",
      status: false,
      icon: "/incentives/incubation.svg",
      iconS: "/incentives/incubation_s.svg",
    },
    {
      label: "Cash prize",
      name: "cashPrize",
      status: false,
      icon: "/incentives/cash.svg",
      iconS: "/incentives/cash_s.svg",
    },
    {
      label: "Test product on market",
      name: "testProductOnMarket",
      status: false,
      icon: "/incentives/test.svg",
      iconS: "/incentives/test_s.svg",
    },
    {
      label: "Equipments",
      name: "equipments",
      status: false,
      icon: "/incentives/equipment.svg",
      iconS: "/incentives/equipment_s.svg",
    },
    {
      label: "Trainings",
      name: "trainings",
      status: false,
      icon: "/incentives/training.svg",
      iconS: "/incentives/training_s.svg",
    },
    {
      label: "Other",
      name: "other",
      status: false,
      icon: "/incentives/other.svg",
      iconS: "/incentives/other_s.svg",
    },
  ]);
  // ...
  const checkHandler = (index) => {
    const incent = [...incentive];
    incent[index].status = !incent[index].status;
    setIncentive([...incent]);
  };
  // - Update Incentives
  const onUpdateIncentive = (inp) => {
    onInputChange({ incentive: { ...data.incentive, ...inp } });
  };
  // ...
  return (
    <Box className="Program ProgramIncentive">
      <Typography size="1.6rem" color="#9ca3af" face="Medium" m="0 0 2.7rem 0">
        {`${type} incentives are important to attract the best innovation talents.
        Make sure your ${type}'s incentives are aligned with the needs of your
        target audience.`}
      </Typography>
      <Box className="ProgramIncentive__list">
        {incentive.map((item, index) => {
          const status = item.status || data.incentive[item.name];
          return (
            <Box
              key={index}
              className="ProgramIncentive__cardBox"
              onClick={() => checkHandler(index)}
            >
              <Box
                className={cx("ProgramIncentive__card", {
                  "ProgramIncentive__card--checked": status,
                })}
              >
                {status ? (
                  <CheckCircleOutlineIcon
                    className="ProgramIncentive__check"
                    style={{ color: "#F9BF58", fontSize: "2.5rem" }}
                  />
                ) : null}

                <Box className="ProgramIncentive__img">
                  {!status ? <Svg src={item.icon} /> : <Svg src={item.iconS} />}
                </Box>
                <Typography
                  size="1.73rem"
                  color={status ? "#fff" : "#021c30"}
                  face="Medium"
                >
                  {item.label}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box>
        {incentive.map((item, index) =>
          item.status || data.incentive[item.name] ? (
            <EntryText
              key={index}
              label={item.label}
              placeholder={item.label}
              multiline
              rows={5}
              name={item.name}
              value={data.incentive[item.name]}
              onInputChange={onUpdateIncentive}
            />
          ) : null
        )}
      </Box>
    </Box>
  );
};

export default ProgramIncentive;
