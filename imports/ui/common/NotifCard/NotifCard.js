import "./style.scss";

import cx from "classnames";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";

import SVG from "../Svg";
import Typography from "../Typography";

const getMeta = (data) => {
  const meta = { icon: null, content: "", link: "" };
  // ...
  if (data.type === "oifa_welcome") {
    // Notif Welcome
    meta.icon = <SVG src="/notifications/01.svg" />;
    meta.content = "Welcome onboard! You’re now an OIFA member.";
  }
  if (data.type === "program_publish") {
    // Notif 72
    meta.icon = <SVG src="/notifications/72.svg" />;
    meta.content = `Congrats! ${data.progName} is successfully validated. Click here to check it out`;
    meta.link = `/dashboard/i/program-overview/${data.progId}`;
  }
  if (data.type === "program_new") {
    // Notif 77
    meta.icon = <SVG src="/notifications/77.svg" />;
    meta.content = `Check out this new challenge ${data.progName} launched by ${data.orgName}`;
    meta.link = `/dashboard/i/program-overview/${data.progId}`;
  }
  if (data.type === "solver_finish_application") {
    // Notif 82 - submitted application
    meta.icon = <SVG src="/notifications/77.svg" />;
    meta.content = "You application has been submitted successfully!";
  }
  if (data.type === "solver_deadline_application") {
    // Notif 82 - deadline
    meta.icon = <SVG src="/notifications/82_84_98_102_106.svg" />;
    meta.content = `Hurry up! few hours left to submit your application for ${data.progName} program!`;
  }
  if (data.type === "solver_application_declined") {
    // Notif 88
    meta.icon = <SVG src="/notifications/88.svg" />;
    meta.content = `Your application has been rejected for ${data.progName} program.`;
  }
  if (data.type === "solver_application_accepted") {
    // Notif 90
    meta.icon = <SVG src="/notifications/90.svg" />;
    meta.content = `GOOD NEWS! You have been shortlisted for ${data.progName} program.`;
  }
  if (data.type === "evaluator_new_program") {
    // Notif 94
    meta.icon = <SVG src="/notifications/94.svg" />;
    meta.content = `${data.orgName} has marked you as an evaluator for ${data.progName}.`;
  }
  if (data.type === "evaluator_deadline") {
    // Notif 98
    meta.icon = <SVG src="/notifications/82_84_98_102_106.svg" />;
    meta.content = `Hurry up! few hours left to evaluate your applications for ${data.progName} program!`;
  }
  if (data.type === "evaluator_new_evaluation") {
    // Notif 101
    meta.icon = <SVG src="/notifications/101.svg" />;
    meta.content = `${data.evaluatorName} evaluated an application! Click here to check`;
    meta.link = `/dashboard/programs/${data.progId}/applications/${data.appId}/evaluator/${data.evaluatorId}/evaluate`;
  }
  if (data.type === "program_applications_end") {
    // Notif 102
    meta.icon = <SVG src="/notifications/82_84_98_102_106.svg" />;
    meta.content = `Last few hours before applications closes for ${data.progName} program, Start preparing for the next steps.`;
    meta.link = `/dashboard/i/program-overview/${data.progId}`;
  }
  if (data.type === "program_evaluations_end") {
    // Notif 103
    meta.icon = <SVG src="/notifications/82_84_98_102_106.svg" />;
    meta.content = `Last few hours before evaluation closes for ${data.progName} program, Start preparing for the next steps.`;
    meta.link = `/dashboard/i/program-overview/${data.progId}`;
  }
  if (data.type === "program_selection_end") {
    // Notif 104
    meta.icon = <SVG src="/notifications/82_84_98_102_106.svg" />;
    meta.content = `Last few hours before selection closes for ${data.progName} program, Start preparing for the next steps.`;
    meta.link = `/dashboard/i/program-overview/${data.progId}`;
  }
  if (data.type === "program_applications_check") {
    // Notif 106
    meta.icon = <SVG src="/notifications/82_84_98_102_106.svg" />;
    meta.content = `Applications phase of ${data.progName} is closed. Click here to view application.`;
    meta.link = `/dashboard/programs/${data.progId}/applications`;
  }
  if (data.type === "program_updated") {
    // Notif 108
    meta.icon = <SVG src="/notifications/108.svg" />;
    meta.content = `${data.memberName} has updated information about ${data.progName}. Click here to view`;
    meta.link = `/dashboard/i/program-overview/${data.progId}`;
  }
  // ...
  return meta;
};

const NotifCard = ({ data, createdAt, notifSeen }) => {
  const history = useHistory();
  const { icon, content, link } = getMeta(data);
  const isSeen = createdAt >= notifSeen;
  // ...
  const handler = () => {
    if (!link) return;
    history.push(link);
  };
  // ...
  if (!content) return null;
  // ...
  return (
    <div
      className={cx(
        "NotifCard",
        { "NotifCard--seen": !!isSeen },
        { "NotifCard--link": !!link }
      )}
      onClick={handler}
    >
      <div className="NotifCard__content">
        <div className="NotifCard__icon">{icon}</div>
        <div className="NotifCard__para">
          <Typography color="#12152C" size="1.5rem" face="Book" height="1.9rem">
            {content}
          </Typography>
        </div>
      </div>
      <div
        className="NotifCard__time"
        title={moment(createdAt).format("DD MMMM YYYY, HH:mm:ss")}
      >
        <Typography
          color="#9CA3AF"
          size="1.12rem"
          height="1.9rem"
          fontWeight="500"
        >
          {moment(createdAt).format("ddd LT")}
        </Typography>
      </div>
    </div>
  );
};

export default NotifCard;
