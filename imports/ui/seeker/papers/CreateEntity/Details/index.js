import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import { sectorsOptions } from "/imports/libs/inputs";

import { EntryAutocomplete, EntryText } from "../../../../common/Entry";

const ProgramDetails = ({ isCFA, data, onInputChange }) => {
  const type = isCFA ? "CFA" : "Program";
  // ...
  const onSectorInputChange = (inp) => {
    if (isCFA) {
      onInputChange(inp);
    } else {
      const sectors = inp.sector.map((sec) => sec.value);
      const challenges = data?.challenges.map((chl) => {
        const isNotIn = [...sectors, ""].indexOf(chl.sector) === -1;
        return { ...chl, selected: isNotIn ? false : chl.selected };
      });
      // ...
      onInputChange({
        sector: inp.sector,
        challenges,
      });
    }
  };
  // ...
  return (
    // ...
    <Box className="Program Program--details">
      <EntryText
        label={`${type} title *`}
        name="title"
        placeholder={`Your ${type} title`}
        value={data.title}
        onInputChange={onInputChange}
      />
      <EntryAutocomplete
        multiline
        label={`${type} sectors *`}
        name="sector"
        placeholder={`Your ${type} sectors`}
        value={data.sector}
        options={[...sectorsOptions]}
        onInputChange={onSectorInputChange}
      />
      <EntryText
        name="context"
        label={`${type} context *`}
        placeholder={`Why are you launching this ${type}? What are you trying to achieve for your organisation?`}
        multiline
        rows={7}
        value={data.context}
        onInputChange={onInputChange}
      />
      <EntryText
        name="contextVideo"
        label={`${type} context video`}
        placeholder="Ex : youtube.com/watch?v=jNQXAC9IVRw"
        value={data.contextVideo}
        onInputChange={onInputChange}
      />
    </Box>
  );
};
export default ProgramDetails;
