import "./style.scss";

import { Box } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import cx from "classnames";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "../../../common/Avatar";
import Menu from "../../../common/Menu";
import Typography from "../../../common/Typography";

const TeamCard = ({ workplace, data, active, onEditTeam, onDeleteTeam }) => {
  const history = useHistory();
  // ...
  const [selectOpen, setselectOpen] = useState(false);
  const handleClickAway = () => {
    setselectOpen(false);
  };
  // ...
  const onShowDetails = () => {
    const tId = data._id;
    const wId = workplace._id;
    history.push(`/dashboard/workplace/${wId}/${tId}`);
  };
  // ...
  return (
    <Box
      component="li"
      className={cx("BoardTeamCard", { "BoardTeamCard--active": active })}
    >
      <Box className="BoardTeamCard__info" onClick={onShowDetails}>
        <Avatar label={data.title} />
        <Typography size="1.6rem" color="#021C30" face="Medium" m="0 0 0 1rem">
          {data.title}
        </Typography>
      </Box>

      <Menu
        selectOpen={selectOpen}
        setselectOpen={setselectOpen}
        handleClickAway={handleClickAway}
        style={{ padding: "0" }}
        costum={
          <MoreHorizIcon
            style={{
              fontSize: "2.3rem",
              color: "#BFC5D2",
              marginRight: "2.7rem",
            }}
          />
        }
        options={[
          {
            name: "Edit",
            handler: () => onEditTeam(data),
          },
          {
            name: "Delete",
            handler: () => onDeleteTeam(data),
          },
        ]}
      />
    </Box>
  );
};

export default TeamCard;
