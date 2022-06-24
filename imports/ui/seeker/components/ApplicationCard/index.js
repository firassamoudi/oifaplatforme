import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import Avatar from "../../../common/Avatar";
import Country from "../../../common/Country";
import Menu from "../../../common/Menu";
import Typography from "../../../common/Typography";

const tooltipStyles = {
  className: "tool",
  type: "dark",
  place: "bottom",
  arrowColor: "#010d25",
  textColor: "#CDCFD4",
};

const ApplicationCard = ({ isCFA, data, program }) => {
  const history = useHistory();
  const userId = Meteor.userId();
  // ...
  const [selectOpen, setselectOpen] = useState(false);
  const handleClickAway = () => {
    setselectOpen(false);
  };
  // Solver data
  const solver = data.solver();
  const solverName = solver.getOrgName();
  const solverAvatar = solver.getAvatar();
  const imgId = solver?.imgId;
  // - Evaluations
  const evaluatorsId = program.evaluatorsId;
  const evaluatorsTotal = evaluatorsId.length;
  const evaluations = data.evaluations;
  const evaluationsTotal = data.evaluations.length;
  // ...
  const mark = evaluations.map((evaluation) => {
    const criteria = evaluation.criteria;
    const m = criteria.reduce((acc, t) => acc + t.value, 0);
    return m / criteria.length;
  });
  // ...
  const markTotal = mark.reduce((a, b) => a + b, 0);
  // ...
  const noteTotal = (markTotal / evaluationsTotal).toFixed(2);
  const evaluated = !!evaluatorsTotal && evaluatorsTotal === evaluationsTotal;
  const accepted = data.accepted;
  const evaluatedBySeeker = data.evaluated;

  // ...
  const applicationAccepted = () => {
    Meteor.call("application.accepted", { appId: data._id });
  };
  const applicationDeclined = () => {
    Meteor.call("application.declined", { appId: data._id });
  };
  const applicationEvaluate = () => {
    history.push(
      `/dashboard/programs/${program._id}/applications/${data._id}/view`
    );
  };
  const goNoViewCond = Roles.userIsInRole(userId, ["SEEKER_OWNER"]);
  const evalCond =
    evaluationsTotal &&
    Roles.userIsInRole(userId, ["SEEKER_OWNER", "SEEKER_CREATOR"]);
  // ...
  return (
    <Box className="ApplicationCard">
      <Box className="ApplicationCard__title">
        <Avatar label={solverAvatar} imgId={imgId} />
        <Typography size="1.4rem" face="Medium" m="0 0 0 2rem">
          {solverName}
        </Typography>
      </Box>

      <Box className="ApplicationCard__country">
        <Typography
          size="1.4rem"
          height="2rem"
          color="#23252C"
          face="Book"
          style={{ textTransform: "capitalize" }}
        >
          <Country value={solver.country} />
        </Typography>
      </Box>

      {/* <Box className="ApplicationCard__solution">
        <Typography size="1.4rem" height="2rem" color="#23252C" face="Book">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim
          leo nisl.
        </Typography>
      </Box> */}

      <Box
        className={cx("ApplicationCard__evaluation", {
          __completed: evaluated,
        })}
      >
        <Typography size="1.4rem" face="Book">
          {evaluated ? "Completed" : "Pending"}
        </Typography>
      </Box>

      <Box className="ApplicationCard__note">
        <Typography size="1.6rem" face="Medium">
          {!Number.isNaN(Number(noteTotal)) ? (
            <>
              {`${noteTotal} `}
              <span style={{ color: "#8993a8", fontSize: "1.5rem" }}>/ 5</span>
            </>
          ) : (
            " - "
          )}
        </Typography>
      </Box>

      <Box className="ApplicationCard__go">
        <Typography
          className="ApplicationCard__go__inner"
          size="1.4rem"
          height="2rem"
          face="Book"
        >
          {!evaluatedBySeeker && "-"}
          {evaluatedBySeeker && accepted && <Box className="__go">Go</Box>}
          {evaluatedBySeeker && !accepted && (
            <Box className="__no-go">No Go</Box>
          )}
        </Typography>
      </Box>

      <Box className="ApplicationCard__actions">
        {goNoViewCond && (
          <>
            <div data-tip data-for="go" onClick={applicationAccepted}>
              <img src="/assets/Go.svg" alt="go" />
            </div>
            <ReactTooltip id="go" {...tooltipStyles}>
              <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
                Accept application
              </Typography>
            </ReactTooltip>

            <div data-tip data-for="noGo" onClick={applicationDeclined}>
              <img src="/assets/No Go.svg" alt="noGo" />
            </div>
            <ReactTooltip id="noGo" {...tooltipStyles}>
              <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
                Decline application
              </Typography>
            </ReactTooltip>

            <div data-tip data-for="view" onClick={applicationEvaluate}>
              <img src="/assets/View application.svg" alt="view" />
            </div>
            <ReactTooltip id="view" {...tooltipStyles}>
              <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
                View Application
              </Typography>
            </ReactTooltip>
          </>
        )}
        {!!evalCond && (
          <>
            <div
              data-tip
              data-for="Evaluations"
              onClick={() => {
                history.push(
                  `/dashboard/${isCFA ? "call-for-applications" : "programs"}/${
                    program._id
                  }/applications/${data._id}/evaluations`
                );
              }}
            >
              <img src="/assets/Evaluate.svg" alt="Evaluations" />
            </div>
            <ReactTooltip id="Evaluations" {...tooltipStyles}>
              <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
                Evaluations
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
              name: "Accept application",
              roles: ["SEEKER_OWNER"],
              handler: applicationAccepted,
            },
            {
              name: "Decline application",
              roles: ["SEEKER_OWNER"],
              handler: applicationDeclined,
            },
            {
              name: "View Application",
              roles: ["SEEKER_OWNER"],
              handler: applicationEvaluate,
            },
            {
              name: "Evaluations",
              roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
              hasCond: true,
              cond: evaluationsTotal,
              handler: () => {
                history.push(
                  `/dashboard/${isCFA ? "call-for-applications" : "programs"}/${
                    program._id
                  }/applications/${data._id}/evaluations`
                );
              },
            },
          ]}
        /> */}
      </Box>
    </Box>
  );
};

export default ApplicationCard;
