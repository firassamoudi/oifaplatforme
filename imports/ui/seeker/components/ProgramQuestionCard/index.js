import "./style.scss";

import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";

import Menu from "../../../common/Menu";
import Typography from "../../../common/Typography";
import store from "../../store";

const ProgramQuestionCard = ({
  index,
  data,
  onEditQuestion,
  onQuestionDelete,
}) => {
  const [selectOpen, setselectOpen] = React.useState(false);
  const handleClickAway = () => {
    setselectOpen(false);
  };
  // ...
  const onQuestionSelect = (e) => {
    const selected = e.target.checked;
    const question = { ...data, selected };
    onEditQuestion({ id: index, question });
  };
  // ...
  return (
    <Box className="ProgramQuestionCard">
      <Box className="ProgramQuestionCard__inner">
        <Typography size="1.6rem" color="#434c5e" face="Medium" m="0 0 1rem 0">
          {data.label}
        </Typography>
        <Typography
          size="1.4rem"
          color="#8389ab"
          height="1.57"
          face="Book"
          style={{
            maxWidth: "90%",
          }}
        >
          {data.response}
        </Typography>
        {!!data.options && !!data.options.length && (
          <Box
            component="ul"
            style={{ padding: "0 0 0 2rem", margin: "1rem 0 0 0" }}
          >
            {data.options.map((opt, index) => (
              <Typography
                key={index}
                name="li"
                size="1.4rem"
                color="#8389ab"
                height="1.57"
                face="Book"
                style={{
                  maxWidth: "90%",
                  margin: "0.5rem 0 0 0",
                }}
              >
                {opt}
              </Typography>
            ))}
          </Box>
        )}

        <Box className="ProgramQuestionCard__actions">
          {data.basic && !data.required && (
            <Switch
              color="default"
              checked={data.selected}
              onChange={onQuestionSelect}
            />
          )}
          {!data.basic && (
            <Menu
              selectOpen={selectOpen}
              setselectOpen={setselectOpen}
              handleClickAway={handleClickAway}
              costum={
                <MoreVertIcon
                  style={{
                    fontSize: "2rem",
                    color: "#88929f",
                  }}
                />
              }
              options={[
                {
                  name: "Edit question",
                  roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
                  handler: () => {
                    store.set("question", { open: true, id: index });
                  },
                },
                {
                  name: "Delete question",
                  roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
                  handler: () => {
                    onQuestionDelete({ id: index });
                  },
                },
              ]}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProgramQuestionCard;
