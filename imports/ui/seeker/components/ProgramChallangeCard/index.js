import "./style.scss";

import Box from "@material-ui/core/Box";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import EditIcon from "@material-ui/icons/Edit";
import cx from "classnames";
import React from "react";

import { getOptionLabel } from "/imports/libs/inputs";

import Image from "../../../common/Image";
import Typography from "../../../common/Typography";

const ProgramChallengeCard = ({ id, data, onCheckHandler, onEditHandler }) => {
  const challengeImg = data?.imgId;
  // ...
  return (
    <Box
      className={cx("ProgramChallengeCard", {
        "ProgramChallengeCard--checked": data.selected,
      })}
    >
      {data.selected && (
        <Box
          className="ProgramChallengeCard__edit"
          onClick={() => onEditHandler({ id })}
        >
          <EditIcon style={{ color: "#fff", fontSize: "3rem" }} />
        </Box>
      )}

      <Box
        className="ProgramChallengeCard__inner"
        onClick={() => onCheckHandler({ id, challenge: data })}
      >
        <Box className="ProgramChallengeCard__preview">
          {!!challengeImg && <Image data={challengeImg} />}
          {!challengeImg && <img src="/default_challenge_preview.jpg" alt="" />}
        </Box>
        <Box className="ProgramChallengeCard__content">
          <Box className="ProgramChallengeCard__head">
            <Box className="ProgramChallengeCard__title">
              <Typography
                size="1.6rem"
                height="3rem"
                color="#9fa6bf"
                face="Medium"
              >
                {getOptionLabel({
                  optionsList: "sectorsOptions",
                  value: data.sector,
                }) || "Sector is not set"}
              </Typography>
            </Box>
            {data.selected && (
              <CheckCircleIcon style={{ color: "#03256c", fontSize: "3rem" }} />
            )}
          </Box>
          <Box className="ProgramChallengeCard__body">
            <Typography
              size="1.4rem"
              height="1.8rem"
              color="#33343a"
              face="Medium"
              m="0 0 1rem 0"
            >
              {data.title || "Untitled challenge"}
            </Typography>
            <Typography
              size="1.2rem"
              height="1.9rem"
              color="#9fa6bf"
              face="Book"
            >
              {data.context || "Challenge context"}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProgramChallengeCard;
