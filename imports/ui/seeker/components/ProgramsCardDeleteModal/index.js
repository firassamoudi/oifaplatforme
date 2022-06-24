import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Button from "/imports/ui/common/Button";
import Modal from "/imports/ui/common/Modal";
import Typography from "/imports/ui/common/Typography";

const ProgramsCardDeleteModal = ({ open, data, onCloseModel, handler }) => {
  return (
    <Modal
      className="ProgramsCardDeleteModal"
      title="Delete program"
      open={open}
      closeModal={onCloseModel}
    >
      <Box className="ProgramsCardDeleteModal__body">
        <Typography face="Medium" size="1.4rem" color="#1c202a">
          {`Are you sure you want to delete ${data.title} program? this action is not reversable.`}
        </Typography>
      </Box>
      <Box className="ProgramsCardDeleteModal__footer">
        <Button
          small
          ghost
          onClick={onCloseModel}
          style={{ margin: "0 1rem 0 0" }}
        >
          Cancel
        </Button>
        <Button small onClick={handler}>
          Delete
        </Button>
      </Box>
    </Modal>
  );
};

export default ProgramsCardDeleteModal;
