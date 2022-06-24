/* eslint-disable sonarjs/cognitive-complexity */
import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import SolverCollection from "/imports/api/Solver";
import { getOptionLabel } from "/imports/libs/inputs";
import ProgramTimeline from "/imports/libs/timeline";

import Menu from "../../../common/Menu";
import PieChart from "../../../common/PieChart";
import Typography from "../../../common/Typography";
import ProgramsCardDeleteModal from "../ProgramsCardDeleteModal";

const tooltipStyles = {
  className: "tool",
  type: "dark",
  place: "bottom",
  arrowColor: "#010d25",
  textColor: "#CDCFD4",
};

const ProgramsCard = ({
  isCfa,
  data,
  applications,
  setModalEvaluators,
  setModalEvaluatorsData,
  // ...
  noEvaluators,
}) => {
  const history = useHistory();
  const userId = Meteor.userId();

  // ...
  const [selectOpen, setselectOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  // ...
  const handleClickAway = () => {
    setselectOpen(false);
  };
  const onDeleteProgram = () => {
    Meteor.call("program.delete", { id: data._id }, () => {
      setDeleteModal(false);
    });
  };

  // - Contries
  const hasApplications = !!applications.length;
  // Applications - Countries
  const countries = [["", ""]];
  if (hasApplications) {
    // getOptionLabel
    const cns = applications.map((app) => app.country);
    const calcs = _.countBy(cns, (value) => {
      return getOptionLabel({ optionsList: "countriesOptions", value });
    });
    // ...
    Object.keys(calcs).forEach((k) => {
      countries.push([k, calcs[k]]);
    });
  }
  // Applications - Applicants
  const applicants = [["", ""]];
  if (hasApplications) {
    // getOptionLabel
    const cns = applications.map((app) => {
      const solver = SolverCollection.findOne(app.solverId);
      return solver.type;
    });
    const calcs = _.countBy(cns, (value) => value);
    // ...
    Object.keys(calcs).forEach((k) => {
      applicants.push([k, calcs[k]]);
    });
  }
  // - Timeline
  const timeline = new ProgramTimeline({ data: data.timeline });
  const phases = timeline.phases;
  const current = timeline.current();
  const isPhaseWorkplace = timeline.isWorkplace();
  const phaseRemains = timeline.phaseRemain();
  // - Workplace
  const workplace = data.workplace();
  // ...
  const editCond = Roles.userIsInRole(userId, [
    "SEEKER_OWNER",
    "SEEKER_CREATOR",
  ]);

  const viewAppcond =
    hasApplications &&
    Roles.userIsInRole(userId, ["SEEKER_OWNER", "SEEKER_CREATOR"]);

  const workPlaceCond =
    isPhaseWorkplace &&
    Roles.userIsInRole(userId, ["SEEKER_OWNER", "SEEKER_CREATOR"]);
  const evalCond =
    noEvaluators &&
    Roles.userIsInRole(userId, ["SEEKER_OWNER", "SEEKER_CREATOR"]);
  const delCond = Roles.userIsInRole(userId, ["SEEKER_OWNER"]);
  // ...
  return (
    <Box className="ProgramsCard">
      <Typography
        className="ProgramsCard__title"
        size="1.6rem"
        color="#061338"
        face="Bold"
      >
        {data.title || "Untitled"}
      </Typography>
      <Typography
        className="ProgramsCard__visitors"
        size="2rem"
        color="#061338"
        face="Bold"
      >
        {data.visitors}
      </Typography>
      <Typography
        className="ProgramsCard__applications"
        size="2rem"
        color="#061338"
        face="Bold"
      >
        {applications.length}
      </Typography>
      <Box className="ProgramsCard__countries">
        {!hasApplications && <Box className="ProgramsCard__countries__empty" />}
        {hasApplications && <PieChart data={countries} />}
      </Box>
      <Box className="ProgramsCard__applicants">
        {!hasApplications && (
          <Box className="ProgramsCard__applicants__empty" />
        )}
        {hasApplications && <PieChart data={applicants} />}
      </Box>
      <Box className="ProgramsCard__status">
        <Typography
          size="2.2rem"
          color="#061237"
          face="Bold"
          align="center"
          style={{ textTransform: "capitalize", whiteSpace: "nowrap" }}
        >
          {current?.label ?? "Draft"}
        </Typography>
        <Typography face="Book" size="1.4rem" color="#8993a8" align="center">
          {phaseRemains}
        </Typography>
        <Box className="ProgramsCard__status__phaseBox">
          {phases.map((phase, index) => {
            return (
              <Box
                key={index}
                className={cx("ProgramsCard__status__phaseBox__phase", {
                  __inprogress:
                    phase.start && phase.end && phase.isIn && !phase.isOut,
                  __done: phase.start && phase.end && phase.isOut,
                })}
              />
            );
          })}
        </Box>
      </Box>
      <Box className="ProgramsCard__actions">
        {editCond && (
          <>
            <div
              data-tip
              data-for="Edit"
              onClick={() => {
                history.push(
                  `/dashboard/${isCfa ? "call-for-applications" : "programs"}/${
                    data._id
                  }/${isCfa ? "cfa" : "program"}-details`
                );
              }}
            >
              <img src="/assets/Edit.svg" alt="Edit" />
            </div>
            <ReactTooltip id="Edit" {...tooltipStyles}>
              <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
                {`Edit ${isCfa ? "CFA" : "program"}`}
              </Typography>
            </ReactTooltip>
          </>
        )}

        <div
          data-tip
          data-for="View"
          onClick={() => {
            window.open(
              `/dashboard/i/${isCfa ? "cfa-overview" : "program-overview"}/${
                data._id
              }`
            );
          }}
        >
          <img src="/assets/view program.svg" alt="View" />
        </div>
        <ReactTooltip id="View" {...tooltipStyles}>
          <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
            {`View ${isCfa ? "CFA" : "program"}`}
          </Typography>
        </ReactTooltip>

        {viewAppcond && (
          <>
            <div
              data-tip
              data-for="ViewApp"
              onClick={() => {
                history.push(
                  `/dashboard/${isCfa ? "call-for-applications" : "programs"}/${
                    data._id
                  }/applications`
                );
              }}
            >
              <img src="/assets/View application.svg" alt="ViewApp" />
            </div>
            <ReactTooltip id="ViewApp" {...tooltipStyles}>
              <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
                View applications
              </Typography>
            </ReactTooltip>
          </>
        )}

        {workPlaceCond && (
          <>
            <div
              data-tip
              data-for="ViewWork"
              onClick={() => {
                history.push(`/dashboard/workplace/${workplace._id}`);
              }}
            >
              <img src="/assets/Workplace.svg" alt="ViewWork" />
            </div>
            <ReactTooltip id="ViewWork" {...tooltipStyles}>
              <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
                View workplace
              </Typography>
            </ReactTooltip>
          </>
        )}
        {evalCond && (
          <>
            <div
              data-tip
              data-for="eval"
              onClick={() => {
                setModalEvaluators(true);
                setModalEvaluatorsData(data._id);
              }}
            >
              <img src="/assets/Evaluate.svg" alt="eval" />
            </div>
            <ReactTooltip id="eval" {...tooltipStyles}>
              <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
                Evaluators
              </Typography>
            </ReactTooltip>
          </>
        )}

        {delCond && (
          <>
            <div data-tip data-for="del" onClick={() => setDeleteModal(true)}>
              <img src="/assets/Delete member.svg" alt="del" />
            </div>
            <ReactTooltip id="del" {...tooltipStyles}>
              <Typography name="span" size="1.4rem" color="#CDCFD4" face="Book">
                {`Delete ${isCfa ? "CFA" : "program"}`}
              </Typography>
            </ReactTooltip>
          </>
        )}
        {/* <Menu
          selectOpen={selectOpen}
          setselectOpen={setselectOpen}
          handleClickAway={handleClickAway}
          options={[
            {
              name: `Edit ${isCfa ? "CFA" : "program"}`,
              roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
              handler: () => {
                history.push(
                  `/dashboard/${isCfa ? "call-for-applications" : "programs"}/${
                    data._id
                  }/${isCfa ? "cfa" : "program"}-details`
                );
              },
            },
            {
              name: `View ${isCfa ? "CFA" : "program"}`,
              handler: () => {
                window.open(
                  `/dashboard/i/${
                    isCfa ? "cfa-overview" : "program-overview"
                  }/${data._id}`
                );
              },
            },
            {
              name: "View applications",
              roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
              hasCond: true,
              cond: hasApplications,
              handler: () => {
                history.push(
                  `/dashboard/${isCfa ? "call-for-applications" : "programs"}/${
                    data._id
                  }/applications`
                );
              },
            },
            {
              name: "View workplace",
              roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
              hasCond: true,
              cond: isPhaseWorkplace,
              handler: () => {
                history.push(`/dashboard/workplace/${workplace._id}`);
              },
            },
            {
              name: "Evaluators",
              roles: ["SEEKER_OWNER"],
              hasCond: true,
              cond: noEvaluators,
              handler: () => {
                setModalEvaluators(true);
                setModalEvaluatorsData(data._id);
              },
            },
            {
              name: `Delete ${isCfa ? "CFA" : "program"}`,
              roles: ["SEEKER_OWNER"],
              handler: () => setDeleteModal(true),
            },
          ]}
        /> */}
      </Box>

      <ProgramsCardDeleteModal
        open={deleteModal}
        data={data}
        onCloseModel={() => setDeleteModal(false)}
        handler={onDeleteProgram}
      />
    </Box>
  );
};

export default withTracker(({ isCfa, data }) => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  const applications = data.applications();
  // ...
  return {
    user,
    userId,
    isCfa,
    applications,
  };
})(ProgramsCard);
