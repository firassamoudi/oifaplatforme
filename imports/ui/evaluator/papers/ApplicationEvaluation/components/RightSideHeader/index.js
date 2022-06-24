/* eslint-disable sonarjs/cognitive-complexity */
import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import { timeSpent } from "/imports/libs/time";

import Avatar from "../../../../../common/Avatar";
import Typography from "../../../../../common/Typography";

const RightSideHeader = ({
  // canEvaluate,
  isLoading,
  isEvalNotStated,
  owner,
  data,
  onInputChange,
}) => {
  const submitted = data.submitted;
  // ...
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  // - Calc time
  const mills = (dateEnd - dateStart) / 1000;
  const hours = Math.trunc(mills / 3600);
  const minutes = Math.trunc((mills - hours * 3600) / 60);
  const seconds = Math.trunc(mills - (hours * 3600 + minutes * 60));
  // ...
  let time = "";
  if (hours > 0) time += `${hours} h, `;
  if (minutes > 0) time += `${minutes} min, `;
  time += seconds > 0 ? `${seconds} sec` : "0 sec";
  // - Submitted Time
  const submittedTime = timeSpent({
    start: data.dateStart,
    end: data.dateEnd,
  });
  // ...
  const firstName = owner.profile.firstName || "_";
  const lastName = owner.profile.lastName || "_";
  const avatar = `${firstName} ${lastName}`;
  // Inc Time
  const updateEvaluationTime = () => {
    setDateEnd(Date.now());
    Meteor.setTimeout(updateEvaluationTime, 1000);
  };
  // Sync Time
  useEffect(() => {
    if (isLoading || isEvalNotStated || !!submitted) return;
    onInputChange({
      dateStart,
      dateEnd,
    });
  }, [dateStart, dateEnd]);
  // ...
  useEffect(() => {
    if (isLoading || isEvalNotStated || !!submitted) return;
    setDateStart(Date.now());
    setDateEnd(Date.now());
    Meteor.setTimeout(updateEvaluationTime, 1000);
  }, [isLoading, submitted]);
  // ...
  useEffect(() => {
    // - Hide Progressbar
    const progBar = document.querySelector("body #nprogress");
    if (progBar) {
      progBar.style = "display:none;";
    }
  });
  // ...
  return (
    <Box className="ApplicationEvaluation__eval__header">
      <Box style={{ height: "5rem" }}>
        <Typography
          size="1.5rem"
          color="#1A1A1A"
          face="Medium"
          style={{ margin: "0 0 0.7rem 0" }}
        >
          Evaluation Time
        </Typography>
        {isEvalNotStated && (
          <Typography size="1.5rem" color="rgb(137, 147, 168)" face="Medium">
            Evaluation phase has not started yet
          </Typography>
        )}
        {!isEvalNotStated && submitted && (
          <Typography size="1.5rem" color="rgb(137, 147, 168)" face="Medium">
            {submittedTime}
          </Typography>
        )}
        {!isEvalNotStated && !submitted && (
          <Typography size="1.5rem" color="rgb(137, 147, 168)" face="Medium">
            {time}
          </Typography>
        )}
      </Box>
      <Avatar
        label={avatar}
        style={{
          width: "5.5rem",
          height: "5.5rem",
        }}
      />
    </Box>
  );
};

export default RightSideHeader;
