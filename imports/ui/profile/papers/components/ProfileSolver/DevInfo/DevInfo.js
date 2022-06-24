import React from "react";

import Typography from "../../../../../common/Typography";

const DevInfo = (props) => {
  return (
    <div className="DevInfo">
      <div className="DevInfo__section">
        <Typography size="1.4rem" color="#9CA3AF" face="Book" m="0 0 1.5rem 0">
          From
        </Typography>
        {props.connected ? (
          <Typography size="1.4rem" color="#434C5E" face="Medium">
            {`${props.city} , ${props.country}`}
          </Typography>
        ) : (
          <div className="text-hidden" />
        )}
      </div>
      <div className="DevInfo__section">
        <Typography size="1.4rem" color="#9CA3AF" face="Book" m="0 0 1.5rem 0">
          Portfolio
        </Typography>

        {props.connected ? (
          <Typography size="1.4rem" color="#03256C" face="Medium">
            {props.portfolioLink}
          </Typography>
        ) : (
          <div className="text-hidden" />
        )}
      </div>
      <div className="DevInfo__section">
        <Typography size="1.4rem" color="#9CA3AF" face="Book" m="0 0 1.5rem 0">
          Linkedin
        </Typography>
        {props.connected ? (
          <Typography size="1.4rem" color="#03256C" face="Medium">
            {props.linkedinLink}
          </Typography>
        ) : (
          <div className="text-hidden" />
        )}
      </div>
      <div className="DevInfo__section">
        <Typography size="1.4rem" color="#9CA3AF" face="Book" m="0 0 1.5rem 0">
          Phone number
        </Typography>
        {props.connected ? (
          <Typography size="1.4rem" color="#03256C" face="Medium">
            {props.phoneNumber}
          </Typography>
        ) : (
          <div className="text-hidden" />
        )}
      </div>
    </div>
  );
};

export default DevInfo;
