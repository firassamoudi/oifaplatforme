import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ScrollArea from "react-scrollbars-custom";

import EvaluatorCollection from "/imports/api/Evaluator";
import ProgramsCollection from "/imports/api/Program";
import SeekersCollection from "/imports/api/Seeker";

import Button from "../../../../common/Button";
import EmptyView from "../../../../common/EmptyView";
import Typography from "../../../../common/Typography";
import EvaluatorsModal from "../../../components/EvaluatorsModal";
import ProgramsCard from "../../../components/ProgramsCard";

const tableCols = [
  {
    label: "tite",
    className: "__col __col--title",
  },
  {
    label: "visitors",
    className: "__col __col--visitors",
  },
  {
    label: "applications",
    className: "__col __col--applications",
  },
  {
    label: "countries",
    className: "__col __col--countries",
  },
  {
    label: "applicants",
    className: "__col __col--applicants",
  },
  {
    label: "status",
    className: "__col __col--status",
  },
  {
    label: "",
    className: "__col __col--actions",
  },
];

const CFAs = ({ userId, seeker, programs, evaluators }) => {
  const history = useHistory();
  const [done, setDone] = useState(false);
  // SeekerPlan
  const canAddProgram = seeker?.plan?.()?.canAddProgram?.();
  // Roles
  const memberHasRole = Roles.userIsInRole(userId, [
    "SEEKER_OWNER",
    "SEEKER_CREATOR",
  ]);
  // ...
  const onAddCFA = () => {
    if (!canAddProgram) return;
    if (done) return;
    setDone(true);
    // Crate CFA
    Meteor.call("program.insert", { isCFA: true }, (err, id) => {
      if (err) return;
      history.push(`/dashboard/call-for-applications/${id}/cfa-details`);
    });
  };
  // - Evaluators Modal
  // const evalMembers = evaluators.map((e) => e.owner());
  const [modalEvaluators, setModalEvaluators] = useState(false);
  const [modalEvaluatorsData, setModalEvaluatorsData] = useState(null);
  const onClearModal = () => {
    setModalEvaluators(false);
    setModalEvaluatorsData(null);
  };
  // ...
  return (
    <Box className="Programs">
      <Box className="Programs__header">
        <Typography size="2.4rem" color="#021c30" face="Bold">
          Call for applications
        </Typography>
        <Box style={{ display: "flex", alignItems: "center" }}>
          {!canAddProgram && (
            <Typography
              size="1.4rem"
              color="#ffc857"
              face="Medium"
              style={{ margin: "0 3rem 0 0" }}
            >
              Please, check your plan
            </Typography>
          )}
          {memberHasRole && (
            <Button disabled={!canAddProgram} onClick={onAddCFA}>
              Add CFA
            </Button>
          )}
        </Box>
      </Box>

      <Box className="Programs__table">
        {!!programs.length && (
          <Box className="Programs__table__cols">
            {tableCols.map((tab, index) => (
              <Box key={index} className={tab.className}>
                {tab.label}
              </Box>
            ))}
          </Box>
        )}

        {!programs.length && (
          <Box className="Programs__empty">
            <EmptyView />
          </Box>
        )}

        <Box className="Programs__table__body">
          <ScrollArea
            momentum
            style={{ flex: 1, width: "100%", height: "100%" }}
          >
            <Box className="Programs__table__body__inner">
              {programs.map((program) => (
                <ProgramsCard
                  key={program._id}
                  isCfa
                  data={program}
                  setModalEvaluators={setModalEvaluators}
                  setModalEvaluatorsData={setModalEvaluatorsData}
                />
              ))}
            </Box>
          </ScrollArea>
        </Box>
      </Box>

      <EvaluatorsModal
        open={modalEvaluators}
        data={modalEvaluatorsData}
        // ...
        evaluators={evaluators}
        // ...
        closeModal={() => {
          onClearModal();
        }}
      />
    </Box>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  const handle = Meteor.subscribe("programs", { isCFA: true });
  if (!handle.ready() || !user) {
    return { user, userId, programs: [], evaluators: [] };
  }
  const seekerId = user.seekerId;
  const seeker = SeekersCollection.findOne({ _id: seekerId });
  const programs = ProgramsCollection.find().fetch();
  const evaluators = EvaluatorCollection.find({
    seekersId: { $eq: seekerId },
  }).fetch();
  // ...
  return {
    user,
    userId,
    seeker,
    programs,
    evaluators,
  };
})(CFAs);
