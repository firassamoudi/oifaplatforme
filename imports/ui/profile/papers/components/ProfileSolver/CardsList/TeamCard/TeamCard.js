import cx from "classnames";
import React from "react";

import Typography from "../../../../../../common/Typography";

const TeamCard = (props) => {
  return (
    <div className={cx("TeamCard", { "TeamCard--hidden": !props.connected })}>
      {props.connected ? (
        <>
          <Typography size="1.6rem" color="#021C30" face="Medium">
            {props.name}
          </Typography>
          <Typography
            size="1.3rem"
            color="#88929F"
            face="Medium"
            m=".6rem 0 0 0"
          >
            {props.pos}
          </Typography>
          <a
            className="TeamCard__btn"
            href={`https://${props.linked}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="TeamCard__btn__box">
              <img src="/auth/signup/linkedin.svg" alt="" />
            </div>
          </a>
        </>
      ) : (
        <>
          <div className="text-hidden" />
          <div className="text-hidden-s" />
        </>
      )}
    </div>
  );
};

export default TeamCard;
