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
  EntrySelect,
  EntryText,
} from "../../../../common/Entry";

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
            />
            <EntryText
              className="__halfEntry"
              onInputChange={onInputChange}
              value={data.websiteLink}
              name="websiteLink"
              label="Website link *"
              placeholder="websiteLink"
            />
            <EntryText
              onInputChange={onInputChange}
              value={data.foundedDate}
              name="foundedDate"
              label="founded date *"
              placeholder="founded date"
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
        />
        <EntryText
          className="__halfEntry"
          label="City *"
          name="city"
          value={data.city}
          placeholder="Your city"
          onInputChange={onInputChange}
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
            />
            <EntryText
              className="__halfEntry"
              onInputChange={onInputChange}
              value={data.institution}
              name="institution"
              label="University *"
              placeholder="What’s your university?"
            />
            <EntryText
              onInputChange={onInputChange}
              value={data.yearsToGraduate}
              name="yearsToGraduate"
              label="Years left to graduate *"
              placeholder="How many years left to graduate?"
            />
            <EntryText
              multiline
              onInputChange={onInputChange}
              value={data.internship}
              name="internship"
              label="Internship *"
              placeholder="Tell us more about your internships"
              rows={4}
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
            />
            <EntryText
              onInputChange={onInputChange}
              value={data.institution}
              name="institution"
              label="Institution *"
              placeholder="What’s your expertise?"
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
            />
            <EntrySelect
              label="Maturity Level *"
              name="maturityLevel"
              value={data.maturityLevel}
              onInputChange={onInputChange}
              options={maturities}
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
          />
        )}
      </Box>
    </Box>
  );
};
export default SolverCreateProfile;
