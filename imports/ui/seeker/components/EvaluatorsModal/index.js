import "./style.scss";

import Box from "@material-ui/core/Box";
// import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";

import EvaluatorCollection from "/imports/api/Evaluator";
import ProgramsCollection from "/imports/api/Program";

import Button from "../../../common/Button";
import { EntryAutocomplete } from "../../../common/Entry";
import Modal from "../../../common/Modal";
import Typography from "../../../common/Typography";

const EvaluatorItem = ({ data, onDeleteEvaluator }) => {
  const name = `${data.profile.firstName} ${data.profile.lastName}`;
  const email = data.username;
  return (
    <Box className="EvaluatorItem">
      <Box className="__content">
        <Box className="__name">{name}</Box>
        <Box className="__email">{email}</Box>
      </Box>
      <Box className="__status" onClick={() => onDeleteEvaluator(data)}>
        <HighlightOffIcon style={{ fontSize: "2rem", color: "#FF4646" }} />
      </Box>
    </Box>
  );
};

const EvaluatorsModal = ({ open, program, evaluators, closeModal }) => {
  const programEvaluatorsId = program?.evaluatorsId;
  const assignedEvaluators = programEvaluatorsId?.map((_id) => {
    const evaluator = EvaluatorCollection.findOne({ _id });
    return evaluator?.owner?.() ?? false;
  });
  // Assign evaluator
  const [currEvaluator, setCurrEvaluator] = useState([]);
  const onAssignEvaluator = ({ _id }) => {
    Meteor.call(
      "program.evaluators.add",
      { id: program._id, data: _id },
      (err) => {
        if (err) return;
        setCurrEvaluator([]);
      }
    );
  };
  // Delete evaluator
  const onDeleteEvaluator = (data) => {
    Meteor.call("program.evaluators.delete", {
      id: program._id,
      data: data.evaluatorId,
    });
  };
  const onInputChange = ({ evaluator }) => {
    if (!evaluator) return;
    const _id = evaluator.value;
    onAssignEvaluator({ _id });
  };
  // ...
  useEffect(() => {
    const programEvaluatorsId = program?.evaluatorsId ?? [];
    const currEvaluator = programEvaluatorsId.map((e) => {
      const evaluator = EvaluatorCollection.findOne({ _id: e });
      const owner = evaluator.owner();
      // ...
      return {
        label: `${owner.profile.firstName} ${owner.profile.lastName}`,
        value: evaluator._id,
      };
    });
    // ...
    setCurrEvaluator(currEvaluator);
  }, [program]);
  // - Options
  const options = evaluators.map((e) => {
    const owner = e.owner();
    // ...
    return {
      label: `${owner.profile.firstName} ${owner.profile.lastName}`,
      value: e._id,
    };
  });
  // ...
  return (
    <Modal
      className="EvaluatorsModal"
      title="Manage evaluators"
      open={open}
      closeModal={closeModal}
    >
      <Box className="EvaluatorsModal__body">
        <EntryAutocomplete
          // multiline
          label="Add new evaluator"
          name="evaluator"
          placeholder="Add new evaluator"
          value={currEvaluator}
          onInputChange={onInputChange}
          options={options}
        />
        <Box className="EvaluatorsModal__body__title">Evaluators list</Box>
        {assignedEvaluators?.map((evaluator, index) => (
          <EvaluatorItem
            key={index}
            data={evaluator}
            onDeleteEvaluator={onDeleteEvaluator}
          />
        ))}
      </Box>
      <Box className="ModalFooter EvaluatorsModal__footer">
        <Button small blue onClick={closeModal}>
          Done
        </Button>
      </Box>
    </Modal>
  );
};

export default withTracker(({ open, data, evaluators, closeModal }) => {
  const program = ProgramsCollection.findOne({ _id: data });
  // ...
  return {
    open,
    program,
    evaluators,
    closeModal,
  };
})(EvaluatorsModal);
