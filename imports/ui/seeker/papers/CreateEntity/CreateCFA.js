import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import React, { Component } from "react";
import { withRouter } from "react-router";

import ProgramCollection from "/imports/api/Program";

import CreateCFALayout from "../../layouts/CreateCFALayout";
import {
  applicationQuestionsSchema,
  copyrightSchema,
  detailsSchema,
  faqSchema,
  incentiveSchema,
  sidebarSteps,
  targetSchema,
  timelineSchema,
  visualSchema,
} from "./cConfig";

class CreateProgram extends Component {
  userMayBeDone = false;

  state = {
    sidebarSteps: [...sidebarSteps],
    saveState: "",
    canPublish: false,
    isLoading: false,
    // Details
    title: "",
    sector: [],
    context: "",
    contextVideo: "",
    // Visual
    imgId: "",
    // Incentive
    incentive: {
      incubation: "",
      cashPrize: "",
      testProductOnMarket: "",
      equipments: "",
      trainings: "",
      other: "",
    },
    // Copyright
    copyright: "",
    // Timeline
    timeline: [],
    // Faq
    faq: [],
    // Target
    targetAudience: [],
    geographicalScope: [],
    maturityLevel: "",
    capabilities: [],
    criteria: [],
    // Application Questions
    questionsStartup: [],
    questionsDesigner: [],
    questionsDeveloper: [],
    questionsStudent: [],
    questionsResearcher: [],
  };

  componentDidUpdate(previousProps) {
    // - Get Program Data
    const data = this.props.data;
    const oldData = previousProps.data;
    if (!oldData && !!data) {
      this.setState({ ...data }, () => {
        this.onInputValidate();
        this.onInit();
      });
    }
  }

  onInit() {
    const { stepIndex } = this.props;
    const { sidebarSteps } = this.state;
    const currentStep = sidebarSteps[stepIndex];
    const lastStep = sidebarSteps[stepIndex - 1];
    const firstStep = sidebarSteps[0];
    // ...
    if (
      stepIndex > 0 &&
      lastStep &&
      !lastStep.completed &&
      !currentStep.lastStep
    ) {
      const data = this.props.data;
      const id = data._id;
      const path = firstStep.path.replace(":id", id);
      this.props.history.push(path);
    }
  }

  onInputValidate = () => {
    const { error: detailsValidation } = detailsSchema.validate(
      { ...this.state },
      { stripUnknown: true }
    );
    const { error: visualValidation } = visualSchema.validate(
      { ...this.state },
      { stripUnknown: true }
    );
    const { error: incentiveValidation } = incentiveSchema.validate(
      { ...this.state },
      { stripUnknown: true }
    );
    const { error: copyrightValidation } = copyrightSchema.validate(
      { ...this.state },
      { stripUnknown: true }
    );
    const { error: timelineValidation } = timelineSchema.validate(
      { ...this.state },
      { stripUnknown: true }
    );
    const { error: faqValidation } = faqSchema.validate(
      { ...this.state },
      { stripUnknown: true }
    );
    const { error: targetValidation } = targetSchema.validate(
      { ...this.state },
      { stripUnknown: true }
    );
    const {
      error: applicationQuestionsValidation,
    } = applicationQuestionsSchema.validate(
      { ...this.state },
      { stripUnknown: true }
    );
    // ...
    const withouAppQuestions =
      !detailsValidation &&
      !visualValidation &&
      !incentiveValidation &&
      !copyrightValidation &&
      !timelineValidation &&
      !faqValidation &&
      !targetValidation;
    // ...
    const appQuestionsValidation =
      withouAppQuestions && !applicationQuestionsValidation;
    // ...
    const sidebarSteps = this.state.sidebarSteps;
    sidebarSteps[0].completed = !detailsValidation;
    sidebarSteps[1].completed = !visualValidation;
    sidebarSteps[2].completed = !incentiveValidation;
    sidebarSteps[3].completed = !copyrightValidation;
    sidebarSteps[4].completed = !timelineValidation;
    sidebarSteps[5].completed = !faqValidation;
    sidebarSteps[6].completed = !targetValidation;
    sidebarSteps[7].completed = appQuestionsValidation;
    // ...
    const canPublish = withouAppQuestions && appQuestionsValidation;
    // ...
    this.setState((state) => ({
      ...state,
      canPublish,
      sidebarSteps,
    }));
  };

  onInputChange = (inp) => {
    Meteor.clearTimeout(this.userMayBeDone);
    // ...
    this.userMayBeDone = null;
    this.setState(
      (state) => ({
        ...state,
        ...inp,
        saveState: "Saving ...",
      }),
      () => {
        this.onInputValidate();
        this.userMayBeDone = Meteor.setTimeout(() => {
          this.onUpdateProgram();
        }, 1000);
      }
    );
  };

  onUpdateProgram = () => {
    const id = this.props.match.params.id;
    const data = { ...this.state };
    delete data.sidebarSteps;
    delete data.saveState;
    delete data.canPublish;
    delete data.isLoading;
    // ...
    Meteor.call("program.update", { id, data }, (err) => {
      if (err) return;
      this.setState({ saveState: "Saved" });
    });
  };

  onCreateProgram = () => {
    const id = this.props.match.params.id;
    this.setState({ isLoading: true });
    // ...
    Meteor.call("program.publish", { data: { _id: id } }, (err) => {
      if (err) return;
      this.props.history.push(
        `/dashboard/call-for-applications/${id}/cfa-congrats`
      );
    });
  };

  render() {
    const { Paper } = this.props;
    // ...
    return (
      <CreateCFALayout
        stepIndex={this.props.stepIndex}
        sidebarSteps={this.state.sidebarSteps}
        onCreateProgram={this.onCreateProgram}
        data={this.state}
        // ...
        onInputChange={this.onInputChange}
        // ...
        saveState={this.state.saveState}
        canPublish={this.state.canPublish}
        isLoading={this.state.isLoading}
        isOwner={this.props.isOwner}
      >
        <Paper isCFA data={this.state} onInputChange={this.onInputChange} />
      </CreateCFALayout>
    );
  }
}

const CreateProgramT = withTracker(({ Paper, stepIndex, ...props }) => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  const progId = props.match.params.id;
  const handler = Meteor.subscribe("program", {
    progId,
  });
  if (!handler.ready()) {
    return { user, userId, Paper, stepIndex, data: null };
  }
  const data = ProgramCollection.findOne(progId);
  const isOwner = Roles.userIsInRole(userId, ["SEEKER_OWNER"]);
  // ...
  return {
    user,
    userId,
    Paper,
    stepIndex,
    data,
    isOwner,
  };
})(CreateProgram);

export default withRouter(CreateProgramT);
