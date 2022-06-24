import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import React, { Component } from "react";
import { withRouter } from "react-router";

import ApplicationCollection from "/imports/api/Application";
import ProgramCollection from "/imports/api/Program";
import SolverCollection from "/imports/api/Solver";

import SolverApplyProgramLayout from "../../layouts/SolverApplyProgramLayout";
import {
  detailsSchemaOther,
  detailsSchemaStartup,
  hearAboutUsSchema,
  sidebarStep,
  solutionSchema,
  teamSchemaOther,
  teamSchemaStartup,
} from "./config";

class ApplyProgram extends Component {
  userMayBeDone = false;

  state = {
    sidebarStep: [...sidebarStep],
    canSave: false,
    canPublish: false,
    // Details
    organization: "",
    websiteLink: "",
    foundedDate: "",
    // ...
    firstName: "",
    lastName: "",
    // ...
    country: "",
    city: "",
    jobPosition: "",
    email: "",
    phoneNumber: "",
    // - Solution
    solution: {},
    // - Startup team
    founders: [],
    members: [],
    // hearAboutUs
    hearAboutUs: "",
    hearAboutUsOther: "",
  };

  componentDidUpdate(previousProps) {
    // - Get Application Data
    const data = this.props.application;
    const oldData = previousProps.application;
    if (!oldData && !!data) {
      this.setState({ ...data }, () => {
        this.onInputValidate();
        this.onInit();
      });
    }
  }

  onInit() {
    const { stepIndex, progId, appId } = this.props;
    const { sidebarStep } = this.state;
    const firstStep = sidebarStep[0];
    // ...
    if (stepIndex > 0 && !firstStep.completed) {
      const path = firstStep.path.replace(":id", progId).replace(":aid", appId);
      this.props.history.push(path);
    }
  }

  onInputValidate = () => {
    let errors = [];
    const solverType = this.props.solver?.type;
    const isStartup = solverType?.toLowerCase() === "startup";
    const isDesigner = solverType?.toLowerCase() === "designer";
    const isDeveloper = solverType?.toLowerCase() === "developer";
    const isStudent = solverType?.toLowerCase() === "student";
    const isResearcher = solverType?.toLowerCase() === "researcher";
    // - Program Type
    const isCFA = this.props.program?.isCFA;
    // - QuestionTemplate
    let questionTemplate = [];
    if (isStartup) questionTemplate = this.props.program?.questionsStartup;
    if (isDesigner) questionTemplate = this.props.program?.questionsDesigner;
    if (isDeveloper) questionTemplate = this.props.program?.questionsDeveloper;
    if (isStudent) questionTemplate = this.props.program?.questionsStudent;
    if (isResearcher) {
      questionTemplate = this.props.program?.questionsResearcher;
    }
    // - Accout
    const detailsSchema = isStartup ? detailsSchemaStartup : detailsSchemaOther;
    const { error: detailsValidation } = detailsSchema.validate(
      { ...this.state },
      { stripUnknown: true, abortEarly: false }
    );
    // console.log("#Errors :: ", detailsValidation?.details);
    if (detailsValidation?.details) {
      errors = [...errors, ...detailsValidation.details];
    }

    // - Solution
    const solverSolution = { ...this.state.solution };
    if (isCFA) delete solverSolution.challenges;
    const solutionValidation = solutionSchema({ ...solverSolution, isCFA });
    // - Team
    const teamSchema = isStartup ? teamSchemaStartup : teamSchemaOther;
    const { error: teamValidation } = teamSchema.validate(
      { ...this.state },
      { stripUnknown: true }
    );
    // - hearAboutUs
    const { error: hearAboutUsValidation } = hearAboutUsSchema.validate(
      { ...this.state },
      { stripUnknown: true }
    );
    // CHeck All Temp. Questions
    const slL = Object.keys(solverSolution).length;
    const qTL = questionTemplate
      .filter(
        (k) =>
          k.id !== "founders" && k.id !== "members" && k.id !== "hear-about"
      )
      .filter((q) => q.selected).length;
    // ...
    const preTeamValidation =
      !detailsValidation && !!solutionValidation && slL === qTL;
    // ...
    const { sidebarStep } = this.state;
    sidebarStep[0].completed = !detailsValidation;
    sidebarStep[1].completed = !!solutionValidation && slL === qTL;
    sidebarStep[2].completed = !teamValidation && preTeamValidation;
    sidebarStep[3].completed = !hearAboutUsValidation;
    const canPublish =
      sidebarStep[0].completed &&
      sidebarStep[1].completed &&
      sidebarStep[2].completed &&
      sidebarStep[3].completed;
    // ...
    const displayErrors = {};
    errors.forEach((i) => {
      const name = i.path[0];
      displayErrors[`${name}Error`] = `${name} is required`;
    });
    // ...
    this.setState((state) => ({
      ...state,
      canPublish,
      sidebarStep,
      // ...
      ...displayErrors,
    }));
  };

