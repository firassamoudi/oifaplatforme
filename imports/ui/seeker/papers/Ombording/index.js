import { withTracker } from "meteor/react-meteor-data";
import React, { Component } from "react";
import { withRouter } from "react-router";

import SeekerCollection from "/imports/api/Seeker";
import { formikErrors } from "/imports/libs/formikErrors";

import OnbordingLayout from "../../layouts/OnbordingLayout";
import { createProfileSchema } from "./config";

class OnbordingSeeker extends Component {
  state = {
    // ...
    createProfileValidate: false,
    // - Seeker Logo
    imgId: "",
    // - Account / Profile
    firstName: "",
    lastName: "",
    organization: "",
    taxRegistrationNumber: "",
    jobPosition: "",
    email: "",
    // ...
    websiteLink: "",
    description: "",
    sector: [],
    operateCountries: [],
    interestedMarket: [],
    headOffice: "",
    address: "",
    city: "",
    postalCode: "",
    interestedTheme: [],
    // ...
    init: false,
  };

  componentDidUpdate() {
    const stepIndex = this.props.stepIndex;
    // ...
    const user = this.props.user;
    const seekerData = this.props.seeker;
    // ...
    if (!this.state.init) {
      const profile = user.profile;
      const email = user.emails[0].address;
      this.setState({ ...seekerData, ...profile, email, init: true }, () => {
        this.onInputValidate();
      });
    }
    // ...
    if (stepIndex && user && !user.omborded) {
      this.props.history.push("/dashboard/ombording/create-profile");
    }
  }

  onInputValidate = () => {
    createProfileSchema
      .validate({ ...this.state }, { stripUnknown: true, abortEarly: false })
      .then(() => {
        this.setState((state) => ({
          ...state,
          createProfileValidate: true,
        }));
      })
      .catch((err) => {
        const errors = formikErrors(err);
        // ...
        this.setState((state) => ({
          ...state,
          createProfileValidate: false,
          ...errors,
        }));
      });
  };

  onInputChange = (inp) => {
    this.setState((state) => ({ ...state, ...inp }), this.onInputValidate);
  };

  onImgChange = (inp) => {
    const data = inp.imgId;
    Meteor.call("seeker.update.img", { data }, (err) => {
      if (err) return;
      this.onInputChange(inp);
    });
  };

  onCreateProfile = ({ to }) => {
    const data = {
      ...this.state,
    };
    // ...
    Meteor.call("seeker.update", { data }, (err) => {
      if (err) return;
      this.props.history.push(to);
    });
  };

  render() {
    const { Paper } = this.props;
    // ...
    return (
      <OnbordingLayout
        stepIndex={this.props.stepIndex}
        createProfileValidate={this.state.createProfileValidate}
        onCreateProfile={this.onCreateProfile}
      >
        <Paper
          data={this.state}
          onImgChange={this.onImgChange}
          onInputChange={this.onInputChange}
        />
      </OnbordingLayout>
    );
  }
}

export default withRouter(
  withTracker(({ Paper, stepIndex, ...props }) => {
    const user = Meteor.user();
    const userId = Meteor.userId();
    let seeker = null;
    if (user) {
      const seekerId = user.seekerId;
      seeker = SeekerCollection.findOne(seekerId);
    }
    // ...
    return {
      user,
      userId,
      seeker,
      Paper,
      stepIndex,
      ...props,
    };
  })(OnbordingSeeker)
);
