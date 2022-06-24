import "./styles.scss";

import React from "react";

import SVG from "../../../../../common/Svg";

const ApplyMemberCard = ({ data, onEdit, onDelete }) => {
  return (
    <div className="ApplyMemberCard">
      <div className="ApplyMemberCard__title">{`${data.firstName} ${data.lastName}`}</div>
      <div className="ApplyMemberCard__position">{data.position}</div>
      <div className="ApplyMemberCard__linkedin">
        <a href={data.linkedinLink} target="__blank">
          <SVG src="/auth/signup/linkedin.svg" style={{ width: "100%" }} />
        </a>
      </div>
      <div className="ApplyMemberCard__actions">
        <div className="__btn" onClick={onEdit}>
          Edit
        </div>
        <div className="__sep" />
        <div className="__btn" onClick={onDelete}>
          Remove
        </div>
      </div>
    </div>
  );
};

export default ApplyMemberCard;
