import "./style.scss";

import getUnicodeFlagIcon from "country-flag-icons/unicode";
import React from "react";

import { getOptionLabel } from "/imports/libs/inputs";

const Country = ({ value }) => {
  if (!value) return null;
  const flag = getUnicodeFlagIcon(value);
  const label = getOptionLabel({
    optionsList: "countriesOptions",
    value,
  });
  // ...
  return (
    <div title={label} className="CountryFlag">
      {flag}
    </div>
  );
};

export default Country;
