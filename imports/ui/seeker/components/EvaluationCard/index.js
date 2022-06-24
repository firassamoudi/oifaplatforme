import "./style.scss";

import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import { timeSpent } from "/imports/libs/time";

import Avatar from "../../../common/Avatar";
import Menu from "../../../common/Menu";
import Typography from "../../../common/Typography";

const tooltipStyles = {
  className: "tool",
  type: "dark",
  place: "bottom",
  arrowColor: "#010d25",
  textColor: "#CDCFD4",
};

const EvaluationCard = ({ data, progId, appId }) => {
  const history = useHistory();
  const userId = Meteor.userId();
  // - Evaluation
  const owner = Meteor.users.findOne({ _id: data.ownerId });
  const ownerFirstName = owner.profile.firstName;
  const ownerLastName = owner.profile.lastName;
  // ...
  const evaluation = data || { criteria: [] };
  const criteria = evaluation.criteria;
  const value = criteria.reduce((t, x) => t + x.value, 0);
  const note = (value / criteria.length).toFixed(2);
  const time = timeSpent({
    start: evaluation.dateStart,
    end: evaluation.dateEnd,
  });
  // ...
  const [selectOpen, setselectOpen] = useState(false);
  const handleClickAway = () => {
    setselectOpen(false);
  };
  const viewCond = Roles.userIsInRole(userId, [
    "SEEKER_OWNER",
    "SEEKER_CREATOR",
    "SEEKER_SEARCHER",
  ]);
  // ...
  return (
    <>
      <Box className="EvaluationCard">
        <Box
          className="EvaluationCard__evaluator"
          display="flex"
          alignItems="center"
        >
          <Avatar
            label={`${ownerFirstName} ${ownerLastName}`}
            size="1.4rem"
            color="#e55934"
            bg="rgba(229, 89, 52, 0.1)"
          />
          <Typography
            size="1.6rem"
            color="#23252C"
            face="Medium"
            m="0 0 0 1.6rem"
          >
            {`${ownerFirstName} ${ownerLastName}`}
          </Typography>
        </Box>
        <Box
          className="EvaluationCard__note"
          display="flex"
          alignItems="center"
        >
          <Typography
            size="1.6rem"
            color="#23252C"
            face="Medium"
            align="center"
            style={{
              width: "100%",
            }}
          >
            {!Number.isNaN(Number(note)) ? (
              <>
                {`${note} `}
                <span style={{ color: "#8993a8", fontSize: "1.5rem" }}>
                  / 5
                </span>
              </>
            ) : (
              " - "
            )}
          </Typography>
        </Box>
        <Box
          className="EvaluationCard__time"
          display="flex"
          alignItems="center"
        >
          <Typography
            size="1.6rem"
            color="#23252C"
            face="Medium"
            align="center"
            style={{
              width: "100%",
            }}
          >
            {time}
          </Typography>
        </Box>
        <Box className="EvaluationCard__actions">
          {viewCond && (
            <>
              <div
                data-tip
                data-for="view"
                onClick={() => {
                  history.push(
                    `/dashboard/programs/${progId}/applications/${appId}/evaluator/${data.ownerId}/evaluate`
                  );
                }}
              >
                <img src="/assets/View.svg" alt="view" />
              </div>
              <ReactTooltip id="view" {...tooltipStyles}>
                <Typography
                  name="span"
                  size="1.4rem"
                  color="#CDCFD4"
                  face="Book"
                >
                  View
                </Typography>
              </ReactTooltip>
            </>
          )}
          {/* <Menu
            selectOpen={selectOpen}
            setselectOpen={setselectOpen}
            handleClickAway={handleClickAway}
            options={[
              {
                name: "View",
                roles: ["SEEKER_OWNER", "SEEKER_CREATOR", "SEEKER_SEARCHER"],
                handler: () => {
                  history
                  .push(
                    `/dashboard/programs
                    /${progId}/applications/${appId}/evaluator/${data.ownerId}/evaluate`
                  );
                },
              },
            ]}
          /> */}
        </Box>
      </Box>
    </>
  );
};

export default EvaluationCard;
