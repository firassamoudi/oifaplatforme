import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Button from "../../../common/Button";
import EntryEmail from "../../../common/Entry/EntryEmail";
import EntrySelect from "../../../common/Entry/EntrySelect";
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
  onAddEvaluator,
  onEditEvaluator,
  // ...
  isEdit,
  data,
  onInputChange,
}) => {
  const isEvaluator = data.role === "EVALUATOR_OWNER";
  const onAddMemberHandler = isEvaluator ? onAddEvaluator : onAddMember;
  const onEditMemberHandler = isEvaluator ? onEditEvaluator : onEditMember;
  // - Edit Role Options
  const roleOptions = [
    { label: "Creator", value: "SEEKER_CREATOR" },
    { label: "Searcher", value: "SEEKER_SEARCHER" },
  ];
  if (!isEdit) {
    roleOptions.push({ label: "Evaluator", value: "EVALUATOR_OWNER" });
  }
  // ...
  return (
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

        {isEdit && isEvaluator ? (
          <EntryText
            label="Authorization *"
            value="Evaluator"
            onInputChange={onInputChange}
            readOnly
          />
        ) : (
          <EntrySelect
            label="Authorization *"
            name="role"
            value={data.role}
            onInputChange={onInputChange}
            error={data.roleError}
            placeholder={isEdit ? null : "Select role"}
            options={[...roleOptions]}
          />
        )}

        {!isEdit && (
          <EntryEmail
            label="Email *"
            placeholder="Email"
            name="email"
            value={data.email}
            error={data.emailError}
            onInputChange={onInputChange}
          />
        )}
      </Box>
      <Box className="ModalFooter MemberModal__footer">
        <Button small ghost onClick={closeModal}>
          Cancel
        </Button>
        <Button
          small
          onClick={() => {
            setIsLoading(true);
            return isEdit ? onEditMemberHandler() : onAddMemberHandler();
          }}
          isLoading={isLoading}
        >
          Done
        </Button>
      </Box>
    </Modal>
  );
};

export default MemberModal;