  onInputChange = (inp) => {
    if (this.props.application?.published) return;
    // ...
    Meteor.clearTimeout(this.userMayBeDone);
    // ...
    this.userMayBeDone = null;
    this.setState(
      (state) => ({
        ...state,
        ...inp,
        canSave: "Saving ...",
      }),
      () => {
        this.onInputValidate();
        this.userMayBeDone = Meteor.setTimeout(() => {
          this.onUpdateSolverApplication();
        }, 1000);
      }
    );
  };

  onUpdateSolverApplication = () => {
    if (this.props.application?.published) return;
    // ...
    const id = this.props.appId;
    const data = { ...this.state };
    delete data.sidebarSteps;
    delete data.canSave;
    delete data.canPublish;
    // ...
    Meteor.call("application.update", { id, data }, (err) => {
      if (err) return;
      this.setState({ canSave: "Saved" });
    });
  };

  onCreateApplication = () => {
    if (this.props.application?.published) return;
    // ...
    const id = this.props.appId;
    const pId = this.props.progId;
    // ...
    Meteor.call("application.publish", { data: { _id: id } }, (err) => {
      if (err) return;
      this.props.history.push(
        `/dashboard/program/${pId}/applications/${id}/congrats`
      );
    });
  };

  render() {
    const { Paper, program, solver, application } = this.props;
    // ...
    return (
      <SolverApplyProgramLayout
        stepIndex={this.props.stepIndex}
        sidebarStep={this.state.sidebarStep}
        data={this.state}
        program={program}
        solver={solver}
        application={application}
        // ...
        canSave={this.state.canSave}
        canPublish={this.state.canPublish}
        onCreateApplication={this.onCreateApplication}
      >
        <Paper
          solverType={solver?.type}
          data={this.state}
          program={program}
          solver={solver}
          onInputChange={this.onInputChange}
          isReady={this.props.isReady}
        />
      </SolverApplyProgramLayout>
    );
  }
}

export default withRouter(
  withTracker(({ Paper, stepIndex, ...props }) => {
    const user = Meteor.user();
    const userId = Meteor.userId();
    const progId = props.match.params.id;
    const appId = props.match.params.aid;
    const handler = Meteor.subscribe("program-solver-apply", {
      progId,
      appId,
    });
    if (!handler.ready()) {
      return {
        user,
        userId,
        Paper,
        stepIndex,
        progId,
        program: null,
        solver: null,
        appId,
        application: null,
        isReady: false,
      };
    }
    const solverId = user.solverId;
    const solver = SolverCollection.findOne(solverId);
    const program = ProgramCollection.findOne(progId);
    const application = ApplicationCollection.findOne({
      _id: appId,
      solverId,
      programId: program._id,
    });
    // ...
    return {
      Paper,
      stepIndex,
      // ...
      progId,
      program,
      solver,
      appId,
      application,
      isReady: true,
    };
  })(ApplyProgram)
);
