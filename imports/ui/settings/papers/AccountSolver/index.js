import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";

import SolverCollection from "/imports/api/Solver";
import {
  capabilities,
  countriesOptions,
  maturities,
  sectorsOptions,
} from "/imports/libs/inputs";

import Button from "../../../common/Button";
import {
  EntryAutocomplete,
  EntryDate,
  EntryImage,
  EntrySelect,
  EntryText,
} from "../../../common/Entry";
import Typography from "../../../common/Typography";

const AccountSolver = ({ user, solver }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // ...
  const solverType = solver?.type ?? "";
  const isStartup = solverType.toLowerCase() === "startup";
  const isDesigner = solverType.toLowerCase() === "designer";
  const isDeveloper = solverType.toLowerCase() === "developer";
  const isStudent = solverType.toLowerCase() === "student";
  const isResearcher = solverType.toLowerCase() === "researcher";
  // ...
  const [form, setForm] = useState({
    imgId: "",
    // ...
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
    // ...
    phoneNumber: "",
    linkedinLink: "",
  });
  // ...
  const onInputChange = (inp) => {
    setIsSuccess(false);
    setForm((state) => ({ ...state, ...inp }));
  };
  // ...
  const onImgChange = (inp) => {
    const data = inp.imgId;
    Meteor.call("seeker.update.img", { data }, (err) => {
      if (err) return;
      onInputChange(inp);
    });
  };
  // ...
  const onPostData = () => {
    const data = { ...form };
    setIsLoading(true);
    // ...
    Meteor.call("solver.update", { data }, (err) => {
      if (err) return;
      // ...
      setIsLoading(false);
      setIsSuccess(true);
    });
  };
  // ...
  useEffect(() => {
    setForm({ ...solver });
  }, [user, solver]);
  // ...
  return (
    <Box className="Settings__AccountSolver">
      <EntryImage
        name="imgId"
        value={form.imgId}
        onImgChange={onImgChange}
        Component={() => (
          <Box className="Settings__AccountSolver__preview">
            <Typography
              face="Bold"
              color="#2e3d49"
              size="1.4rem"
              height="1.9rem"
              style={{ margin: "0 0 0.7rem 0" }}
            >
              Upload Your organization logo
            </Typography>
            <Typography
              face="Medium"
              color="#2e3d49"
              size="1.2rem"
              height="1.6rem"
            >
              Drag & drop photos here or
              <Box component="span" style={{ color: "#03256c" }}>
                browse
              </Box>
            </Typography>
          </Box>
        )}
      />
      {isStartup && (
        <>
          <EntryText
            className="__halfEntry"
            onInputChange={onInputChange}
            value={form.organization}
            name="organization"
            label="Startup name *"
            placeholder="Startup name"
          />
          <EntryText
            className="__halfEntry"
            onInputChange={onInputChange}
            value={form.websiteLink}
            name="websiteLink"
            label="Website link *"
            placeholder="websiteLink"
          />
          <EntryDate
            onInputChange={onInputChange}
            value={form.foundedDate}
            name="foundedDate"
            label="founded date *"
            placeholder="founded date"
          />
        </>
      )}

      <EntryText
        label="Phone number *"
        name="phoneNumber"
        value={form.phoneNumber}
        placeholder="Your phone number"
        onInputChange={onInputChange}
      />
      {!isStartup && (
        <EntryText
          label="Linkedin Link *"
          name="linkedinLink"
          value={form.linkedinLink}
          placeholder="Your linked link"
          onInputChange={onInputChange}
        />
      )}

      <Box />
      <EntrySelect
        className="__halfEntry"
        label="Country *"
        name="country"
        value={form.country}
        placeholder="Your country"
        onInputChange={onInputChange}
        options={countriesOptions}
      />
      <EntryText
        className="__halfEntry"
        label="City *"
        name="city"
        value={form.city}
        placeholder="Your city"
        onInputChange={onInputChange}
      />
      <Box />

      {isStudent && (
        <>
          <Box />
          <EntryText
            className="__halfEntry"
            onInputChange={onInputChange}
            value={form.degree}
            name="degree"
            label="Degree *"
            placeholder="What’s your degree?"
          />
          <EntryText
            className="__halfEntry"
            onInputChange={onInputChange}
            value={form.institution}
            name="institution"
            label="University *"
            placeholder="What’s your university?"
          />
          <EntryText
            onInputChange={onInputChange}
            value={form.yearsToGraduate}
            name="yearsToGraduate"
            label="Years left to graduate *"
            placeholder="How many years left to graduate?"
          />
          <EntryText
            multiline
            onInputChange={onInputChange}
            value={form.internship}
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
            multiline
            onInputChange={onInputChange}
            value={form.expertise}
            name="expertise"
            label="Expertise *"
            placeholder="What’s your expertise?"
            rows={5}
          />
          <EntryText
            onInputChange={onInputChange}
            value={form.institution}
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
          value={form.description}
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
          value={form.experience}
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
            value={form.sector}
            onInputChange={onInputChange}
            options={sectorsOptions}
          />
          <EntrySelect
            label="Maturity Level *"
            name="maturityLevel"
            value={form.maturityLevel}
            onInputChange={onInputChange}
            options={maturities}
            placeholder="Maturity Level"
          />
        </>
      )}

      <EntryAutocomplete
        multiline
        label="Key capibilities *"
        name="capabilities"
        placeholder="Key capibilities"
        value={form.capabilities}
        options={capabilities}
        onInputChange={onInputChange}
      />

      {!isStartup && (
        <EntryText
          multiline
          onInputChange={onInputChange}
          value={form.openInnovationExperience}
          name="openInnovationExperience"
          label="Experience in entrepreneurship and open innovation *"
          placeholder="Describe your experience in entrepreneurship and open innovation"
          rows={6}
        />
      )}

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
              You account has been changed successfully
            </Typography>
          )}
          <Button
            isLoading={isLoading}
            disabled={false}
            onClick={onPostData}
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
  const solver = SolverCollection.findOne({ _id: user?.solverId });
  // ...
  return {
    user,
    solver,
  };
})(AccountSolver);
