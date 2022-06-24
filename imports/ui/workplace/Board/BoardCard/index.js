import "./style.scss";

import Box from "@material-ui/core/Box";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
// import { motion } from "framer-motion";
import moment from "moment";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import Menu from "../../../common/Menu";
import Typography from "../../../common/Typography";

const BoardCard = ({ data, columnId, index, onEditTask, onDeleteTask }) => {
  if (!data) return null;
  const date = moment(data.date).format("DD-MM-YYYY");
  // ...
  const [selectOpen, setselectOpen] = useState(false);
  const handleClickAway = () => {
    setselectOpen(false);
  };
  // ...
  return (
    <Draggable draggableId={`${data.key}`} index={index}>
      {(provided) => {
        return (
          <Box
            className="BoardCardCtnr"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Box className="BoardCard card">
              <Box className="BoardCard__actions">
                <Menu
                  selectOpen={selectOpen}
                  setselectOpen={setselectOpen}
                  handleClickAway={handleClickAway}
                  style={{ padding: "0" }}
                  costum={<MoreHorizIcon />}
                  options={[
                    {
                      name: "Edit task",
                      handler: () => {
                        onEditTask({ data, columnId });
                        handleClickAway();
                      },
                    },
                    {
                      name: "Delete task",
                      handler: () => {
                        onDeleteTask({ data, columnId });
                        handleClickAway();
                      },
                    },
                  ]}
                />
              </Box>
              <Box className="BoardCard__inner">
                <Box
                  className="BoardCard__inner__inner"
                  onClick={() => {
                    onEditTask({ data, columnId });
                    handleClickAway();
                  }}
                >
                  <Box className="BoardCard__top">
                    <Typography
                      size="1.4rem"
                      color="#333760"
                      face="Book"
                      style={{
                        maxWidth: "80%",
                      }}
                    >
                      {data.title}
                    </Typography>
                  </Box>
                  <Box className="BoardCard__sub">
                    {date !== "Invalid date" && (
                      <Typography size="1.4rem" color="#858FA7" face="Book">
                        {date}
                      </Typography>
                    )}

                    {/* <AttachFileIcon /> */}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      }}
    </Draggable>
  );
};

export default BoardCard;
