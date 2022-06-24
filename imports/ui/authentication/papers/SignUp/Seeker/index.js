import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import React, { Component } from "react";
import { withRouter } from "react-router";

import { formikErrors } from "/imports/libs/formikErrors";

import SignUpLayout from "../../../layouts/SignUpLayout";
import {
  bookedSchema,
  createAccountSchema,
  planSchema,
  sidebarStep,
} from "./config";

class SignUpSeeker extends Component {
  state = {
    sidebarStep: [...sidebarStep],
    // ...
    firstName: "",
    lastName: "",
    organization: "",
    taxRegistrationNumber: "",
    taxRegistrationNumberError: "",
    jobPosition: "",
    email: "",
    emailError: "",
    password: "",
    // ...
    plan: "",
    // ...
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
    const idxSchema = [createAccountSchema, planSchema, bookedSchema];
    // ...
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

  onSeekerRegister = () => {
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };
    const seeker = {
      organization: this.state.organization,
      taxRegistrationNumber: this.state.taxRegistrationNumber,
      jobPosition: this.state.jobPosition,
      plan: this.state.plan,
      booked: this.state.booked,
    };
    // ...
    Meteor.call("user.seeker.register", { user, seeker }, (err) => {
      if (err) return;
      this.props.history.push("/auth/register/email-confirmation");
    });
  };

  render() {
    const { Paper } = this.props;
    // ...
    return (
      <SignUpLayout
        stepIndex={this.props.stepIndex}
        sidebarStep={this.state.sidebarStep}
        onSeekerRegister={this.onSeekerRegister}
        data={this.state}
        onInputChange={this.onInputChange}
      >
        <Paper data={this.state} onInputChange={this.onInputChange} />
      </SignUpLayout>
    );
  }
}

export default withRouter(
  withTracker(({ Paper, stepIndex }) => {
    const user = Meteor.user();
    // ...
    return {
      user,
      Paper,
      stepIndex,
    };
  })(SignUpSeeker)
);
