import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import { jobPositionOptions } from "/imports/libs/inputs";

import {
  EntryEmail,
  EntryPassword,
  EntrySelect,
  EntryText,
} from "../../../../../common/Entry";

const SeekerCreateAccount = ({ data, onInputChange }) => (
  // ...
  <Box className="SeekerCreateAccount">
    <Box className="__form">
      <EntryText
        onInputChange={onInputChange}
        value={data.firstName}
        name="firstName"
        label="First Name"
        placeholder="Your first name"
        error={data.firstNameDirty && data.firstNameError}
      />
      <EntryText
        onInputChange={onInputChange}
        value={data.lastName}
        name="lastName"
        label="Last Name"
        placeholder="Your last name"
        error={data.lastNameDirty && data.lastNameError}
      />
      <EntryText
        onInputChange={onInputChange}
        value={data.organization}
        name="organization"
        label="Organization"
        placeholder="Your organization name"
        error={data.organizationDirty && data.organizationError}
      />
      <EntryText
        onInputChange={onInputChange}
        value={data.taxRegistrationNumber}
        name="taxRegistrationNumber"
        label="Tax registration number"
        placeholder="Your tax registration number"
        error={
          data.taxRegistrationNumberDirty && data.taxRegistrationNumberError
        }
      />
      <EntrySelect
        label="Job Position"
        name="jobPosition"
        value={data.jobPosition}
        // placeholder="Your position within organization"
        placeholder="Your position"
        options={jobPositionOptions}
        onInputChange={onInputChange}
        error={data.jobPositionDirty && data.jobPositionError}
      />
      <EntryEmail
        name="email"
        value={data.email}
        onInputChange={onInputChange}
        error={data.emailDirty && data.emailError}
      />
      <EntryPassword
        name="password"
        label="Password"
        value={data.password}
        onInputChange={onInputChange}
        error={data.passwordDirty && data.passwordError}
      />
    </Box>
  </Box>
);
export default SeekerCreateAccount;
