import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import moment from "moment";
import React from "react";

import Typography from "../../../common/Typography";

const AdminSubscriberCard = ({ userId, data }) => {
  // ...
  return (
    <Box className="AdminSubscriberCard">
      <Typography
        className="AdminSubscriberCard__email"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {data.email}
      </Typography>

      <Typography
        className="AdminSubscriberCard__date"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {moment(data.date).format("DD MMMM YYYY, HH:mm:ss")}
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
})(AdminSubscriberCard);
