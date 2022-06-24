import "./style.scss";

import Box from "@material-ui/core/Box";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import cx from "classnames";
import React from "react";

import Typography from "../../../common/Typography";

const SolverTypeCard = ({ type, img, selected, handler }) => {
  return (
    <Box
      className={cx("SolverTypeCard", { __selected: selected })}
      onClick={() => handler({ type })}
    >
      {!!selected && (
        <CheckCircleIcon
          className="SolverTypeCard__icon"
          style={{ color: "#fff", fontSize: "2.6rem" }}
        />
      )}

      <Box component="img" src={img} alt="" />

      <Typography
        className="SolverTypeCard__label"
        face="Medium"
        size="2rem"
        height="2.5rem"
        color="#fff"
      >
        {type}
      </Typography>
    </Box>
  );
};

export default SolverTypeCard;
