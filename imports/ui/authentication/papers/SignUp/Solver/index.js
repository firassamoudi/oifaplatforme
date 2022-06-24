import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import React, { Component } from "react";
import { withRouter } from "react-router";

import FilesCollection from "/imports/api/File";
import { formikErrors } from "/imports/libs/formikErrors";

import SolverSignUpLayout from "../../../layouts/SolverSignUpLayout";
import {
  idxDesignerSchema,
  idxDeveloperSchema,
  idxResearcherSchema,
  idxStartupSchema,
  idxStudentSchema,
  // ...
  sidebarStep,
} from "./config";

class SignUpSolver extends Component {
  state = {
    sidebarStep: [...sidebarStep],
    // Solver Type
    type: "",
    // Account
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    jobPosition: "",
    phoneNumber: "",
    linkedinLink: "",
    // Details
    country: "",
    city: "",
    organization: "",
    websiteLink: "",
    foundedDate: null,
    description: "",
    sector: [],
    maturityLevel: "",
    capabilities: [],
    degree: "",
    expertise: "",
    institution: "",
    yearsToGraduate: "",
    internship: "",
    openInnovationExperience: "",
    // - Track Record
    trackRecordNbClient: "",
    trackRecordClientsPartners: "",
    trackRecordCommunitySize: "",
    trackRecordRevenue: "",
    pitchDeck: "",
    demoLink: "",
    // ...
    portfolioLink: "",
    trackRecord: "",
    trackRecordFiles: [],
    // - Startup team
    founders: [],
    members: [],
    // hearAboutUs
    hearAboutUs: "",
    hearAboutUsOther: "",
    // - booked
    booked: false,
  };

  UNSAFE_componentWillMount() {
    const { stepIndex } = this.props;
    const { sidebarStep } = this.state;
    const firstStep = sidebarStep[0];
    // ...
    if (stepIndex > 0 && !firstStep.completed) {
      this.props.history.push(firstStep.path);
    }
  }

  onInputValidate = () => {
    const idx = this.props.stepIndex;
    let idxSchema = [];
    // ...
    const isStartup = this.state.type === "Startup";
    const isDesigner = this.state.type === "Designer";
    const isDeveloper = this.state.type === "Developer";
    const isStudent = this.state.type === "Student";
    const isResearcher = this.state.type === "Researcher";
    // ...
    if (isStartup) idxSchema = idxStartupSchema;
    if (isDesigner) idxSchema = idxDesignerSchema;
    if (isDeveloper) idxSchema = idxDeveloperSchema;
    if (isStudent) idxSchema = idxStudentSchema;
    if (isResearcher) idxSchema = idxResearcherSchema;
    // ...
    if (!idxSchema[idx]) return;
    idxSchema[idx]
      .validate({ ...this.state }, { stripUnknown: true, abortEarly: false })
      .then(() => {
        const { sidebarStep } = this.state;
        sidebarStep[idx].completed = true;
        this.setState((state) => ({ ...state, sidebarStep }));
      })
      .catch((err) => {
        const errors = formikErrors(err);
        const { sidebarStep } = this.state;
        sidebarStep[idx].completed = false;
        // ...
        this.setState((state) => ({ ...state, sidebarStep, ...errors }));
      });
  };

  onInputChange = (inp) => {
    this.setState((state) => ({ ...state, ...inp }), this.onInputValidate);
  };

  onUploadFiles = ({ files }) => {
    const _this = this;
    files.forEach((file) => {
      FilesCollection.insert({
        file,
        streams: "dynamic",
        chunkSize: "dynamic",
        onStart() {},
        onUploaded(error, fileObj) {
          const id = fileObj._id;
          _this.setState((state) => ({
            trackRecordFiles: [...state.trackRecordFiles, id],
          }));
        },
      });
    });
  };

  onDeleteFile = (index) => {
    const id = this.state.trackRecordFiles[index];
    FilesCollection.remove(id);
    // ...
    this.setState((state) => ({
      trackRecordFiles: [
        ...state.trackRecordFiles.filter((id) => id !== index),
      ],
    }));
  };

  onSolverRegister = () => {
    const data = { ...this.state };
    // ...
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      jobPosition: data.jobPosition,
      email: data.email,
      password: data.password,
    };
    const solver = { ...data };
    // ...
    Meteor.call("user.solver.register", { user, solver }, (err) => {
      if (err) return;
      this.props.history.push("/auth/register/email-confirmation");
    });
  };

  render() {
    const { Paper } = this.props;
    // ...
    return (
      <SolverSignUpLayout
        stepIndex={this.props.stepIndex}
        sidebarStep={this.state.sidebarStep}
        onSolverRegister={this.onSolverRegister}
        data={this.state}
        onInputChange={this.onInputChange}
      >
        <Paper
          solverType={this.state.type}
          data={this.state}
          onInputChange={this.onInputChange}
          onUploadFiles={this.onUploadFiles}
          onDeleteFile={this.onDeleteFile}
        />
      </SolverSignUpLayout>
    );
  }
}

export default withRouter(
  withTracker(({ Paper, stepIndex }) => {
    return {
      Paper,
      stepIndex,
    };
  })(SignUpSolver)
);
