import "./style.scss";

import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import React from "react";

import {
  capabilities,
  countriesOptions,
  maturities,
  targets,
} from "/imports/libs/inputs";

import { EntryAutocomplete, EntrySelect } from "../../../../common/Entry";
import Typography from "../../../../common/Typography";

const CriteriaCard = ({ data, onCretionSelect }) => {
  return (
    <Box className="ProgramTargetCriteriaCard">
      <Typography size="1.4rem" color="rgb(51 51 51)" face="Medium">
        {data.label}
      </Typography>
      <Switch
        color="default"
        checked={data.selected}
        onChange={onCretionSelect}
      />
    </Box>
  );
};

const ProgramTarget = ({ isCFA, data, onInputChange }) => {
  const type = isCFA ? "CFA" : "program";
  // ...
  const onCretionSelectHandler = (index) => {
    const criteria = data.criteria;
    const state = criteria[index].selected;
    criteria[index].selected = !state;
    onInputChange({ criteria });
  };
  // ...
  return (
    <Box className="Program Program--target">
      <Typography size="1.6rem" color="#9ca3af" face="Medium" m="0 0 4rem 0">
        {`Define your ${type} target audience with all specific criteria`}
      </Typography>
      <EntryAutocomplete
        multiline
        label="Who is your target audience? *"
        name="targetAudience"
        placeholder="target audience"
        value={data.targetAudience}
        options={targets}
        onInputChange={onInputChange}
      />
      <EntryAutocomplete
        multiline
        label="Geographical scope? *"
        name="geographicalScope"
        placeholder="Geographical scope"
        value={data.geographicalScope}
        options={countriesOptions}
        onInputChange={onInputChange}
      />

      <EntrySelect
        label="Maturity level *"
        name="maturityLevel"
        value={data.maturityLevel}
        placeholder="Maturity level"
        onInputChange={onInputChange}
        options={maturities}
      />
      <EntryAutocomplete
        multiline
        label="Capabilities *"
        name="capabilities"
        placeholder="Capabilities"
        value={data.capabilities}
        options={capabilities}
        onInputChange={onInputChange}
      />

      <Box>
        <Typography size="1.4rem" color="#434c5e" face="Medium" m="4rem 0 0 0">
          Criteria *
        </Typography>
        {data?.criteria.map((criterion, index) => (
          <CriteriaCard
            key={index}
            data={criterion}
            onCretionSelect={() => {
              onCretionSelectHandler(index);
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ProgramTarget;
