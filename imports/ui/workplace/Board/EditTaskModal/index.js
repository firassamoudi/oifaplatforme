import "./style.scss";

import Box from "@material-ui/core/Box";
import React, { useEffect, useState } from "react";

import Button from "../../../common/Button";
import { EntryDate, EntryText } from "../../../common/Entry";
import Modal from "../../../common/Modal";
import Typography from "../../../common/Typography";

const EditTaskModal = ({
  open,
  columnId,
  task,
  teamId,
  workplaceId,
  onClose,
}) => {
  // ...
  const [taskData, setTaskData] = useState({
    title: "",
    date: null,
    description: "",
    files: [],
  });
  // ...
  const onInputChange = (inp) => {
    setTaskData((state) => ({ ...state, ...inp }));
  };
  // - Close Modal
  const onCloseModal = () => {
    setTaskData({
      title: "",
      date: null,
      description: "",
      files: [],
    });
    // ...
    onClose();
  };
  // - Create Task
  const onEditTask = () => {
    const data = { workplaceId, teamId, columnId, data: taskData };
    // ...
    Meteor.call("workplace.task.update", data, (err) => {
      if (err) return;
      onCloseModal();
    });
  };
  useEffect(() => {
    if (task) {
      setTaskData(task);
    }
  }, [task]);
  // ...
  return (
    <Box className="EditTaskModal">
      <Modal
        className="CreateTeamModal"
        title="Edit task"
        open={open}
        closeModal={onCloseModal}
      >
        <Box className="CreateTeamModal__body">
          <EntryText
            label="Task Title *"
            placeholder="Name your task"
            onInputChange={onInputChange}
            name="title"
            value={taskData.title}
          />

          <EntryDate
            endDate
            onInputChange={onInputChange}
            label="Expiration date"
            name="date"
            value={taskData.date}
          />

          <EntryText
            multiline
            rows={7}
            label="Task Description"
            placeholder="Your task description"
            onInputChange={onInputChange}
            name="description"
            value={taskData.description}
          />
        </Box>
        <Box className="CreateTeamModal__footer">
          <Button small ghost onClick={onCloseModal}>
            Cancel
          </Button>
          <Button small onClick={onEditTask} disabled={!taskData.title}>
            Edit Task
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditTaskModal;
