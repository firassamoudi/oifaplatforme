import "./style.scss";

import Box from "@material-ui/core/Box";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import cx from "classnames";
import React, { useEffect, useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import history from "/imports/libs/history";

import Button from "../../../common/Button";
import Logo from "../../../common/Logo";
import NavLink from "../../../common/NavLink";
import Svg from "../../../common/Svg";
import Typography from "../../../common/Typography";

const LayoutHeader = () => (
  <Box className="SolverSignUpLayout__sidebar__header">
    <Box className="__logo">
      <NavLink to="/">
        <Logo />
      </NavLink>
    </Box>
  </Box>
);

const LayoutSidebarLink = ({ index, step, data, stepIndex, onNavigate }) => (
  <Box
    className={cx("__link", {
      __active: stepIndex === index,
      __completed: step.completed,
    })}
    onClick={() =>
      step.completed || stepIndex > index ? onNavigate(step) : null
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
      <Typography name="span" face="Medium" size="1.6rem" height="2rem">
        {step.label && step.label.replace("###", data.type)}
      </Typography>
    </Box>
  </Box>
);

const LayoutContentHeader = ({ currentStep, data }) => (
  <Box className="SolverSignUpLayout__content__header">
    <Box className="SolverSignUpLayout__content__header__inner">
      <Typography face="Medium" size="1.8rem" height="2.3rem" color="#1E2E41">
        {!!currentStep &&
          currentStep.title &&
          currentStep.title.replace("###", data.type.toLowerCase())}
      </Typography>
    </Box>
  </Box>
);

const LayoutFooterMobileBtnBack = ({ stepIndex, onBackStep }) => (
  <Button onClick={() => onBackStep(stepIndex)}>Back</Button>
);

const LayoutFooterBtnNext = ({
  stepIndex,
  nextIndex,
  currentStep,
  sidebarStep,
  data,
  onVerifyStep,
}) => (
  <Button
    disabled={!currentStep.completed}
    onClick={() => onVerifyStep(stepIndex)}
  >
    {sidebarStep[nextIndex].label &&
      sidebarStep[nextIndex].label.replace("###", data.type)}

    <TrendingFlatIcon />
  </Button>
);

const LayoutFooterBtnFinish = ({
  sidebarStep,
  onSolverRegisterSubmit,
  isLoading,
}) => (
  <Button
    disabled={!sidebarStep[6].completed}
    onClick={onSolverRegisterSubmit}
    isLoading={isLoading}
  >
    Finsih
  </Button>
);

const SolverSignUpLayout = ({
  className,
  stepIndex,
  sidebarStep,
  children,
  onSolverRegister,
  data,
  onInputChange,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onSolverRegisterSubmit = () => {
    onSolverRegister();
    setIsLoading(true);
  };
  // ...
  const isStartup = data.type === "Startup";
  let nextIndex = stepIndex + 1;
  if (nextIndex === 4 && !isStartup) nextIndex += 1;
  const currentStep = sidebarStep[stepIndex];
  const noSidebar = sidebarStep[stepIndex].noSidebar;
  const onNavigate = (step) => {
    history.push(step.path);
  };
  const onBackStep = (stepIndex) => {
    onNavigate(sidebarStep[stepIndex - 1]);
  };
  const onVerifyStep = (stepIndex) => {
    if (stepIndex === 1) {
      const email = data.email;
      Meteor.call("user.verify", { email }, (err, res) => {
        if (err) return;
        if (res.user) {
          onInputChange({ emailError: "Email has been used" });
        } else {
          onNavigate(sidebarStep[stepIndex + 1]);
        }
      });
    } else {
      let next = stepIndex + 1;
      if (next === 4 && !isStartup) next += 1;
      onNavigate(sidebarStep[next]);
    }
  };
  // ...
  useEffect(() => {
    const container = document.querySelector(".SolverSignUpLayout__content");
    if (container) {
      container.scrollTo(0, 0);
    }
  }, [stepIndex]);
  // ...
  return (
    <Box className={cx("SolverSignUpLayout", { [className]: !!className })}>
      <Box className="SolverSignUpLayout__main">
        {!noSidebar && (
          <Box className="SolverSignUpLayout__sidebar">
            <LayoutHeader />
            <Box className="SolverSignUpLayout__sidebar__links">
              {sidebarStep.map((step, index) => {
                if (!step.isTab) return null;
                if (index === 4 && !isStartup) return null;
                return (
                  <LayoutSidebarLink
                    key={index}
                    index={index}
                    stepIndex={stepIndex}
                    step={step}
                    data={data}
                    onNavigate={onNavigate}
                  />
                );
              })}
            </Box>
          </Box>
        )}

        <Box
          className={cx("SolverSignUpLayout__content", {
            __full: noSidebar,
            __SetCall: stepIndex === 6,
          })}
        >
          <LayoutContentHeader currentStep={currentStep} data={data} />
          <Box className="SolverSignUpLayout__content__outer">
            {/* <ScrollArea
              momentum
              style={{ flex: 1, width: "100%", height: "100%" }}
            > */}
            <Box
              className={cx("SolverSignUpLayout__content__inner", {
                __SolverTypes: stepIndex === 0,
                __SetCall: stepIndex === 6,
              })}
            >
              <Box
                className={cx("SolverSignUpLayout__content__inner__inner", {
                  __SolverTypes: stepIndex === 0,
                  __SetCall: stepIndex === 6,
                })}
              >
                {children}
              </Box>
            </Box>
            {/* </ScrollArea> */}
          </Box>
        </Box>
      </Box>
      <Box className="SolverSignUpLayout__footer">
        <Box className="SolverSignUpLayout__footer__inner">
          {stepIndex > 0 ? (
            <LayoutFooterMobileBtnBack
              stepIndex={stepIndex}
              onBackStep={onBackStep}
            />
          ) : (
            <div />
          )}
          {stepIndex !== 6 && (
            <LayoutFooterBtnNext
              stepIndex={stepIndex}
              nextIndex={nextIndex}
              currentStep={currentStep}
              sidebarStep={sidebarStep}
              data={data}
              onVerifyStep={onVerifyStep}
            />
          )}
          {stepIndex === 6 && (
            <LayoutFooterBtnFinish
              isStartup={isStartup}
              sidebarStep={sidebarStep}
              onSolverRegisterSubmit={onSolverRegisterSubmit}
              isLoading={isLoading}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SolverSignUpLayout;
