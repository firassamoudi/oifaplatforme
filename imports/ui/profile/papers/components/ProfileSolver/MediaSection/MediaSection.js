import React from "react";

import Typography from "../../../../../common/Typography";

const MediaSection = (props) => {
  return (
    <>
      <div className="SolverProfile__media__sub">
        <Typography
          size="1.6rem"
          color="#021C30"
          face="Medium"
          m="0 0 1.5rem 0"
        >
          Pitch deck Link
        </Typography>
        {props.connected ? (
          <Typography size="1.4rem" color="#03256C" face="Medium">
            {props.pitchDeck}
          </Typography>
        ) : (
          <div className="text-hidden" />
        )}
      </div>
      <div className="SolverProfile__media__sub">
        <Typography
          size="1.6rem"
          color="#021C30"
          face="Medium"
          m="0 0 1.5rem 0"
        >
          Link to demo
        </Typography>

        {props.connected ? (
          <Typography size="1.4rem" color="#03256C" face="Medium">
            {props.demoLink}
          </Typography>
        ) : (
          <div className="text-hidden" />
        )}
      </div>
    </>
  );
};

export default MediaSection;
