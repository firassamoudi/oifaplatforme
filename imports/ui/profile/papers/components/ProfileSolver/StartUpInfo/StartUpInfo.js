import Box from "@material-ui/core/Box";
import moment from "moment";
import React from "react";

import Typography from "../../../../../common/Typography";

const StartUpInfo = (props) => {
  return (
    <div className="SolverProfile__info">
      <div className="SolverProfile__info__sub">
        <Box display="flex" justifyContent="space-between" mb="2.5rem">
          <Typography size="1.4rem" color="#9CA3AF" face="Book">
            From
          </Typography>
          <Typography size="1.4rem" color="#434C5E" face="Medium">
            {`${props.city}, ${props.country}`}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="2.5rem">
          <Typography size="1.4rem" color="#9CA3AF" face="Book">
            Founded
          </Typography>
          <Typography size="1.4rem" color="#434C5E" face="Medium">
            {moment(props.foundedDate).format("YYYY")}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mb="2.5rem">
          <Typography size="1.4rem" color="#9CA3AF" face="Book">
            Website
          </Typography>
          {props.connected ? (
            <Typography size="1.4rem" color="#434C5E" face="Medium">
              {props.portfolioLink || props.websiteLink}
            </Typography>
          ) : (
            <div className="text-hidden" />
          )}
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography size="1.4rem" color="#9CA3AF" face="Book">
            Phone number
          </Typography>
          {props.connected ? (
            <Typography size="1.4rem" color="#434C5E" face="Medium">
              {props.phoneNumber}
            </Typography>
          ) : (
            <div className="text-hidden" />
          )}
        </Box>
      </div>
      <div className="SolverProfile__info__sub">
        <Typography
          size="1.6rem"
          color="#021C30"
          face="Medium"
          m="0 0 1.5rem 0"
        >
          Sector
        </Typography>
        <Typography name="div" size="1.4rem" color="#434C5E" face="Medium">
          {props.sector.map((sector, index, sectors) => {
            return (
              <div
                key={index}
                style={{
                  display: "inline-block",
                }}
              >
                {`${sector.label} ${sectors.length - 1 !== index ? "," : ""}`}
              </div>
            );
          })}
        </Typography>
      </div>
      <div className="SolverProfile__info__sub">
        <Typography
          size="1.6rem"
          color="#021C30"
          face="Medium"
          m="0 0 1.5rem 0"
        >
          Maturity level
        </Typography>
        <Typography size="1.4rem" color="#434C5E" face="Medium">
          {props.maturityLevel}
        </Typography>
      </div>
    </div>
  );
};

export default StartUpInfo;
