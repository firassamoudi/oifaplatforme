import "./styles.scss";

import React from "react";

import SVG from "../../../../../../common/Svg";

const MemberCard = ({ data, onEdit, onDelete }) => {
  return (
    <div className="MemberCard">
      <div className="MemberCard__title">{`${data.firstName} ${data.lastName}`}</div>
      <div className="MemberCard__position">{data.position}</div>
      <div className="MemberCard__linkedin">
        <a href={data.linkedinLink} target="__blank">
          <SVG src="/auth/signup/linkedin.svg" style={{ width: "100%" }} />
        </a>
      </div>
      <div className="MemberCard__actions">
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

export default MemberCard;
