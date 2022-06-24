/* eslint-disable sonarjs/cognitive-complexity */
import "./style.scss";

import Box from "@material-ui/core/Box";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useRef, useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import history from "/imports/libs/history";

import Button from "../../../common/Button";
import Logo from "../../../common/Logo";
import NavLink from "../../../common/NavLink";
import Svg from "../../../common/Svg";
import Typography from "../../../common/Typography";
import store from "../../store";

const ActionsBarTxt = ({ label }) => (
  <Typography
    face="Medium"
    size="1.6rem"
    height="2rem"
    color="#f9bf58"
    style={{ textTransform: "initial" }}
  >
    {label}
  </Typography>
);

const ActionsBar = ({ label, disabled, handler }) => (
  <Box className="__faq">
    {!disabled && (
      <Button
        trans
        disabled={disabled}
        style={{ padding: "0" }}
        onClick={handler}
      >
        <AddIcon
          style={{
            color: "#f9bf58",
            fontSize: "2rem",
            margin: "0 0.4rem 0 0",
          }}
        />
        <ActionsBarTxt label={label} />
      </Button>
    )}
    {disabled && (
      <ActionsBarTxt label="You've reashed the limit of questions." />
    )}
  </Box>
);

const CreateProgramLayout = ({
  className,
  stepIndex,
  sidebarSteps,
  children,
  onCreateProgram,
  data,
  // ...
  onAddNewChallenge,
  // ...
  saveState,
  canPublish,
  // ...
  challengeModal,
  // ...
  isLoading,
  isOwner,
}) => {
  const scrollBarRef = useRef();
  // ...
  const currentStep = sidebarSteps[stepIndex];
  const nextStep = sidebarSteps[stepIndex + 1];
  // ...
  const onNavigate = (step) => {
    const id = data._id;
    const path = step.path.replace(":id", id);
    // ...
    if (stepIndex === 7) {
      store.set("challenge", { open: false, id: null });
    }
    // ...
    history.push(path);
    scrollBarRef.current.scrollTo(0, 0);
  };
  // - Publish program
  const [published, setPublished] = useState(data?.published);
  useEffect(() => {
    setPublished(data?.published);
  }, [data]);
  // ...
  return (
    <Box
      className={cx(
        "CreateProgramLayout",
        { [className]: !!className },
        // eslint-disable-next-line camelcase
        { __last_step: currentStep.lastStep }
      )}
    >
      <Box className="CreateProgramLayout__main">
        <Box className="CreateProgramLayout__sidebar">
          <Box className="CreateProgramLayout__sidebar__header">
            <Box className="__logo">
              <NavLink to="/dashboard/programs">
                <Logo />
              </NavLink>
            </Box>
          </Box>
          {!currentStep.lastStep && (
            <Box className="CreateProgramLayout__sidebar__links">
              {sidebarSteps
                .filter((step) => step.isTab)
                .map((step, index) => (
                  <Box
                    key={index}
                    to={step.path}
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
                ))}
            </Box>
          )}
        </Box>
        <Box className="CreateProgramLayout__content">
          <Box
            className="CreateProgramLayout__content__header"
            style={{ visibility: challengeModal.open ? "hidden" : "visible" }}
          >
            <Box className="CreateProgramLayout__content__header__inner">
              <NavLink
                to="/dashboard/programs"
                className="CreateProgramLayout__content__header__title"
              >
                <KeyboardArrowLeftIcon />
                <Typography
                  face="Medium"
                  size="1.5rem"
                  height="2rem"
                  color="#8389ab"
                >
                  All Programs
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
                  {saveState}
                </Typography>
                {!published && (
                  <Button
                    small
                    disabled={!canPublish || !isOwner}
                    style={{ margin: "0 0 0 2rem" }}
                    onClick={onCreateProgram}
                    isLoading={isLoading}
                  >
                    Publish
                  </Button>
                )}
              </Box>
            </Box>
          </Box>

          <Box className="CreateProgramLayout__content__outer">
            {(stepIndex === 5 ||
              (stepIndex === 7 && !challengeModal.open) ||
              stepIndex === 8) && (
              <Box className="CreateProgramLayout__content__actions">
                <Box className="CreateProgramLayout__content__actions__inner">
                  {stepIndex === 5 && (
                    <ActionsBar
                      label="Add a new FAQ"
                      disabled={data.faq && data.faq.length >= 13}
                      handler={() => {
                        store.set("faq", { open: true, id: null });
                      }}
                    />
                  )}
                  {stepIndex === 7 && (
                    <ActionsBar
                      label="Add your own challenge"
                      handler={onAddNewChallenge}
                    />
                  )}
                  {stepIndex === 8 && (
                    <ActionsBar
                      label="Add your own question"
                      handler={() => {
                        store.set("question", { open: true, id: null });
                      }}
                    />
                  )}
                </Box>
              </Box>
            )}

            <ScrollArea
              ref={scrollBarRef}
              style={{ flex: 1, width: "100%", height: "100%" }}
            >
              <Box className="CreateProgramLayout__content__inner">
                <Box className="CreateProgramLayout__content__inner__inner">
                  {children}
                </Box>
              </Box>
            </ScrollArea>
          </Box>
        </Box>
      </Box>

      {!currentStep.lastStep && (
        <Box className="CreateProgramLayout__footer">
          <Box className="CreateProgramLayout__footer__inner">
            <Box className="__assistance">
              <Typography
                face="Medium"
                size="1.4rem"
                height="1.4rem"
                color="#212b37"
                style={{ textTransform: "capitalize" }}
              >
                {/* Need assistance? */}
              </Typography>
            </Box>

            {!!nextStep && stepIndex <= 7 && (
              <Button
                disabled={!sidebarSteps[stepIndex].completed}
                onClick={() => onNavigate(nextStep)}
              >
                {nextStep.label}

                <TrendingFlatIcon />
              </Button>
            )}

            {stepIndex === 8 && !published && (
              <Button
                disabled={!canPublish || !isOwner}
                onClick={onCreateProgram}
                isLoading={isLoading}
              >
                Publish
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default withTracker((props) => {
  const challengeModal = store.get("challenge");
  // ...
  return {
    ...props,
    challengeModal,
  };
})(CreateProgramLayout);
