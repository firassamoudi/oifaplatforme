import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import { getOptionLabel } from "/imports/libs/inputs";

import Typography from "../../../../../../common/Typography";

const icons = {
  Startup: "/solverTypes/startup.jpg",
  Designer: "/solverTypes/designer.jpg",
  Developer: "/solverTypes/developer.jpg",
  Student: "/solverTypes/student.jpg",
  Researcher: "/solverTypes/researcher.jpg",
};

const TargetAudienceCard = ({ label, maturity, capabilities }) => {
  // ...
  return (
    <Box className="TargetAudienceCard">
      <Box className="TargetAudienceCard__img">
        <Box component="img" src={icons[label]} />
      </Box>
      <Box className="TargetAudienceCard__info">
        <Box>
          <Typography face="Bold" color="#051438" size="2rem" m="0 0 0.7rem 0">
            {label}
          </Typography>
          <Typography face="Medium" color="#838FA7" size="1.6rem">
            {getOptionLabel({ optionsList: "maturities", value: maturity })}
          </Typography>
          <Box className="TargetAudienceCard__capabilities">
            {capabilities.map((item, index) => {
              return (
                <Box key={index} className="TargetAudienceCard__capability">
                  <Typography size="1.4rem" face="Medium" color="#10161A">
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TargetAudienceCard;
