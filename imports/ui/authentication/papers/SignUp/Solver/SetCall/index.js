import "./style.scss";

import Box from "@material-ui/core/Box";
import { Meteor } from "meteor/meteor";
import React from "react";
import { CalendlyEventListener, InlineWidget } from "react-calendly";

import LoadingDots from "/imports/ui/common/LoadingDots";

const SetCall = ({ onInputChange }) => {
  const url = Meteor.settings.public.CALENDLY_URL;
  // ...
  const onEventScheduled = (e, data) => {
    onInputChange({ booked: true });
  };
  // ...
  return (
    <Box className="SetCall">
      <Box className="SetCall__loading">
        <Box className="SetCall__loading__inner">
          <LoadingDots />
        </Box>
      </Box>
      <CalendlyEventListener onEventScheduled={onEventScheduled}>
        <Box
          className="SetCall__inner"
          component="iframe"
          src={url}
          frameBorder="0"
        />
      </CalendlyEventListener>
    </Box>
  );
};

export default SetCall;
