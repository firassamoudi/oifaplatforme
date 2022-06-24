import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import { getOptionLabel } from "/imports/libs/inputs";

import Image from "../../../../../../common/Image";
import Typography from "../../../../../../common/Typography";

const ChallengeCard = ({ imgId, title, sector, context, contextVideo }) => {
  const onMoreDetails = () => {
    window.open(contextVideo);
  };
  // ...
  return (
    <Box className="ChallengeCard">
      <Box className="ChallengeCard__img">
        {!!imgId && <Image data={imgId} />}
        {!imgId && <img src="/default_challenge_preview.jpg" alt="" />}
      </Box>
      <Box className="ChallengeCard__info">
        <Typography
          size="2rem"
          color="#051438"
          face="Bold"
          style={{ margin: "0 0 1.5rem 0" }}
        >
          {title}
        </Typography>
        <Typography
          size="1.6rem"
          color="#838FA7"
          face="Medium"
          style={{ margin: "0 0 2.4rem 0" }}
        >
          {getOptionLabel({ optionsList: "sectorsOptions", value: sector })}
        </Typography>

        <Typography
          size="1.5rem"
          color="#838FA7"
          face="Book"
          height="2.4rem"
          style={{ textAlign: "justify" }}
        >
          {context}
          {!!contextVideo && (
            <Typography
              face="Book"
              color="#03256C"
              onClick={onMoreDetails}
              style={{
                textDecoration: "underline",
                margin: "1rem 0 0 0",
                cursor: "pointer",
              }}
            >
              Challenge video
            </Typography>
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChallengeCard;
