import "./style.scss";

import Box from "@material-ui/core/Box";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import cx from "classnames";
import React from "react";

import Typography from "../../../../../common/Typography";

const SeekerPlan = ({ data, onInputChange }) => (
  <Box className="SeekerPlan">
    <Typography
      face="Bold"
      color="#1E2E41"
      size="3.3rem"
      height="4.2rem"
      style={{ textAlign: "center", margin: "0 0 0.8rem 0" }}
    >
      Select the package you might be interested in
    </Typography>
    <Typography
      face="Book"
      color="#9ca3af"
      size="1.6rem"
      height="2rem"
      style={{ textAlign: "center", margin: "0 0 5.4rem 0" }}
    >
      You will be able to finalize your choice with our business team
    </Typography>
    <Box className="__form">
      <Box className="__plan">
        <Box
          className={cx("__plan__top", {
            __active: data.plan === "SUBSCRIPTION",
          })}
          onClick={() => onInputChange({ plan: "SUBSCRIPTION" })}
        >
          <Box className="__checkbox">
            <Box className="__icon">
              <CheckCircleIcon
                style={{ color: "#f9bf58", fontSize: "2.1rem" }}
              />
            </Box>
            <Box className="__label">
              <Typography
                face="Medium"
                color="#1e2e41"
                size="1.6rem"
                height="2rem"
                style={{
                  margin: "0 0 0 1rem",
                }}
              >
                Subscription Plan
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="__plan__bottom">
          <Typography
            face="Medium"
            color="#9ca3af"
            size="1.6rem"
            height="2rem"
            style={{ fontWeight: "400" }}
          >
            Get the opportunity to publish a certain number of programs or
            challenges on our platform. You will also have access to our
            qualified innovation talents database and be able to connect with
            some of them. With our business team, you can estimate your needs
            and agree on the payment that will be done periodically.
          </Typography>
        </Box>
      </Box>
      <Box className="__plan">
        <Box
          className={cx("__plan__top", {
            __active: data.plan === "PAYG",
          })}
          onClick={() => onInputChange({ plan: "PAYG" })}
        >
          <Box className="__checkbox">
            <Box className="__icon">
              <CheckCircleIcon
                style={{ color: "#f9bf58", fontSize: "2.1rem" }}
              />
            </Box>
            <Box className="__label">
              <Typography
                face="Medium"
                color="#1e2e41"
                size="1.6rem"
                height="2rem"
                style={{
                  margin: "0 0 0 1rem",
                }}
              >
                Pay as you go
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="__plan__bottom">
          <Typography
            face="Medium"
            color="#9ca3af"
            size="1.6rem"
            height="2rem"
            style={{ fontWeight: "400" }}
          >
            If you don't have a visibility on your yearly needs and still need
            to publish a program or a challenge, or look for an appropriate
            innovation talent to collaborate with now, start with a "pay as you
            go" plan! Get a taste of what we can offer you through our platform!
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default SeekerPlan;
