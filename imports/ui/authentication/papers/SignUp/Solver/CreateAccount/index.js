import "./style.scss";

import Box from "@material-ui/core/Box";
import React, { useEffect } from "react";

import { jobPositionOptions } from "/imports/libs/inputs";

import {
  EntryEmail,
  EntryPassword,
  EntrySelect,
  EntryText,
} from "../../../../../common/Entry";

const SolverCreateAccount = ({ solverType = "", data, onInputChange }) => {
  const isStartup = solverType.toLowerCase() === "startup";
  const isDesigner = solverType.toLowerCase() === "designer";
  const isDeveloper = solverType.toLowerCase() === "developer";
  const isStudent = solverType.toLowerCase() === "student";
  const isResearcher = solverType.toLowerCase() === "researcher";
  // ...
  useEffect(() => {
    if (isStartup) return;
    // - Init JobPosition
    if (!data.jobPosition) {
      let jobPosition = "";
      if (isDesigner) jobPosition = "designer";
      if (isDeveloper) jobPosition = "developer";
      if (isStudent) jobPosition = "student";
      if (isResearcher) jobPosition = "researcher";
      // ...
      onInputChange({
        jobPosition,
        jobPositionDirty: true,
        jobPositionError: "",
      });
    }
  }, []);
  // ...
  return (
    <Box className="SolverCreateAccount">
      <Box className="__form">
        <EntryText
          onInputChange={onInputChange}
          value={data.firstName}
          name="firstName"
          label="First Name *"
          placeholder="Your first name"
          error={data.firstNameDirty && data.firstNameError}
        />
        <EntryText
          onInputChange={onInputChange}
          value={data.lastName}
          name="lastName"
          label="Last Name *"
          placeholder="Your last name"
          error={data.lastNameDirty && data.lastNameError}
        />
        <EntryEmail
          name="email"
          label="Email *"
          value={data.email}
          onInputChange={onInputChange}
          error={data.emailDirty && data.emailError}
        />
        <EntryPassword
          name="password"
          label="Password *"
          value={data.password}
          onInputChange={onInputChange}
          error={data.passwordDirty && data.passwordError}
        />
        <EntrySelect
          label={
            ((isStartup || isDesigner || isDeveloper) && "Position *") ||
            ((isStudent || isResearcher) && "Title *")
          }
          name="jobPosition"
          value={data.jobPosition}
          placeholder="Your position"
          onInputChange={onInputChange}
          options={jobPositionOptions}
          error={data.jobPositionDirty && data.jobPositionError}
        />
        <EntryText
          onInputChange={onInputChange}
          value={data.phoneNumber}
          name="phoneNumber"
          label="Phone number *"
          placeholder="ex: +216 22 22 22 22"
          error={data.phoneNumberDirty && data.phoneNumberError}
        />
        {!isStartup && (
          <EntryText
            onInputChange={onInputChange}
            value={data.linkedinLink}
            name="linkedinLink"
            label="Linkedin link"
            placeholder="Linkedin link"
            error={data.linkedinLinkDirty && data.linkedinLinkError}
          />
        )}
      </Box>
    </Box>
  );
};
export default SolverCreateAccount;
