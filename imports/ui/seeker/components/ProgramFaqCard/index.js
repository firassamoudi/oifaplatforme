import "./style.scss";

import Box from "@material-ui/core/Box";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import React from "react";

import Menu from "../../../common/Menu";
import Typography from "../../../common/Typography";
import store from "../../store";

const ProgramFaqCard = ({ index, data, onDeleteFaq }) => {
  const [selectOpen, setselectOpen] = React.useState(false);
  const handleClickAway = () => {
    setselectOpen(false);
  };
  // - Options
  let options = [
    {
      name: "Edit question",
      roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
      handler: () => {
        store.set("faq", { open: true, id: index });
      },
    },
  ];
  // ...
  if (data.custom) {
    options = [
      ...options,
      {
        name: "Delete question",
        roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
        handler: () => {
          onDeleteFaq({ id: index });
        },
      },
    ];
  }
  // ...
  return (
    <Box className="ProgramFaqCard">
      <Box className="ProgramFaqCard__inner">
        <Typography size="1.6rem" color="#434c5e" face="Medium" m="0 0 1rem 0">
          {data.question}
        </Typography>
        {data.response && (
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
        )}

        {!data.response && (
          <Typography
            size="1.4rem"
            color="rgb(249, 191, 88)"
            height="1.57"
            face="Book"
            style={{
              maxWidth: "90%",
            }}
          >
            Edit question to add your response.
          </Typography>
        )}

        <Box className="ProgramFaqCard__actions">
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
            options={options}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProgramFaqCard;
