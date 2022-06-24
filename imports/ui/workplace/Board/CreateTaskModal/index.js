import "./style.scss";

import Box from "@material-ui/core/Box";
import React, { useEffect, useState } from "react";

import Button from "../../../common/Button";
import { EntryAutocomplete, EntryDate, EntryText } from "../../../common/Entry";
import Modal from "../../../common/Modal";
import Typography from "../../../common/Typography";

const CreateTaskModal = ({
  open,
  columnId,
  teamId,
  workplaceId,
  teams,
  onClose,
}) => {
  const [taskData, setTaskData] = useState({
    title: "",
    date: null,
    description: "",
    files: [],
  });
  const [taskTeams, setTaskTeams] = useState({ teams: [] });
  // ...
  const onInputChange = (inp) => {
    setTaskData((state) => ({ ...state, ...inp }));
  };
  const onTeamsChange = (inp) => {
    setTaskTeams((state) => ({ ...state, ...inp }));
  };
  // - Close Modal
  const onCloseModal = () => {
    setTaskData({
      title: "",
      date: null,
      description: "",
      files: [],
    });
    setTaskTeams({ teams: [] });
    // ...
    onClose();
  };
  // - Create Task
  const onCreateTask = () => {
    const data = {
      workplaceId,
      teamId,
      taskTeams: taskTeams.teams.map((team) => team._id),
      columnId,
      data: { ...taskData, key: Date.now() },
    };
    // ...
    Meteor.call("workplace.task.insert", data, (err) => {
      if (err) return;
      onCloseModal();
    });
  };
  // - Options
  const teamsOptions = teams
    .map((team) => ({
      _id: team._id,
      label: team.title,
      value: team._id,
    }))
    .filter((team) => team._id !== teamId);
  // ...
  return (
    <Box className="CreateTaskModal">
      <Modal
        className="CreateTeamModal"
        title="Create task"
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

          {!!teamsOptions.length && (
            <EntryAutocomplete
              multiline
              label="Add task to other teams"
              name="teams"
              placeholder="teams list"
              value={taskTeams.teams}
              onInputChange={onTeamsChange}
              options={teamsOptions}
            />
          )}

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
          <Button small onClick={onCreateTask} disabled={!taskData.title}>
            Create Task
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateTaskModal;
