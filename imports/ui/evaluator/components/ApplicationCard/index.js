import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import ProgramTimeline from "/imports/libs/timeline";

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

const EvaluatorApplicationCard = ({ userId, data, program }) => {
  const history = useHistory();
  // ...
  const [selectOpen, setselectOpen] = useState(false);
  const handleClickAway = () => {
    setselectOpen(false);
  };
  // - Timeline
  const timeline = new ProgramTimeline({ data: program?.timeline });
  const evalPhase = timeline.getPhase("evaluations");
  const dateNow = Date.now();
  const isEvalEnded = dateNow > evalPhase.end;
  // - Evaluator
  const evaluations = data.evaluations.filter((ev) => {
    return userId === ev.ownerId;
  });
  const evaluation = evaluations[0] || { criteria: [] };
  const criteria = evaluation.criteria;
  // ...
  const isEvaluated = !!evaluation && !!criteria.length;
  const value = criteria.reduce((t, x) => t + x.value, 0);
  const note = (value / criteria.length).toFixed(2);

  // - Solver data
  const solver = data.solver();
  const orgName = solver.getOrgName();
  const orgAvatar = solver.getAvatar();
  const imgId = solver.imgId;
  // ...
  return (
    <Box className="EvaluatorApplicationCard">
      <Box className="EvaluatorApplicationCard__title">
        <Avatar label={orgAvatar} imgId={imgId} />
        <Typography size="1.4rem" face="Medium" m="0 0 0 2rem">
          {orgName}
        </Typography>
      </Box>

      <Box className="EvaluatorApplicationCard__country">
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

      <Box className="EvaluatorApplicationCard__solution">
        <Typography size="1.4rem" height="2rem" color="#23252C" face="Book">
          {data?.solution?.["proposed-solution"]?.answer ?? "N/A"}
        </Typography>
      </Box>

      <Box
        className={cx("EvaluatorApplicationCard__evaluation", {
          __completed: isEvaluated,
        })}
      >
        <Typography size="1.4rem" face="Book">
          {isEvaluated && "Completed"}
          {!isEvaluated && "Pending"}
        </Typography>
      </Box>
      <Box className="EvaluatorApplicationCard__note">
        <Typography size="1.6rem" face="Medium">
          {!Number.isNaN(Number(note)) ? (
            <>
              {`${note} `}
              <span style={{ color: "#8993a8", fontSize: "1.5rem" }}>/ 5</span>
            </>
          ) : (
            " - "
          )}
        </Typography>
      </Box>

      <Box className="EvaluatorApplicationCard__actions">
        <div
          data-tip
          data-for="View"
          onClick={() => {
            history.push(
              `/dashboard/programs/${program._id}/applications/${data._id}/evaluate`
            );
          }}
        >
          <img src="/assets/Application.svg" alt="application" />
        </div>
        <ReactTooltip id="View" {...tooltipStyles}>
          <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
            View applications
          </Typography>
        </ReactTooltip>
        {!isEvalEnded && <></>}

        {/* {!isEvalEnded && (
          <Menu
            selectOpen={selectOpen}
            setselectOpen={setselectOpen}
            handleClickAway={handleClickAway}
            options={[
              {
                name: isEvaluated ? "View" : "Evaluate",
                roles: ["EVALUATOR_OWNER"],
                handler: () => {
                  history.push(
                    `/dashboard/programs/${program._id}/applications/${data._id}/evaluate`
                  );
                },
              },
            ]}
          />
        )} */}
      </Box>
    </Box>
  );
};

export default EvaluatorApplicationCard;
