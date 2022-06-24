import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";

import Button from "../../../../../../common/Button";
import { EntryText } from "../../../../../../common/Entry";
import Modal from "../../../../../../common/Modal";
import Typography from "../../../../../../common/Typography";
import store from "../../store";

const MemberModal = ({ modal, listData, onAdd, onEdit, closeModal }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    linkedinLink: "",
  });
  // ...
  const onInputChange = (inp) => {
    setData((state) => ({ ...state, ...inp }));
  };
  // ...
  const onCloseModal = () => {
    setData({
      firstName: "",
      lastName: "",
      position: "",
      linkedinLink: "",
    });
    // ...
    closeModal();
    setIsEdit(false);
  };
  // - Forward Data
  const onDoneHandler = () => {
    const item = {
      firstName: data.firstName,
      lastName: data.lastName,
      position: data.position,
      linkedinLink: data.linkedinLink,
    };
    // ...
    if (isEdit) {
      onEdit({ item, id: modal.id });
    } else {
      onAdd({ item });
    }
    // ...
    onCloseModal();
  };
  // - Edit
  useEffect(() => {
    const id = modal.id;
    if (Number.isInteger(id)) {
      const data = listData[id];
      setData(() => ({ ...data, id }));
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [modal]);
  // ...
  return (
    <Modal
      className="MemberModal"
      title={`${isEdit ? "Edit" : "Add"} ${
        modal.founder ? "Founder" : "Member"
      }`}
      open={modal.open}
      closeModal={onCloseModal}
      width="450px"
    >
      <Box className="MemberModal__body">
        <EntryText
          name="firstName"
          label="First Name"
          placeholder="First Name"
          value={data.firstName}
          onInputChange={onInputChange}
          error={data.firstNameDirty && data.firstNameError}
        />
        <EntryText
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          value={data.lastName}
          onInputChange={onInputChange}
          error={data.lastNameDirty && data.lastNameError}
        />
        <EntryText
          name="position"
          label="Position"
          placeholder="Position"
          value={data.position}
          onInputChange={onInputChange}
          error={data.positionDirty && data.positionError}
        />
        <EntryText
          name="linkedinLink"
          label="Linkedin Link"
          placeholder="Linkedin Link"
          value={data.linkedinLink}
          onInputChange={onInputChange}
          error={data.linkedinLinkDirty && data.linkedinLinkError}
        />
      </Box>
      <Box className="ModalFooter MemberModal__footer">
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
  const modal = store.get("member");
  // ...
  return { data, onInputChange, modal };
})(MemberModal);
