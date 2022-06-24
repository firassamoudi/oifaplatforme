import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";

import Button from "../../../common/Button";
import { EntryText } from "../../../common/Entry";
import Modal from "../../../common/Modal";
import Typography from "../../../common/Typography";
import store from "../../store";

const ProgramQuestionModal = ({
  programQuestionModal,
  // ...
  data,
  // ...
  onAddQuestion,
  onEditQuestion,
  // ...
  closeModal,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState({
    id: "not-basic",
    type: "text",
    label: "",
    response: "",
    placeholder: "",
    basic: false,
    selected: true,
  });
  const onInputChange = (inp) => {
    setForm((state) => ({ ...state, ...inp }));
  };
  // ...
  const onCloseModal = () => {
    setForm({
      id: "not-basic",
      type: "text",
      label: "",
      response: "",
      placeholder: "",
      basic: false,
      selected: true,
    });
    // ...
    closeModal();
    setIsEdit(false);
  };
  // - Forward Data
  const onDoneHandler = () => {
    if (isEdit) {
      onEditQuestion({ question: form, id: programQuestionModal.id });
    } else {
      onAddQuestion({ question: form });
    }
    // ...
    onCloseModal();
  };
  // - Edit
  useEffect(() => {
    const id = programQuestionModal.id;
    if (Number.isInteger(id)) {
      const question = data[id];
      setForm(() => ({ ...question }));
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [programQuestionModal]);
  // ...
  return (
    <Modal
      className="ProgramQuestionModal"
      title="Application Question"
      open={programQuestionModal.open}
      closeModal={onCloseModal}
      width="70rem"
    >
      <Box className="ProgramQuestionModal__body">
        <EntryText
          name="label"
          label="Question"
          placeholder="Add your answer"
          multiline
          rows={2}
          value={form.label}
          onInputChange={onInputChange}
        />
        <EntryText
          name="response"
          label="Response type"
          placeholder="Response type"
          multiline
          rows={3}
          value={form.response}
          onInputChange={onInputChange}
        />
      </Box>
      <Box className="ModalFooter ProgramQuestionModal__footer">
        <Button small ghost onClick={onCloseModal}>
          Cancel
        </Button>
        <Button small blue onClick={onDoneHandler}>
          Done
        </Button>
      </Box>
    </Modal>
  );
};

export default withTracker(({ ...props }) => {
  const programQuestionModal = store.get("question");
  // ...
  return { programQuestionModal, ...props };
})(ProgramQuestionModal);
