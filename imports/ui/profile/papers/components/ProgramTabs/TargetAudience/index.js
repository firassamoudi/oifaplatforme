import "./style.scss";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import React from "react";

import Typography from "../../../../../common/Typography";
import TargetAudienceCard from "./Card";

const TargetAudience = ({ id, data }) => {
  const targets = data.targetAudience || [];
  const maturity = data.maturityLevel || "";
  const capabilities = data.capabilities || [];
  // ...
  if (!data.targetAudience) {
    return <Box id={id} className="TargetAudience" />;
  }
  // ...
  return (
    <Box id={id} className="TargetAudience">
      <Typography face="Bold" color="#051438" size="2rem">
        Target audience
      </Typography>
      <Divider className="TargetAudience__divider" />

      <Box className="TargetAudienceList">
        {targets.map((item, index) => (
          <TargetAudienceCard
            key={index}
            {...item}
            maturity={maturity}
            capabilities={capabilities}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TargetAudience;
