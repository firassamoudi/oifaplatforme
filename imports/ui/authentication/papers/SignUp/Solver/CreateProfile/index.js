/* eslint-disable sonarjs/cognitive-complexity */
import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import {
  capabilities,
  countriesOptions,
  maturities,
  sectorsOptions,
} from "/imports/libs/inputs";

import {
  EntryAutocomplete,
  EntryDate,
  EntrySelect,
  EntryText,
} from "../../../../../common/Entry";

const SolverCreateProfile = ({ solverType, data, onInputChange }) => {
  const isStartup = solverType.toLowerCase() === "startup";
  const isDesigner = solverType.toLowerCase() === "designer";
  const isDeveloper = solverType.toLowerCase() === "developer";
  const isStudent = solverType.toLowerCase() === "student";
  const isResearcher = solverType.toLowerCase() === "researcher";
  // ...
  return (
    <Box className="SolverCreateProfile">
      <Box className="__form">
        {isStartup && (
          <>
            <EntryText
              className="__halfEntry"
              onInputChange={onInputChange}
              value={data.organization}
              name="organization"
              label="Startup name *"
              placeholder="Startup name"
              error={data.organizationDirty && data.organizationError}
            />
            <EntryText
              className="__halfEntry"
              onInputChange={onInputChange}
              value={data.websiteLink}
              name="websiteLink"
              label="Website link *"
              placeholder="websiteLink"
              error={data.websiteLinkDirty && data.websiteLinkError}
            />
            <EntryDate
              onInputChange={onInputChange}
              value={data.foundedDate}
              name="foundedDate"
              label="founded date *"
              placeholder="founded date"
              error={data.foundedDateDirty && data.foundedDateError}
            />
          </>
        )}

        <EntrySelect
          className="__halfEntry"
          label="Country *"
          name="country"
          value={data.country}
          placeholder="Your country"
          onInputChange={onInputChange}
          options={countriesOptions}
          error={data.countryDirty && data.countryError}
        />
        <EntryText
          className="__halfEntry"
          label="City *"
          name="city"
          value={data.city}
          placeholder="Your city"
          onInputChange={onInputChange}
          error={data.cityDirty && data.cityError}
        />

        {isStudent && (
          <>
            <Box />
            <EntryText
              className="__halfEntry"
              onInputChange={onInputChange}
              value={data.degree}
              name="degree"
              label="Degree *"
              placeholder="What’s your degree?"
              error={data.degreeDirty && data.degreeError}
            />
            <EntryText
              className="__halfEntry"
              onInputChange={onInputChange}
              value={data.institution}
              name="institution"
              label="University *"
              placeholder="What’s your university?"
              error={data.institutionDirty && data.institutionError}
            />
            <EntryText
              onInputChange={onInputChange}
              value={data.yearsToGraduate}
              name="yearsToGraduate"
              label="Years left to graduate *"
              placeholder="How many years left to graduate?"
              error={data.yearsToGraduateDirty && data.yearsToGraduateError}
            />
            <EntryText
              multiline
              onInputChange={onInputChange}
              value={data.internship}
              name="internship"
              label="Internship *"
              placeholder="Tell us more about your internships"
              rows={4}
              error={data.internshipDirty && data.internshipError}
            />
          </>
        )}
        {isResearcher && (
          <>
            <EntryText
              onInputChange={onInputChange}
              value={data.expertise}
              name="expertise"
              label="Expertise *"
              placeholder="What’s your expertise?"
              error={data.expertiseDirty && data.expertiseError}
            />
            <EntryText
              onInputChange={onInputChange}
              value={data.institution}
              name="institution"
              label="Institution *"
              placeholder="What’s your expertise?"
              error={data.institutionDirty && data.institutionError}
            />
          </>
        )}
        {isStartup && (
          <EntryText
            multiline
            onInputChange={onInputChange}
            value={data.description}
            name="description"
            label="description *"
            placeholder="description"
            rows={5}
            error={data.descriptionDirty && data.descriptionError}
          />
        )}

        {(isDeveloper || isDesigner) && (
          <EntryText
            multiline
            onInputChange={onInputChange}
            value={data.experience}
            name="experience"
            label="Experience *"
            placeholder="Describe your experience"
            rows={5}
            error={data.experienceDirty && data.experienceError}
          />
        )}

        {isStartup && (
          <>
            <EntryAutocomplete
              multiline
              label="Sectors *"
              name="sector"
              placeholder="Sector"
              value={data.sector}
              onInputChange={onInputChange}
              options={sectorsOptions}
              error={data.sectorDirty && data.sectorError}
            />
            <EntrySelect
              label="Maturity Level *"
              name="maturityLevel"
              value={data.maturityLevel}
              onInputChange={onInputChange}
              options={maturities}
              placeholder="Maturity Level"
              error={data.maturityLevelDirty && data.maturityLevelError}
            />
          </>
        )}

        <EntryAutocomplete
          multiline
          label="Key capibilities *"
          name="capabilities"
          placeholder="Key capibilities"
          value={data.capabilities}
          options={capabilities}
          onInputChange={onInputChange}
          error={data.capabilitiesDirty && data.capabilitiesError}
        />

        {!isStartup && (
          <EntryText
            multiline
            onInputChange={onInputChange}
            value={data.openInnovationExperience}
            name="openInnovationExperience"
            label="Experience in entrepreneurship and open innovation *"
            placeholder="Describe your experience in entrepreneurship and open innovation"
            rows={6}
            error={
              data.openInnovationExperienceDirty &&
              data.openInnovationExperienceError
            }
          />
        )}
      </Box>
    </Box>
  );
};
export default SolverCreateProfile;
