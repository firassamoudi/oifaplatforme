import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Avatar from "../../../../../common/Avatar";
import Button from "../../../../../common/Button";
import Typography from "../../../../../common/Typography";

const ContactCard = ({ data }) => {
  const firstName = data?.firstName ?? "";
  const lastName = data?.lastName ?? "";
  // ...
  return (
    <Box className="ContactCard">
      <Box className="ContactCard__info">
        <Box>
          <Typography size="1.7rem" color="#0A0937" face="Book">
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography size="1.4rem" color="#8993A8" face="Book">
            {data.position ?? ""}
          </Typography>
        </Box>
      </Box>

      <a href={data.linkedinLink} target="__blank">
        <img src="/auth/signup/linkedin.svg" alt="" />
      </a>
    </Box>
  );
};

export default ContactCard;
