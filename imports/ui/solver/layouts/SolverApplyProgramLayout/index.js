import "./style.scss";

import Box from "@material-ui/core/Box";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
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
  <Box className="SolverApplyProgramLayout__sidebar__header">
    <Box className="__logo">
      <NavLink to="/">
        <Logo />
      </NavLink>
    </Box>
  </Box>
);

const LayoutSidebarLink = ({ index, step, solver, stepIndex, onNavigate }) => (
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
        {step.label && step.label.replace("###", solver?.type || "")}
      </Typography>
    </Box>
  </Box>
);

const LayoutContentHeader = ({
  canSave,
  canPublish,
  onCreateApplication,
  published,
  // ...
  program,
}) => (
  <Box className="SolverApplyProgramLayout__content__header">
    <Box className="SolverApplyProgramLayout__content__header__inner">
      <NavLink
        to={`/dashboard/i/program-overview/${program?._id}`}
        className="CreateProgramLayout__content__header__title"
      >
        <KeyboardArrowLeftIcon />
        <Typography face="Medium" size="1.5rem" height="2rem" color="#8389ab">
          Back to program
        </Typography>
      </NavLink>
      <Box className="CreateProgramLayout__content__header__btns">
        <Typography
          face="Medium"
          size="1.5rem"
          height="2rem"
          color="#8389ab"
          style={{ minWidth: "8rem" }}
        >
          {canSave}
        </Typography>
        {!published && (
          <Button
            small
            disabled={!canPublish}
            style={{ margin: "0 0 0 2rem" }}
            onClick={onCreateApplication}
          >
            Submit
          </Button>
        )}
      </Box>
    </Box>
  </Box>
);

const LayoutFooterBtnNext = ({
  stepIndex,
  nextIndex,
  currentStep,
  sidebarStep,
  solver,
  onVerifyStep,
}) => (
  <Button
    disabled={!currentStep.completed}
    onClick={() => onVerifyStep(stepIndex)}
  >
    {sidebarStep[nextIndex].label &&
      sidebarStep[nextIndex].label.replace("###", solver?.type || "")}

    <TrendingFlatIcon />
  </Button>
);

const LayoutFooterBtnFinish = ({
  published,
  canPublish,
  onCreateApplication,
}) => {
  if (published) return null;
  return (
    <Button disabled={!canPublish} onClick={onCreateApplication}>
      Submit
    </Button>
  );
};

const SolverApplyProgramLayout = ({
  className,
  stepIndex,
  sidebarStep,
  children,
  data,
  program,
  solver,
  application,
  // ...
  canSave,
  canPublish,
  onCreateApplication,
}) => {
  const nextIndex = stepIndex + 1;
  const currentStep = sidebarStep[stepIndex];
  const onNavigate = (step) => {
    const path = step.path
      .replace(":id", program._id)
      .replace(":aid", application._id);
    history.push(path);
  };
  const onVerifyStep = (stepIndex) => {
    const next = stepIndex + 1;
    onNavigate(sidebarStep[next]);
  };
  // - Publish program
  const [published, setPublished] = useState(data?.published);
  useEffect(() => {
    setPublished(data?.published);
  }, [data]);
  // ...
  // ...
  return (
    <Box
      className={cx("SolverApplyProgramLayout", { [className]: !!className })}
    >
      <Box className="SolverApplyProgramLayout__main">
        <Box className="SolverApplyProgramLayout__sidebar">
          <LayoutHeader />
          <Box className="SolverApplyProgramLayout__sidebar__links">
            {sidebarStep.map((step, index) => {
              if (!step.isTab) return null;
              return (
                <LayoutSidebarLink
                  key={index}
                  index={index}
                  stepIndex={stepIndex}
                  step={step}
                  solver={solver}
                  onNavigate={onNavigate}
                />
              );
            })}
          </Box>
        </Box>

        <Box className="SolverApplyProgramLayout__content">
          <LayoutContentHeader
            currentStep={currentStep}
            data={data}
            canSave={canSave}
            canPublish={canPublish}
            onCreateApplication={onCreateApplication}
            published={published}
            program={program}
          />
          <Box className="SolverApplyProgramLayout__content__outer">
            <ScrollArea
              momentum
              style={{ flex: 1, width: "100%", height: "100%" }}
            >
              <Box className="SolverApplyProgramLayout__content__inner">
                <Box className="SolverApplyProgramLayout__content__inner__inner">
                  {children}
                </Box>
              </Box>
            </ScrollArea>
          </Box>
        </Box>
      </Box>
      <Box className="SolverApplyProgramLayout__footer">
        <Box className="SolverApplyProgramLayout__footer__inner">
          {stepIndex !== 3 && (
            <LayoutFooterBtnNext
              stepIndex={stepIndex}
              nextIndex={nextIndex}
              currentStep={currentStep}
              sidebarStep={sidebarStep}
              solver={solver}
              onVerifyStep={onVerifyStep}
            />
          )}
          {stepIndex === 3 && (
            <LayoutFooterBtnFinish
              published={published}
              canPublish={canPublish}
              onCreateApplication={onCreateApplication}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SolverApplyProgramLayout;
