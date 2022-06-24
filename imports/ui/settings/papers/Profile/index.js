import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";

import SeekerCollection from "/imports/api/Seeker";
import SolverCollection from "/imports/api/Solver";
import { jobPositionOptions } from "/imports/libs/inputs";

import Button from "../../../common/Button";
import { EntryEmail, EntrySelect, EntryText } from "../../../common/Entry";
import Typography from "../../../common/Typography";

const trimValue = (value) => value?.trim();

const isValidForm = (type, form) => {
  const {
    profile: { firstName, lastName },
    jobPosition,
  } = form;
  // ...
  const baseCheck = !!trimValue(firstName) && !!trimValue(lastName);
  // ...
  return type ? baseCheck && trimValue(jobPosition) : baseCheck;
};

const Profile = ({
  user,
  // ...
  isSeeker,
  isSolver,
  // ...
  seeker,
  solver,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // ...
  const [form, setForm] = useState({ profile: {}, jobPosition: "" });
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [newEmailError, setNewEmailError] = useState("");
  const onProfileChange = (inp) => {
    setIsSuccess(false);
    setForm((state) => ({ ...state, profile: { ...state.profile, ...inp } }));
  };
  const onInputChange = (inp) => {
    setIsSuccess(false);
    setForm((state) => ({ ...state, ...inp }));
  };
  // - Reflect Changes
  const onUpdateProfile = () => {
    setIsLoading(true);
    // ...
    const data = {
      firstName: form.profile.firstName,
      lastName: form.profile.lastName,
      jobPosition: form.jobPosition,
    };
    Meteor.call("user.settings.profile", { data }, () => {
      setIsLoading(false);
      setIsSuccess(true);
    });
    // ...
    if (isSeeker) {
      Meteor.call("user.settings.profile.seeker", { data });
    }
    if (isSolver) {
      Meteor.call("user.settings.profile.solver", { data });
    }
  };
  // - Add new email
  const onNewEmailChange = (inp) => {
    const email = inp.email;
    setNewEmail(email);
    setNewEmailError("");
  };
  const onAddNewEmailSubmit = () => {
    const email = newEmail;
    // - IsValidEmail
    const re = /\S+@\S+\.\S+/;
    const validEmail = re.test(email);
    if (!validEmail) return setNewEmailError("Add a valid email");
    // - IsValidEmail
    let foundEmail = false;
    emails.forEach((em) => {
      if (em.address === email) foundEmail = true;
    });
    if (foundEmail) return setNewEmailError("You already own this email");
    // ...
    setNewEmail("");
    // ...
    Meteor.call("user.settings.emails.new", { email }, (err) => {
      if (err) setNewEmailError("Email is used.");
      setIsLoading(false);
    });
  };
  const onAddNewEmailInvite = (email) => {
    Meteor.call("user.settings.emails.new.invite", { email });
  };
  const onPrimaryEmailSubmit = (email) => {
    Meteor.call("user.settings.emails.primary", { email });
  };
  const onRemoveEmailSubmit = (email) => {
    Meteor.call("user.settings.emails.remove", { email });
  };
  // - hasJobPosition
  const hasJobPosition = isSeeker || isSolver;
  // - Validate Form
  const isValid = isValidForm(hasJobPosition, form);
  // ...
  useEffect(() => {
    const profile = user?.profile ?? { firstName: "", lastName: "" };
    const emails = user?.emails ?? [];
    // - jobPosition
    let jobPosition = "";
    if (hasJobPosition && isSeeker) jobPosition = seeker?.jobPosition;
    if (hasJobPosition && isSolver) jobPosition = solver?.jobPosition;
    // // ...
    setForm({ profile, jobPosition });
    setEmails(emails);
  }, [user]);
  // ...
  return (
    <Box className="Settings__Profile">
      <EntryText
        className="__halfEntry"
        name="firstName"
        label="First Name"
        placeholder="Your first name"
        value={form.profile.firstName}
        onInputChange={onProfileChange}
      />
      <EntryText
        className="__halfEntry"
        name="lastName"
        label="Last Name"
        placeholder="Your last name"
        value={form.profile.lastName}
        onInputChange={onProfileChange}
      />

      {hasJobPosition && (
        <EntrySelect
          label="Job Position"
          name="jobPosition"
          placeholder="Your job position"
          value={form.jobPosition}
          options={jobPositionOptions}
          onInputChange={onInputChange}
        />
      )}

      <Box className="Settings__Profile__emails">
        <Typography
          face="Medium"
          size="1.5rem"
          height="2rem"
          color="#243160"
          style={{ margin: "2rem 0" }}
        >
          Email addresses
        </Typography>

        {emails.map((email, index) => {
          const isVerified = email.verified;
          const isPrimary = index === 0;
          // ...
          return (
            <Box key={index} className="email__item">
              <Box className="email__item__address">{email.address}</Box>
              {isPrimary && (
                <Box className="email__item__actions">
                  <span style={{ cursor: "default" }}>Primary</span>
                </Box>
              )}
              {!isPrimary && (
                <Box className="email__item__actions">
                  {!isVerified && (
                    <span onClick={() => onAddNewEmailInvite(email.address)}>
                      Resend invitation
                    </span>
                  )}
                  {isVerified && (
                    <span onClick={() => onPrimaryEmailSubmit(email.address)}>
                      Make primary
                    </span>
                  )}
                  <span onClick={() => onRemoveEmailSubmit(email.address)}>
                    Remove
                  </span>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      <EntryEmail
        className="__AddNewEntry"
        name="email"
        label="New email"
        placeholder="Add new email"
        value={newEmail}
        error={newEmailError}
        onInputChange={onNewEmailChange}
      />

      <Typography
        face="Medium"
        size="1.4rem"
        height="2rem"
        color="#243160"
        style={{ margin: "2rem 0 4rem 0", cursor: "pointer" }}
        onClick={onAddNewEmailSubmit}
      >
        + Add a new email
      </Typography>

      <Box className="Settings__footer">
        <Box className="Settings__footer__inner">
          {!!isSuccess && (
            <Typography
              face="Medium"
              size="1.4rem"
              height="1.6rem"
              style={{
                color: "#ffc857",
                minHeight: "1.6rem",
              }}
            >
              You profile has been changed successfully
            </Typography>
          )}
          <Button
            isLoading={isLoading}
            disabled={!isValid}
            onClick={onUpdateProfile}
            style={{ height: "5rem" }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  const handle = Meteor.subscribe("_roles");
  if (!handle.ready()) return { user, userId };
  // ...
  const isSeeker = Roles.userIsInRole(userId, ["SEEKER_OWNER"]);
  const isSolver = Roles.userIsInRole(userId, ["SOLVER_OWNER"]);
  // ...
  const seeker = SeekerCollection.findOne({ _id: user?.seekerId });
  const solver = SolverCollection.findOne({ _id: user?.solverId });
  // ...
  return {
    user,
    // ...
    isSeeker,
    isSolver,
    // ...
    seeker,
    solver,
  };
})(Profile);
