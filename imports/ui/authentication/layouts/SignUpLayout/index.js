/* eslint-disable sonarjs/cognitive-complexity */
import "./style.scss";

import Box from "@material-ui/core/Box";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import cx from "classnames";
import React, { useEffect, useState } from "react";

import history from "/imports/libs/history";

import Button from "../../../common/Button";
import Logo from "../../../common/Logo";
import NavLink from "../../../common/NavLink";
import Svg from "../../../common/Svg";
import Typography from "../../../common/Typography";

const LayoutFooterMobileBtnBack = ({ stepIndex, onBackStep }) => (
  <Button onClick={() => onBackStep(stepIndex)}>Back</Button>
);

const SignUpLayout = ({
  className,
  stepIndex,
  sidebarStep,
  children,
  onSeekerRegister,
  data,
  onInputChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onSeekerRegisterSubmit = () => {
    setIsLoading(true);
    onSeekerRegister();
  };
  // ...
  const currentStep = sidebarStep[stepIndex];
  // ...
  const onNavigate = (step) => {
    history.push(step.path);
  };
  const onBackStep = (stepIndex) => {
    onNavigate(sidebarStep[stepIndex - 1]);
  };
  const onVerifyStep = (stepIndex) => {
    if (stepIndex === 0) {
      const email = data.email;
      const taxNumber = data.taxRegistrationNumber;
      Meteor.call("user.seeker.verify", { email, taxNumber }, (err, res) => {
        if (err) return;
        // ...
        if (res.user) {
          onInputChange({ emailError: "Email has been used" });
        }
        if (res.tax) {
          onInputChange({
            taxRegistrationNumberError: "Tax registration number has been used",
          });
        }
        if (!res.user && !res.tax) onNavigate(sidebarStep[stepIndex + 1]);
      });
    } else {
      onNavigate(sidebarStep[stepIndex + 1]);
    }
  };
  // ...
  useEffect(() => {
    const container = document.querySelector(".SignUpLayout__content");
    if (container) {
      container.scrollTo(0, 0);
    }
  }, [stepIndex]);
  // ...
  return (
    <Box
      className={cx(
        "SignUpLayout",
        { [className]: !!className },
        // eslint-disable-next-line camelcase
        { __last_step: currentStep.lastStep }
      )}
    >
      <Box className="SignUpLayout__main">
        <Box className="SignUpLayout__sidebar">
          <Box className="SignUpLayout__sidebar__header">
            <Box className="__logo">
              <NavLink to="/">
                <Logo />
              </NavLink>
            </Box>
          </Box>
          <Box className="SignUpLayout__sidebar__links">
            {sidebarStep.map((step, index) => {
              if (!step.isTab) return null;
              return (
                <Box
                  key={index}
                  className={cx("__link", {
                    __active: stepIndex === index,
                    __completed: step.completed,
                  })}
                  onClick={() =>
                    step.completed || stepIndex > index
                      ? onNavigate(step)
                      : null
                  }
                >
                  <Box
                    component="span"
                    className={cx("__link__inner", {
                      __active: stepIndex === index,
                      __kNaN: stepIndex > index,
                      __completed: step.completed,
                    })}
                  >
                    <Box component="span" className="__link__icon">
                      <Svg src={step.icon} />
                    </Box>
                    <Typography
                      name="span"
                      face="Medium"
                      size="1.6rem"
                      height="2rem"
                    >
                      {step.label}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          className={cx("SignUpLayout__content", {
            __SetCall: stepIndex === 2,
          })}
        >
          <Box className="SignUpLayout__content__header">
            <Box className="SignUpLayout__content__header__inner">
              <Typography
                face="Medium"
                size="1.8rem"
                height="2.3rem"
                color="#1E2E41"
              >
                {!!currentStep && currentStep.title}
              </Typography>
            </Box>
          </Box>

          <Box className="SignUpLayout__content__outer">
            {/* <ScrollArea
              momentum
              style={{ flex: 1, width: "100%", height: "100%" }}
            > */}
            <Box
              className={cx("SignUpLayout__content__inner", {
                __SetCall: stepIndex === 2,
              })}
            >
              <Box
                className={cx("SignUpLayout__content__inner__inner", {
                  __SetCall: stepIndex === 2,
                })}
              >
                {children}
              </Box>
            </Box>
            {/* </ScrollArea> */}
          </Box>
        </Box>
      </Box>

      <Box className="SignUpLayout__footer">
        <Box className="SignUpLayout__footer__inner">
          {stepIndex > 0 ? (
            <LayoutFooterMobileBtnBack
              stepIndex={stepIndex}
              onBackStep={onBackStep}
            />
          ) : (
            <div />
          )}
          {(stepIndex === 0 || stepIndex === 1) && (
            <Button
              disabled={!currentStep.completed}
              onClick={() => onVerifyStep(stepIndex)}
            >
              {sidebarStep[stepIndex + 1].label}

              <TrendingFlatIcon />
            </Button>
          )}
          {stepIndex === 2 && (
            <Button
              disabled={!sidebarStep[2].completed}
              onClick={onSeekerRegisterSubmit}
              isLoading={isLoading}
            >
              Finsih
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpLayout;
