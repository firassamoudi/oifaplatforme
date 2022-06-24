import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useEffect, useState } from "react";

import SeekerCollection from "/imports/api/Seeker";
import { countriesOptions, sectorsOptions } from "/imports/libs/inputs";

import Button from "../../../common/Button";
import {
  EntryAutocomplete,
  EntryImage,
  EntrySelect,
  EntryText,
} from "../../../common/Entry";
import Typography from "../../../common/Typography";

const AccountSeeker = ({ user, seeker }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // ...
  const [form, setForm] = useState({
    imgId: "",
    // ...
    organization: "",
    taxRegistrationNumber: "",
    jobPosition: "",
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
  const onPostData = () => {
    const data = { ...form };
    setIsLoading(true);
    // ...
    Meteor.call("seeker.update", { data }, (err) => {
      if (err) return;
      // ...
      setIsLoading(false);
      setIsSuccess(true);
    });
  };
  // ...
  useEffect(() => {
    setForm({ ...seeker });
  }, [user, seeker]);
  // ...
  return (
    <Box className="Settings__AccountSeeker">
      <EntryImage
        name="imgId"
        value={form.imgId}
        onImgChange={onImgChange}
        Component={() => (
          <Box className="Settings__AccountSeeker__preview">
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
      <EntryText
        className="__halfEntry"
        name="organization"
        label="Organization"
        placeholder="Your organization name"
        value={form.organization}
        onInputChange={onInputChange}
      />
      <EntryText
        className="__halfEntry"
        onInputChange={onInputChange}
        value={form.taxRegistrationNumber}
        name="taxRegistrationNumber"
        label="Tax registration number"
        placeholder="Your tax registration number"
      />
      <Box />
      <EntryText
        label="Website url *"
        name="websiteLink"
        placeholder="ex: http://xperiencia.fr"
        value={form.websiteLink}
        onInputChange={onInputChange}
      />
      <EntryText
        multiline
        name="description"
        label="Short description & key metrics *"
        value={form.description}
        placeholder="Description & key metrics"
        rows={5}
        onInputChange={onInputChange}
      />

      <EntryAutocomplete
        freeSolo
        multiline
        label="Sectors *"
        name="sector"
        placeholder="ex: Information technology"
        value={form.sector}
        options={sectorsOptions}
        onInputChange={onInputChange}
      />
      <EntryAutocomplete
        multiline
        label="Where do you operate? *"
        name="operateCountries"
        placeholder="ex: Tunisia"
        value={form.operateCountries}
        options={countriesOptions}
        onInputChange={onInputChange}
      />
      <EntryAutocomplete
        freeSolo
        multiline
        label="Which market are you interested in? *"
        name="interestedMarket"
        placeholder="ex: Tunisia"
        value={form.interestedMarket}
        options={countriesOptions}
        onInputChange={onInputChange}
      />
      <EntrySelect
        className="__halfEntry"
        label="Head office *"
        name="headOffice"
        placeholder="ex: Tunisia"
        value={form.headOffice}
        options={countriesOptions}
        onInputChange={onInputChange}
      />
      <EntryText
        className="__halfEntry"
        label="Address *"
        name="address"
        placeholder="Your address"
        value={form.address}
        onInputChange={onInputChange}
      />
      <Box />
      <EntryText
        className="__halfEntry"
        label="City *"
        name="city"
        value={form.city}
        placeholder="City"
        onInputChange={onInputChange}
      />
      <EntryText
        className="__halfEntry"
        label="Postal code *"
        name="postalCode"
        placeholder="ex: 1234"
        type="number"
        value={form.postalCode}
        onInputChange={onInputChange}
      />

      <EntryAutocomplete
        freeSolo
        multiline
        label="What innovation themes are you interested in? *"
        name="interestedTheme"
        placeholder="ex: Design"
        value={form.interestedTheme}
        options={sectorsOptions}
        onInputChange={onInputChange}
      />

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
  const seeker = SeekerCollection.findOne({ _id: user?.seekerId });
  // ...
  return {
    user,
    seeker,
  };
})(AccountSeeker);
