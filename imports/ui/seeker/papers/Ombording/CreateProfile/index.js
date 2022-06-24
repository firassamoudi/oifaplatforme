import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import React from "react";

import {
  countriesOptions,
  jobPositionOptions,
  sectorsOptions,
} from "/imports/libs/inputs";

import {
  EntryAutocomplete,
  EntryEmail,
  EntryImage,
  EntrySelect,
  EntryText,
} from "../../../../common/Entry";
import Typography from "../../../../common/Typography";

const SeekerCreateProfile = ({ data, onImgChange, onInputChange }) => {
  // ...
  return (
    <Box className="SeekerCreateProfile">
      <Box className="SeekerCreateProfile__content">
        <Box
          className={cx("SeekerCreateProfile__form", {
            __hide: !!data.imgId,
          })}
        >
          <EntryImage
            name="imgId"
            value={data.imgId}
            onImgChange={onImgChange}
            Component={() => (
              <Box className="SeekerCreateProfile__preview">
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
            name="firstName"
            label="First Name"
            placeholder="Your first name"
            value={data.firstName}
            onInputChange={onInputChange}
            error={data.firstNameDirty && data.firstNameError}
          />
          <EntryText
            name="lastName"
            label="Last Name"
            placeholder="Your last name"
            value={data.lastName}
            onInputChange={onInputChange}
            error={data.lastNameDirty && data.lastNameError}
          />
          <EntryText
            name="organization"
            label="Organization"
            placeholder="Your organization name"
            value={data.organization}
            onInputChange={onInputChange}
            readOnly
          />
          <EntryText
            onInputChange={onInputChange}
            value={data.taxRegistrationNumber}
            name="taxRegistrationNumber"
            label="Tax registration number"
            placeholder="Your tax registration number"
            readOnly
          />
          <EntrySelect
            label="Job Position"
            name="jobPosition"
            placeholder="Your job position"
            value={data.jobPosition}
            options={jobPositionOptions}
            onInputChange={onInputChange}
            error={data.jobPositionDirty && data.jobPositionError}
          />
          <EntryEmail
            label="Professional email *"
            name="email"
            placeholder="Your professional email"
            value={data.email}
            readOnly
          />
          <EntryText
            label="Website url *"
            name="websiteLink"
            placeholder="ex: http://xperiencia.fr"
            value={data.websiteLink}
            onInputChange={onInputChange}
            error={data.websiteLinkDirty && data.websiteLinkError}
          />
          <EntryText
            multiline
            name="description"
            label="Short description & key metrics *"
            value={data.description}
            placeholder="Description & key metrics"
            rows={4}
            onInputChange={onInputChange}
            error={data.descriptionDirty && data.descriptionError}
          />

          <EntryAutocomplete
            freeSolo
            multiline
            label="Sectors *"
            name="sector"
            placeholder="ex: Information technology"
            value={data.sector}
            options={sectorsOptions}
            onInputChange={onInputChange}
            error={data.sectorDirty && data.sectorError}
          />
          <EntryAutocomplete
            multiline
            label="Where do you operate? *"
            name="operateCountries"
            placeholder="ex: Tunisia"
            value={data.operateCountries}
            options={countriesOptions}
            onInputChange={onInputChange}
            error={data.operateCountriesDirty && data.operateCountriesError}
          />
          <EntryAutocomplete
            freeSolo
            multiline
            label="Which market are you interested in? *"
            name="interestedMarket"
            placeholder="ex: Tunisia"
            value={data.interestedMarket}
            options={countriesOptions}
            onInputChange={onInputChange}
            error={data.interestedMarketDirty && data.interestedMarketError}
          />
          <EntrySelect
            label="Head office *"
            name="headOffice"
            placeholder="ex: Tunisia"
            value={data.headOffice}
            options={countriesOptions}
            onInputChange={onInputChange}
            error={data.headOfficeDirty && data.headOfficeError}
          />
          <EntryText
            label="Address *"
            name="address"
            placeholder="Your address"
            value={data.address}
            onInputChange={onInputChange}
            error={data.addressDirty && data.addressError}
          />
          <EntryText
            label="City *"
            name="city"
            value={data.city}
            placeholder="City"
            onInputChange={onInputChange}
            error={data.cityDirty && data.cityError}
          />
          <EntryText
            label="Postal code *"
            name="postalCode"
            placeholder="ex: 1250"
            value={data.postalCode}
            onInputChange={onInputChange}
            error={data.postalCodeDirty && data.postalCodeError}
          />

          <EntryAutocomplete
            freeSolo
            multiline
            label="What innovation themes are you interested in? *"
            name="interestedTheme"
            placeholder="ex: Design"
            value={data.interestedTheme}
            options={sectorsOptions}
            onInputChange={onInputChange}
            error={data.interestedThemeDirty && data.interestedThemeError}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SeekerCreateProfile;
