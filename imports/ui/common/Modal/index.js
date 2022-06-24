import "./style.scss";

import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import cx from "classnames";
import React from "react";

import Typography from "../Typography";

const Modal = ({ open, closeModal, children, title, className, width }) => (
  <Dialog
    open={open}
    onClose={closeModal}
    aria-labelledby="form-dialog-title"
    maxWidth={false}
  >
    <Box className={cx("AddModal", className)} style={{ width }}>
      <DialogTitle id="form-dialog-title" className="AddModal__header">
        <Typography color="#1c202a" face="Medium" size="2rem">
          {title}
        </Typography>
      </DialogTitle>
      <Divider
        style={{
          background: "#e4e9f3",
        }}
      />
      {children}
    </Box>
  </Dialog>
);

export default Modal;
