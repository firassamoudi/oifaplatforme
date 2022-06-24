import React from "react";

import Typography from "../../../../../common/Typography";

const Track = (props) => {
  return (
    <>
      <Typography size="1.6rem" color="#021C30" face="Medium" m="0 0 2.4rem 0">
        Track records
      </Typography>
      <div className="SolverProfile__track__sub">
        <div className="SolverProfile__track__item">
          <Typography size="1.4rem" color="#9CA3AF" face="Book">
            Number of clients
          </Typography>
          <Typography size="1.4rem" color="#434C5E" face="Medium">
            {props.trackRecordNbClient}
          </Typography>
        </div>
        <div className="SolverProfile__track__item">
          <Typography size="1.4rem" color="#9CA3AF" face="Book">
            Name of Clients
          </Typography>
          <Typography size="1.4rem" color="#434C5E" face="Medium">
            {props.trackRecordClientsPartners}
          </Typography>
        </div>
        <div className="SolverProfile__track__item">
          <Typography size="1.4rem" color="#9CA3AF" face="Book">
            Size of community
          </Typography>
          <Typography size="1.4rem" color="#434C5E" face="Medium">
            {props.trackRecordCommunitySize}
          </Typography>
        </div>
        <div className="SolverProfile__track__item">
          <Typography size="1.4rem" color="#9CA3AF" face="Book">
            Revenue
          </Typography>
          <Typography size="1.4rem" color="#434C5E" face="Medium">
            {props.trackRecordRevenue}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default Track;
