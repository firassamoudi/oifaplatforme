import "./style.scss";

import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../../common/Button";
import Typography from "../../../common/Typography";

const EmailValidation = () => {
  const [ready, setReady] = useState({ valid: false, ready: false });
  const params = useParams();
  const token = params.token;
  // ...
  const onValidateEmail = () => {
    Meteor.call("user.verify.email", { token }, (err, res) => {
      if (err || !res.userId) {
        setReady({ ready: true, valid: false });
      } else {
        setReady({ ready: true, valid: true });
      }
    });
  };
  useEffect(() => {
    onValidateEmail();
  }, [token]);
  // ...
  if (!ready.ready) return null;
  // ...
  return (
    <Box className="EmailValidation">
      <Box className="AuthUpContainer__content EmailValidation__content">
        <Box className="AuthUpContainer__box EmailValidation__box __no-bg">
          {ready.valid && (
            <>
              <Box className="__icon">
                <DoneIcon style={{ color: "#243160", fontSize: "4.3rem" }} />
              </Box>
              <Typography
                face="Medium"
                color="#9CA3AF"
                size="1.8rem"
                height="2.6rem"
                style={{ textAlign: "center", margin: "0 0 4.4rem 0" }}
              >
                Congrats!! You just validated your email. now you can login to
                OIFA platform.
              </Typography>
              <a
                href={Meteor.settings.public.APP_URL}
                style={{ textDecoration: "none" }}
              >
                <Button>Back to OIFA</Button>
              </a>
            </>
          )}
          {!ready.valid && (
            <>
              <Box className="__icon">
                <CloseIcon
                  style={{
                    color: "#243160",
                    width: "4.3rem",
                    height: "4.3rem",
                  }}
                />
              </Box>
              <Typography
                face="Medium"
                color="#9CA3AF"
                size="1.8rem"
                height="2.6rem"
                style={{ textAlign: "center", margin: "0 0 4.4rem 0" }}
              >
                Link expired! you already validated your email.
              </Typography>
              <a
                href={Meteor.settings.public.APP_URL}
                style={{ textDecoration: "none" }}
              >
                <Button>Back to OIFA</Button>
              </a>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EmailValidation;
