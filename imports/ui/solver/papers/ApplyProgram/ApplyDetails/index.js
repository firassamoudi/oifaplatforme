import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import { countriesOptions, jobPositionOptions } from "/imports/libs/inputs";

import {
  EntryDate,
  EntryEmail,
  EntrySelect,
  EntryText,
} from "../../../../common/Entry";

const ApplyDetails = ({ solverType, data, onInputChange }) => {
  const isStartup = solverType?.toLowerCase() === "startup";
  const isDesigner = solverType?.toLowerCase() === "designer";
  const isDeveloper = solverType?.toLowerCase() === "developer";
  const isStudent = solverType?.toLowerCase() === "student";
  const isResearcher = solverType?.toLowerCase() === "researcher";
  // ...
  return (
    <Box className="ApplyDetails">
      <Box className="__form">
        {isStartup && (
          <>
            <EntryText
              onInputChange={onInputChange}
              value={data.organization}
              name="organization"
              label="Startup name *"
              placeholder="Startup name"
              error={data.organizationError}
            />
            <EntryText
              className="__halfEntry"
              onInputChange={onInputChange}
              value={data.websiteLink}
              name="websiteLink"
              label="Website link *"
              placeholder="websiteLink"
              error={data.websiteLinkError}
            />
            <EntryDate
              className="__halfEntry"
              onInputChange={onInputChange}
              value={data.foundedDate}
              name="foundedDate"
              label="Founded date *"
              placeholder="founded date"
              error={data.foundedDateError}
            />
          </>
        )}
        {!isStartup && (
          <>
            <EntryText
              className="__halfEntry"
              onInputChange={onInputChange}
              value={data.firstName}
              name="firstName"
              label="First Name *"
              placeholder="Your first name"
              error={data.firstNameError}
            />
            <EntryText
              className="__halfEntry"
              onInputChange={onInputChange}
              value={data.lastName}
              name="lastName"
              label="Last Name *"
              placeholder="Your last name"
              error={data.lastNameError}
            />
            <Box />
          </>
        )}

        <Box style={{ clear: "both" }} />
        <EntrySelect
          className="__halfEntry"
          label="Country *"
          name="country"
          value={data.country}
          placeholder="Your country"
          onInputChange={onInputChange}
          options={countriesOptions}
          error={data.countryError}
        />
        <EntryText
          className="__halfEntry"
          label="City *"
          name="city"
          value={data.city}
          placeholder="Your city"
          onInputChange={onInputChange}
          error={data.cityError}
        />

        <Box style={{ clear: "both" }} />
        {isStartup && (
          <>
            <EntryText
              className="__halfEntry"
              onInputChange={onInputChange}
              value={data.firstName}
              name="firstName"
              label="Contact first name *"
              placeholder="Your first name"
              error={data.firstNameError}
            />
            <EntryText
              className="__halfEntry"
              onInputChange={onInputChange}
              value={data.lastName}
              name="lastName"
              label="Contact last name *"
              placeholder="Your last name"
              error={data.lastNameError}
            />
            <Box />
          </>
        )}

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
          error={data.jobPositionError}
        />

        <Box style={{ clear: "both" }} />
        <EntryEmail
          className="__halfEntry"
          name="email"
          label="Email *"
          value={data.email}
          onInputChange={onInputChange}
          error={data.emailError}
        />
        <EntryText
          className="__halfEntry"
          onInputChange={onInputChange}
          value={data.phoneNumber}
          name="phoneNumber"
          label="Phone number *"
          placeholder="ex: +216 22 22 22 22"
          error={data.phoneNumberError}
        />

        <Box style={{ clear: "both" }} />

        {!isStartup && (
          <EntryText
            name="linkedinLink"
            label="Linkedin Link"
            placeholder="Your linkedin link"
            value={data.linkedinLink}
            onInputChange={onInputChange}
            error={data.linkedinLinkError}
          />
        )}
      </Box>
    </Box>
  );
};
export default ApplyDetails;
