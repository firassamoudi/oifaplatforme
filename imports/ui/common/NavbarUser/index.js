/* eslint-disable sonarjs/cognitive-complexity */
import "./style.scss";

import Box from "@material-ui/core/Box";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import cx from "classnames";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";

import EvaluatorCollection from "/imports/api/Evaluator";
import RoomCollection from "/imports/api/Room";
import SeekerCollection from "/imports/api/Seeker";
import SolverCollection from "/imports/api/Solver";
import history from "/imports/libs/history";

import Avatar from "../Avatar";
import Menu from "../Menu";
import MenuLike from "../MenuLike";
import NotifCard from "../NotifCard/NotifCard";
import ProfileDropHead from "../ProfileDropDown/ProfileDropHead/ProfileDropHead";
import ProfileDropItem from "../ProfileDropDown/ProfileDropItem/ProfileDropItem";
import Svg from "../Svg";
import Typography from "../Typography";

const NavbarUser = ({
  user,
  newMsg,
  // ...
  seeker,
  solver,
  evaluator,
  // ...
  isSeekerOwner,
  isSeekerSearcher,
  isSolverOwner,
  isEvaluatorOwner,
}) => {
  const imgId = seeker?.imgId ?? solver?.imgId;
  const userNotif =
    (seeker?.notifications ??
      solver?.notifications ??
      evaluator?.notifications) ||
    {};
  const notifSeen = userNotif?.seen;
  const notifications = (userNotif?.items ?? []).sort(
    (x, y) => y.createdAt - x.createdAt
  );
  const newNotif = !notifSeen || notifications?.[0]?.createdAt >= notifSeen;
  // ...
  const pathname = history.location.pathname;
  const activeMessage = pathname.indexOf("/dashboard/messages") > -1;
  const activeNotifs = pathname.indexOf("/dashboard/notifications") > -1;
  // ...
  const firstName = user?.profile?.firstName ?? "";
  const lastName = user?.profile?.lastName ?? "";
  const userName = `${firstName} ${lastName}`;
  const userLabel = `${firstName[0]}${lastName[0]}`;
  // ...
  const [selectOpen, setselectOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const handleClickAway = () => {
    setselectOpen(false);
  };
  const handleNotifMenu = (st) => {
    if (notifOpen) {
      // - Update lastSeen
      if (seeker) {
        Meteor.call("notification.seen.seeker", { seekerId: seeker._id });
      }
      if (solver) {
        Meteor.call("notification.seen.solver", { solverId: solver._id });
      }
      if (evaluator) {
        Meteor.call("notification.seen.evaluator", { evalId: evaluator._id });
      }
    }
    // ...
    setNotifOpen(st);
  };
  // ...
  const onNavMessages = () => {
    history.push("/dashboard/messages");
  };
  // ...
  const onUserLogout = () => {
    Meteor.logout();
    // Meteor.logoutOtherClients();
  };
  // ...
  return (
    <Box className="NavbarUser">
      {(isSeekerOwner || isSeekerSearcher || isSolverOwner) && (
        <Box
          className={cx("NavbarUser__link")}
          onClick={activeMessage ? null : onNavMessages}
        >
          <Box
            className={cx("NavbarUser__link__inner", {
              isActive: activeMessage,
            })}
          >
            {newMsg && <Box className="NavbarUser__link__newnew" />}
            <Svg src="/messages.svg" />
          </Box>
        </Box>
      )}

      {(isSeekerOwner || isSolverOwner || isEvaluatorOwner) && (
        <Box
          className={cx("NavbarUser__link NavbarUser__notif", {
            __active: activeNotifs,
          })}
        >
          <MenuLike
            title="Notifications"
            selectOpen={notifOpen}
            setselectOpen={handleNotifMenu}
            handleClickAway={() => handleNotifMenu(false)}
            options={notifications.map((notification) => {
              return {
                name: <NotifCard {...notification} notifSeen={notifSeen} />,
                handler: null,
              };
            })}
          >
            <Box
              className={cx("NavbarUser__link__inner", {
                isActive: notifOpen,
              })}
            >
              {newNotif && <Box className="NavbarUser__link__newnew" />}
              <Svg src="/notifications.svg" />
            </Box>
          </MenuLike>
        </Box>
      )}

      <Box className="NavbarUser__link NavbarUser__profile">
        <Menu
          selectOpen={selectOpen}
          setselectOpen={setselectOpen}
          handleClickAway={handleClickAway}
          title={isSeekerOwner ? <ProfileDropHead seeker={seeker} /> : null}
          options={[
            {
              name: <ProfileDropItem text="My dashboard" icon="/my.svg" />,
              handler: () => {
                history.push("/dashboard");
              },
            },
            {
              name: <ProfileDropItem text="Account settings" icon="/acc.svg" />,
              handler: () => {
                history.push("/dashboard/settings");
              },
            },
            {
              name: <ProfileDropItem text="Sign out" icon="/out.svg" />,
              handler: onUserLogout,
            },
          ]}
        >
          <Box className="NavbarUser__user">
            <Avatar label={userLabel} imgId={imgId} />
            <Typography
              color="#7c8799"
              face="Medium"
              size="1.5rem"
              height="1.5rem"
              style={{ margin: "0 1.3rem 0 1.1rem" }}
            >
              {userName}
            </Typography>
            <ArrowDropDownIcon
              style={{ color: "#7c8799", fontSize: "2.3rem" }}
            />
          </Box>
        </Menu>
      </Box>

      {/* LOL */}
      <Box style={{ height: 0, width: 0, overflow: "hidden" }}>
        <Svg src="/notifications.svg" />
        <Svg src="/notifications_active.svg" />
        <Svg src="/messages.svg" />
        <Svg src="/messages_active.svg" />
      </Box>
    </Box>
  );
};

export default withTracker((props) => {
  const userId = Meteor.userId();
  const user = Meteor.user();
  // ...
  let rooms = [];
  // ...
  let newMsg = false;
  const newNotif = false;
  // ...
  const handle = Meteor.subscribe("user-notifs");
  if (!handle.ready() || !user) {
    return { user, newMsg, newNotif, ...props };
  }
  // - RoomUpdates
  rooms = RoomCollection.find({}).fetch();
  rooms.forEach((room) => {
    const isUpdated = room.isUpdated();
    if (isUpdated) newMsg = true;
  });
  // - Seeker / Solver
  const seekerId = user.seekerId;
  const solverId = user.solverId;
  const evaluatorId = user.evaluatorId;
  // ...
  const seeker = SeekerCollection.findOne({ _id: seekerId });
  const solver = SolverCollection.findOne({ _id: solverId });
  const evaluator = EvaluatorCollection.findOne({ _id: evaluatorId });
  // ...
  const isAdmin = Roles.userIsInRole(userId, ["ADMIN_ADMIN", "ADMIN_MEMBER"]);
  const isSeekerOwner = Roles.userIsInRole(userId, ["SEEKER_OWNER"]);
  const isSeekerSearcher = Roles.userIsInRole(userId, ["SEEKER_SEARCHER"]);
  const isSolverOwner = Roles.userIsInRole(userId, ["SOLVER_OWNER"]);
  const isEvaluatorOwner = Roles.userIsInRole(userId, ["EVALUATOR_OWNER"]);
  // ...
  return {
    user,
    newMsg,
    newNotif,
    // ...
    seeker,
    solver,
    evaluator,
    // ...
    isAdmin,
    isSeekerOwner,
    isSeekerSearcher,
    isSolverOwner,
    isEvaluatorOwner,
    ...props,
  };
})(NavbarUser);
