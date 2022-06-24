import "./style.scss";

import { Box } from "@material-ui/core";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { withRouter } from "react-router";
import { useHistory } from "react-router-dom";
import ScrollArea from "react-scrollbars-custom";

import ProgramsCollection from "/imports/api/Program";
import ProgramTimeline from "/imports/libs/timeline";

import Button from "../../../../common/Button";
import NavLink from "../../../../common/NavLink";
import Typography from "../../../../common/Typography";
import ApplicationCard from "../../../components/ApplicationCard";
import TitleDot from "../../../components/TitleDot";

const tableCols = [
  {
    label: "Name",
    className: "col col--name",
  },
  {
    label: "Country",
    className: "col col--country",
  },
  // {
  //   label: "Solution",
  //   className: "col col--solution",
  // },
  {
    label: "Evaluation",
    className: "col col--evaluation",
  },
  {
    label: "Note",
    className: "col col--note",
  },
  {
    label: "status",
    className: "col col--go",
  },
  {
    label: "",
    className: "__col __col--actions",
  },
];

const Applications = ({ userId, program = {}, applications = [] }) => {
  const history = useHistory();
  const pathName = history.location.pathname;
  const isCFA = pathName.indexOf("call-for-applications") > -1;
  // - WorkPlace
  const workplace = program.workplace ? program.workplace() : {};
  const workplaceHasRole = Roles.userIsInRole(userId, [
    "SEEKER_OWNER",
    "SEEKER_CREATOR",
  ]);
  // - Timeline
  const timeline = new ProgramTimeline({ data: program?.timeline ?? [] });
  const isWorkplace = timeline.isWorkplace();
  // - Applications
  // ...
  const onNavWorkplace = () => {
    history.push(`/dashboard/workplace/${workplace._id}`);
  };
  // ...
  return (
    <Box className="Applications">
      <Box className="Applications__header">
        <Typography
          size="1.8rem"
          color="#021c30"
          face="Bold"
          style={{ display: "flex", alignItems: "center" }}
        >
          <NavLink
            to={`/dashboard/${isCFA ? "call-for-applications" : "programs"}`}
          >
            {isCFA ? "CFAs" : "Programs"}
          </NavLink>
          <TitleDot />
          {program.title}
          <TitleDot />
          Applications
        </Typography>
        {workplaceHasRole && (
          <Box>
            <Button disabled={!isWorkplace} onClick={onNavWorkplace}>
              Workplace
            </Button>
          </Box>
        )}
      </Box>

      <Box className="Applications__table">
        <Box className="Applications__table__cols">
          <Typography
            name="div"
            size="1.2rem"
            color="#8993a8"
            face="Medium"
            style={{
              textTransform: "uppercase",
              display: "flex",
              width: "100%",
            }}
          >
            {tableCols.map((tab, index) => (
              <Box key={index} component="span" className={tab.className}>
                {tab.label}
              </Box>
            ))}
          </Typography>
        </Box>

        <Box className="Applications__table__body">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <Box className="Applications__table__body__inner">
              {applications.map((data) => (
                <Box key={data._id}>
                  <ApplicationCard
                    data={data}
                    isCFA={isCFA}
                    program={program}
                  />
                </Box>
              ))}
            </Box>
          </ScrollArea>
        </Box>
      </Box>
    </Box>
  );
};

export default withRouter(
  withTracker((props) => {
    const user = Meteor.user();
    const userId = Meteor.userId();
    const progId = props.match.params.id;
    const handle = Meteor.subscribe("program-applications", {
      programId: progId,
    });
    if (!handle.ready()) {
      return { user, userId, program: {}, applications: [] };
    }
    const program = ProgramsCollection.findOne(progId);
    let applications = [];
    if (program) {
      applications = program.applications();
    }
    // ...
    return {
      user,
      userId,
      program,
      applications,
    };
  })(Applications)
);
