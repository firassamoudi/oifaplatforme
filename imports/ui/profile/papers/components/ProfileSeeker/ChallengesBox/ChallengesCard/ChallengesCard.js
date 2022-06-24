/* eslint-disable react/jsx-no-target-blank */
import "./style.scss";

import VisibilityIcon from "@material-ui/icons/Visibility";
import cx from "classnames";
import React from "react";

import ProgramTimeline from "/imports/libs/timeline";

import Typography from "../../../../../../common/Typography";

const ChallengesCard = (props) => {
  // - Timeline
  const timeline = new ProgramTimeline({ data: props.timeline });
  const current = timeline.current();
  const phaseRemains = timeline.phaseRemain();
  // ...
  return (
    <div className="ChallengesCard">
      <div className="ChallengesCard__inner">
        <div className="ChallengesCard__para">
          <Typography size="1.4rem" color="#061338" face="Medium">
            {props.title}
          </Typography>
        </div>

        <div className="ChallengesCard__status">
          <div
            className={cx("ChallengesCard__status-box", {
              "ChallengesCard__status-box--approved": props.accepted,
            })}
          >
            {props.accepted ? (
              <Typography face="Book" color="#26B8CC" size="1.4rem">
                Approved
              </Typography>
            ) : (
              <Typography face="Book" color="#FF8746" size="1.4rem">
                Needs review
              </Typography>
            )}
          </div>
        </div>
        <div className="ChallengesCard__timer">
          <Typography
            face="Medium"
            color="#061237"
            size="1.4rem"
            m="0 0 .5rem 0"
          >
            {current?.label ?? "Draft"}
          </Typography>
          <Typography face="Medium" color="#8993A8" size="1.2rem">
            {phaseRemains}
          </Typography>
        </div>
        <div className="ChallengesCard__view">
          <a
            href={`/dashboard/i/program-overview/${props._id}`}
            target="_blank"
          >
            <VisibilityIcon
              style={{
                fontSize: "2rem",
                color: "#ABB5C8",
                cursor: "pointer",
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChallengesCard;
