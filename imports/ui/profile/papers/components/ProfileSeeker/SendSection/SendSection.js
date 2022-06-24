import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import Avatar from "../../../../../common/Avatar";
import Button from "../../../../../common/Button";
import Typography from "../../../../../common/Typography";

const SendSection = ({ accepted, ...props }) => {
  // ...
  return (
    <>
      <Avatar
        label={props.avatar ?? ""}
        imgId={props.imgId}
        size="7rem"
        style={{
          width: "18.8rem",
          height: "18.8rem",
          borderRadius: "10px",
        }}
      />
      <Typography size="2.6rem" color="#021C30" face="Medium" m="2.5rem 0px">
        {props.org}
      </Typography>

      {props.isAdmin && (
        <Button
          disabled={accepted}
          className="SendSection__btn"
          onClick={props.onEditPlan}
        >
          {accepted && "Already aproved"}
          {!accepted && "Approve"}
        </Button>
      )}
    </>
  );
};

export default withTracker((props) => {
  const accepted = props.accepted;
  // ...
  return {
    accepted,
    ...props,
  };
})(SendSection);
