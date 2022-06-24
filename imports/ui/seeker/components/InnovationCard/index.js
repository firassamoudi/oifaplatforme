import "./style.scss";

import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import SeekerCollection from "/imports/api/Seeker";
import { getOptionLabel } from "/imports/libs/inputs";

import Avatar from "../../../common/Avatar";
import Country from "../../../common/Country";
import Typography from "../../../common/Typography";

const InnovationCard = ({ data, isConnected }) => {
  const isStartup = data?.type === "Startup";
  const orgName = data?.getOrgName?.() ?? "";
  const orgAvatar = data?.getAvatar?.() ?? "";
  const imgId = data?.imgId;
  // ...
  return (
    <Box
      component="a"
      href={`/dashboard/i/solver-profile/${data._id}`}
      target="__blank"
      className="InnovationCard"
    >
      <Box className="InnovationCard__name">
        <Box className="InnovationCard__name__avatar">
          {isConnected ? <Avatar label={orgAvatar} imgId={imgId} /> : null}
        </Box>
        {isConnected ? (
          <Typography
            size="1.4rem"
            face="Medium"
            fontWeight="900"
            color="#061338"
            m="0 0 0 1.1rem"
          >
            {orgName}
          </Typography>
        ) : (
          <Box
            className="InnovationCard__hide"
            style={{ width: "60%", margin: "0 0 0 1.1rem" }}
          />
        )}
      </Box>
      <Box className="InnovationCard__country">
        <Typography
          size="1.4rem"
          color="#061338"
          face="Medium"
          align="center"
          style={{ textTransform: "capitalize" }}
        >
          <Country value={data.country} />
        </Typography>
      </Box>
      {isStartup && (
        <>
          <Box className="InnovationCard__maturity">
            <Typography
              size="1.4rem"
              color="#061338"
              face="Medium"
              align="center"
            >
              {getOptionLabel({
                optionsList: "maturities",
                value: data.maturityLevel,
              })}
            </Typography>
          </Box>
          <Box className="InnovationCard__sector">
            <Typography
              size="1.4rem"
              color="#061338"
              face="Medium"
              align="center"
            >
              {data.sector?.[0]?.label ?? ""}
            </Typography>
          </Box>
        </>
      )}

      {!isStartup && (
        <Box className="InnovationCard__xperiencia">
          <Typography size="1.4rem" color="#061338" face="Medium">
            {data.experience || data.expertise || data.internship}
          </Typography>
        </Box>
      )}

      <Box className="InnovationCard__capibilities">
        {data.capabilities.slice(0, 2).map((cap, index) => {
          return (
            <Chip
              key={index}
              className={`cap-chip cap-chip--${cap.value}`}
              label={cap.label}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default withTracker(({ data }) => {
  const user = Meteor.user();
  // ...
  const seekerId = user?.seekerId;
  const seeker = SeekerCollection.findOne({ _id: seekerId });
  const isConnected = seeker?.isConnectedToThisSolver?.(data?._id);
  return { data, seeker, isConnected };
})(InnovationCard);
