import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import { hearAboutUsOptions } from "/imports/libs/inputs";

import { EntrySelect, EntryText } from "../../../../common/Entry";

const ApplyHearAboutUs = ({ data, onInputChange }) => {
  // ...
  return (
    <Box className="ApplyHearAboutUs">
      <Box className="__form">
        <EntrySelect
          label="How did you hear about us?"
          name="hearAboutUs"
          value={data.hearAboutUs}
          placeholder="How did you hear about us?"
          onInputChange={onInputChange}
          options={hearAboutUsOptions}
        />
        {data.hearAboutUs === "other" && (
          <EntryText
            value={data.hearAboutUsOther}
            name="hearAboutUsOther"
            label="Other"
            placeholder="other"
            onInputChange={onInputChange}
          />
        )}
      </Box>
    </Box>
  );
};
export default ApplyHearAboutUs;
