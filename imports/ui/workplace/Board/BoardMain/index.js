import "./style.scss";

import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TeamCollection from "/imports/api/Team";

import Typography from "../../../common/Typography";
import BoardCard from "../BoardCard";
import CreateTaskModal from "../CreateTaskModal";
import EditTaskModal from "../EditTaskModal";

const getDragData = (data) => {
  const colId = data.droppableId;
  let colIndex = 0;
  if (colId === "todo") colIndex = 0;
  if (colId === "doing") colIndex = 1;
  if (colId === "done") colIndex = 2;
  // ...
  const index = data.index;
  // ...
  return {
    colId,
    index,
    colIndex,
  };
};

const BoardMain = ({ hasRole, teamId, teams, workplaceId, boardColumns }) => {
  const [isLoading, setIsLoading] = useState(false);
  // - Manage CreateTask Modal
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState({
    open: false,
    columnId: null,
  });
  const onOpenCreateTaskModal = ({ columnId }) => {
    setOpenCreateTaskModal({
      open: true,
      columnId,
    });
  };
  const onCloseCreateTaskModal = () => {
    setOpenCreateTaskModal({
      open: false,
      columnId: null,
    });
  };
  // - Manage EditTask Modal
  const [openEditTaskModal, setOpenEditTaskModal] = useState({
    open: false,
    columnId: null,
    task: null,
  });
  const onOpenEditTaskModal = ({ task, columnId }) => {
    setOpenEditTaskModal({
      open: true,
      columnId,
      task,
    });
  };
  const onCloseEditTaskModal = () => {
    setOpenEditTaskModal({
      open: false,
      columnId: null,
      task: null,
    });
  };
  // ...
  const onDeleteTask = ({ data, columnId }) => {
    Meteor.call("workplace.task.delete", {
      workplaceId,
      teamId,
      columnId,
      data,
    });
  };
  // - Handle drag
  const handelDragEnd = (results) => {
    if (!results.destination) return;
    // ...
    setIsLoading(true);
    // ...
    const source = getDragData(results.source);
    const dest = getDragData(results.destination);
    // Columns
    const sCIx = source.colIndex;
    const dCIx = dest.colIndex;
    // Index
    const sIx = source.index;
    const dIx = dest.index;
    // ...
    const sCol = boardColumns[sCIx];
    const dCol = boardColumns[dCIx];
    const targetCard = sCol.tasks[sIx];
    // - Drag from colum to column
    sCol.tasks.splice(sIx, 1);
    dCol.tasks.splice(dIx, 0, targetCard);
    // - Update Board after drag
    Meteor.call(
      "workplace.task.drag",
      {
        workplaceId,
        teamId,
        data: boardColumns,
      },
      () => {
        setIsLoading(false);
      }
    );
  };
  // ...
  return (
    <Box className="BoardMain">
      <DragDropContext onDragEnd={handelDragEnd}>
        {boardColumns.map((column) => {
          return (
            <Droppable
              key={column.key}
              droppableId={column.key}
              isDragDisabled={isLoading}
            >
              {(provided) => (
                <Box className="BoardMain__dnd-group">
                  <Box className="BoardMain__dnd-group__header">
                    <Box className="BoardMain__dnd-group__header__title">
                      <Typography size="1.6rem" face="Medium" color="#021C30">
                        {column.label}
                      </Typography>
                    </Box>
                    <Box
                      onClick={() =>
                        onOpenCreateTaskModal({ columnId: column.key })
                      }
                    >
                      <AddIcon
                        style={{
                          color: "#03256c",
                          fontSize: "2.3rem",
                          cursor: "pointer",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    className="BoardMain__dnd-group__dropZone"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div>
                      {column.tasks.map((task, index) => {
                        if (!task) return null;
                        return (
                          <BoardCard
                            key={task.key}
                            data={task}
                            index={index}
                            columnId={column.key}
                            onEditTask={() =>
                              onOpenEditTaskModal({
                                task,
                                columnId: column.key,
                              })
                            }
                            onDeleteTask={onDeleteTask}
                          />
                        );
                      })}
                    </div>
                    {provided.placeholder}
                  </Box>
                </Box>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>

      <CreateTaskModal
        open={openCreateTaskModal.open}
        columnId={openCreateTaskModal.columnId}
        teamId={teamId}
        workplaceId={workplaceId}
        teams={teams}
        onClose={onCloseCreateTaskModal}
      />

      <EditTaskModal
        open={openEditTaskModal.open}
        columnId={openEditTaskModal.columnId}
        task={openEditTaskModal.task}
        teamId={teamId}
        workplaceId={workplaceId}
        teams={teams}
        onClose={onCloseEditTaskModal}
      />
    </Box>
  );
};

export default withTracker((props) => {
  const userId = Meteor.userId();
  // ...
  // - Column / Tasks
  const team = TeamCollection.findOne({ _id: props.teamId });
  const boardColumns = [
    { key: "todo", label: "ToDo", tasks: team ? team.board.todo : [] },
    { key: "doing", label: "Doing", tasks: team ? team.board.doing : [] },
    { key: "done", label: "Done", tasks: team ? team.board.done : [] },
  ];
  // ...
  return { boardColumns, ...props };
})(BoardMain);
