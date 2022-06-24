import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Button from "../../../common/Button";
import EntryEmail from "../../../common/Entry/EntryEmail";
import EntryText from "../../../common/Entry/EntryText";
import Modal from "../../../common/Modal";

const MemberModal = ({
  open,
  closeModal,
  isLoading,
  setIsLoading,
  // ...
  onAddMember,
  onEditMember,
  // ...
  isEdit,
  data,
  onInputChange,
}) => (
  <Modal
    className="MemberModal"
    title={isEdit ? "Edit member" : "Add member"}
    open={open}
    closeModal={closeModal}
  >
    <Box className="MemberModal__body">
      <EntryText
        name="firstName"
        label="First Name"
        placeholder="Fannie"
        value={data.firstName}
        onInputChange={onInputChange}
        readOnly={isEdit}
      />
      <EntryText
        name="lastName"
        label="Last Name"
        placeholder="Rios"
        value={data.lastName}
        onInputChange={onInputChange}
        readOnly={isEdit}
      />
      <EntryEmail
        placeholder="Email"
        name="email"
        value={data.email}
        error={data.emailError}
        onInputChange={onInputChange}
        readOnly={isEdit}
      />
    </Box>
    <Box className="MemberModal__footer">
      <Button small ghost onClick={closeModal} style={{ margin: "0 1rem 0 0" }}>
        Cancel
      </Button>
      <Button
        small
        isLoading={isLoading}
        onClick={() => {
          setIsLoading(true);
          return isEdit ? onEditMember() : onAddMember();
        }}
      >
        Done
      </Button>
    </Box>
  </Modal>
);

export default MemberModal;
