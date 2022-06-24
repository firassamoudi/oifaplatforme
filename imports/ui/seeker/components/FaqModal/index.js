import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";

import Button from "../../../common/Button";
import { EntryText } from "../../../common/Entry";
import Modal from "../../../common/Modal";
import Typography from "../../../common/Typography";
import store from "../../store";

const FaqModal = ({ faqModal, faqData, onAddFaq, onEditFaq, closeModal }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({
    question: "",
    response: "",
    custom: true,
  });
  const onInputChange = (inp) => {
    setData((state) => ({ ...state, ...inp }));
  };
  // ...
  const onCloseModal = () => {
    setData({
      question: "",
      response: "",
      custom: false,
    });
    // ...
    closeModal();
    setIsEdit(false);
  };
  // - Forward Data
  const onDoneHandler = () => {
    const faqItem = {
      question: data.question,
      response: data.response,
      custom: !!data.custom,
    };
    // ...
    if (isEdit) {
      onEditFaq({ faqItem, id: faqModal.id });
    } else {
      onAddFaq({ faqItem });
    }
    // ...
    onCloseModal();
  };
  // - Edit
  useEffect(() => {
    const id = faqModal.id;
    if (Number.isInteger(id)) {
      const data = faqData[id];
      setData(() => ({ ...data, id }));
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [faqModal]);
  // ...
  return (
    <Modal
      className="FaqModal"
      title="FAQ question"
      open={faqModal.open}
      closeModal={onCloseModal}
      width="70rem"
    >
      <Box className="FaqModal__body">
        <EntryText
          name="question"
          label="Question"
          placeholder="Add your question"
          value={data.question}
          onInputChange={onInputChange}
          // readOnly={!data.custom}
        />
        <EntryText
          name="response"
          label="Response"
          placeholder="Add your answer"
          multiline
          rows={7}
          value={data.response}
          onInputChange={onInputChange}
        />
      </Box>
      <Box className="ModalFooter FaqModal__footer">
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

export default withTracker(({ data, onInputChange }) => {
  const faqModal = store.get("faq");
  // ...
  return { data, onInputChange, faqModal };
})(FaqModal);
