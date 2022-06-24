import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";

import ApplicationCollection from "/imports/api/Application";

import Avatar from "../../../common/Avatar";
import Country from "../../../common/Country";
import Menu from "../../../common/Menu";
import Typography from "../../../common/Typography";

const WorkplaceInnovationCard = ({ data, application }) => {
  const orgName = data?.getOrgName?.() ?? "";
  const orgAvatar = data?.getAvatar?.() ?? "";
  const imgId = data?.imgId;
  const dropped = application?.dropped;
  // ...
  const [selectOpen, setselectOpen] = useState(false);
  const handleClickAway = () => {
    setselectOpen(false);
  };
  // ...
  const onDrop = () => {
    Meteor.call("application.dropped", { appId: application._id });
  };
  const onDropBack = () => {
    Meteor.call("application.droppedBack", { appId: application._id });
  };
  // ...
  return (
    <Box className="WorkplaceInnovationCard">
      <Box className="WorkplaceInnovationCard__name">
        <Box className="WorkplaceInnovationCard__name__avatar">
          <Avatar label={orgAvatar} imgId={imgId} />
        </Box>
        <Typography
          size="1.4rem"
          face="Medium"
          fontWeight="900"
          color="#061338"
          m="0 0 0 1.1rem"
        >
          {orgName}
        </Typography>
      </Box>
      <Box className="WorkplaceInnovationCard__country">
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
      <Box className="WorkplaceInnovationCard__category">
        <Typography size="1.4rem" color="#061338" face="Medium" align="center">
          {data.type}
        </Typography>
      </Box>
      <Box className="WorkplaceInnovationCard__sector">
        <Typography size="1.4rem" color="#061338" face="Medium" align="center">
          {dropped ? "Eliminated" : "On Going"}
        </Typography>
      </Box>
      <Box className="WorkplaceInnovationCard__actions">
        <Menu
          selectOpen={selectOpen}
          setselectOpen={setselectOpen}
          handleClickAway={handleClickAway}
          options={[
            {
              name: !dropped ? "Eliminate" : "Re-approve",
              handler: !dropped ? onDrop : onDropBack,
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default withTracker(({ data }) => {
  const application = ApplicationCollection.findOne({ solverId: data?._id });
  // ...
  return {
    data,
    application,
  };
})(WorkplaceInnovationCard);
