import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Button from "../../../common/Button";
import EntryMultiEmail from "../../../common/Entry/EntryMultiEmail";
import Modal from "../../../common/Modal";
import Typography from "../../../common/Typography";

const InvitePeopleModal = (props) => {
  const emails = [];
  return (
    <Modal
      className="InvitePeopleModal"
      title="Invite people to Xperiencia"
      open={props.open}
      closeModal={props.closeModal}
    >
      <Box className="InvitePeopleModal__body">
        <EntryMultiEmail label="Add a new member" test={emails} />
      </Box>
      <Box className="InvitePeopleModal__footer">
        <Button small ghost onClick={props.closeModal}>
          Cancel
        </Button>
        <Button small>Invite</Button>
      </Box>
    </Modal>
  );
};

export default InvitePeopleModal;
