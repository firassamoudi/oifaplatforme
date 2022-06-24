import "./style.scss";

import React from "react";

import Typography from "../../Typography";

const ProfileDropItem = (props) => {
  return (
    <div className="ProfileDropItem">
      <div className="ProfileDropItem__icon">
        <img src={props.icon} alt="" />
      </div>
      <Typography color="#021C30" face="Book" size="1.6rem">
        {props.text}
      </Typography>
    </div>
  );
};

export default ProfileDropItem;
