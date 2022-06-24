import React from "react";
import { useHistory } from "react-router-dom";

import RoomCollection from "/imports/api/Room";

import Avatar from "../../../../../common/Avatar";
import Button from "../../../../../common/Button";
import Typography from "../../../../../common/Typography";

const SendSection = (props) => {
  const history = useHistory();
  // ...
  const onSeekerConnectSolver = () => {
    Meteor.call("seeker.connect.solver", { data: { _id: props._id } });
  };
  const onSeekerOpenRoom = () => {
    const room = RoomCollection.findOne({
      "members.0._id": { $eq: props.seekerId },
      "members.1._id": { $eq: props._id },
    });
    // ...
    if (room) {
      history.push(`/dashboard/messages/${room._id}`);
    }
  };
  // ...
  const onAcceptSolver = () => {
    Meteor.call("user.admin.solver.accept", { data: { _id: props._id } });
  };
  // ...
  return (
    <>
      {props.isSeeker && props.connected && (
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
          <Typography size="2.6rem" color="#021C30" face="Medium" m="2.5rem 0">
            {props.org}
          </Typography>
          <Button
            className="SendSection__btn"
            onClick={onSeekerOpenRoom}
            style={{ margin: "0 0 1rem 0" }}
          >
            Send message
          </Button>
        </>
      )}
      {props.isSeeker && !props.connected && (
        <>
          <div className="avatar-hidden" />
          <div className="profile-name-hidden" />

          <Button
            className="SendSection__btn"
            disabled={!props.canMakeConnexion}
            onClick={onSeekerConnectSolver}
          >
            Connect
          </Button>
        </>
      )}

      {props.isAdmin && (
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
          <Typography size="2.6rem" color="#021C30" face="Medium" m="2.5rem 0">
            {props.org}
          </Typography>
          <Button
            disabled={props.accepted}
            className="SendSection__btn"
            onClick={onAcceptSolver}
            style={{ margin: "0 0 1rem 0" }}
          >
            {props.accepted && "Already aproved"}
            {!props.accepted && "Approve"}
          </Button>
        </>
      )}
    </>
  );
};

export default SendSection;
