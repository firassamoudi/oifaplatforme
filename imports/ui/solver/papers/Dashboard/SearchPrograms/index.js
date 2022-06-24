/* eslint-disable sonarjs/no-duplicate-string */
import "./style.scss";

import Box from "@material-ui/core/Box";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import ProgramsCollection from "/imports/api/Program";
import {
  capabilities,
  getOption,
  maturities,
  sectorsOptions,
} from "/imports/libs/inputs";

import EmptyView from "../../../../common/EmptyView";
import EntryCheckBox from "../../../../common/Entry/EntryCheckBox";
import Typography from "../../../../common/Typography";
import SearchProgramBar from "../../../components/SearchProgramsBar";
import SolverProgramSearchCard from "../../../components/SolverProgramSearchCard";

const selectableOptions = (options) => {
  return [...options.map((opt) => ({ ...opt, checked: false }))];
};

const searchOptions = (options) => {
  return options.filter((opt) => !!opt.checked).map((opt) => opt.value) || [];
};

const onSelectOption = ({ state, index, checked }) => {
  const options = state.map((opt, idx) => {
    if (idx === index) return { ...opt, checked };
    return { ...opt };
  });
  return [...options];
};

const Section = ({ title, data, onInputChange }) => (
  <Box className="SearchPrograms__filter__section">
    <Typography size="1.73rem" color="#373c4f" face="Medium" m="0 0 1.8rem 0">
      {title}
    </Typography>
    {data.map((option, index) => {
      return (
        <EntryCheckBox
          key={index}
          label={option.label}
          name={option.value}
          value={option.checked}
          onInputChange={(inp) =>
            onInputChange({ index, checked: inp[option.value] })
          }
        />
      );
    })}
  </Box>
);

const SearchPrograms = () => {
  // ...
  const [progData, setProData] = useState({
    progName: "",
    type: "Program",
    country: "",
  });
  const onInputChange = (inp) => {
    setProData((state) => ({ ...state, ...inp }));
  };
  // ...
  const [mLevelFilters, setMLevelFilters] = useState(
    selectableOptions(maturities)
  );
  const [sectorFilters, setSectorFilters] = useState(
    selectableOptions(sectorsOptions)
  );
  const [capabFilters, setCapaFilters] = useState(
    selectableOptions(capabilities)
  );
  // ...
  const onMLInputChange = ({ index, checked }) => {
    setMLevelFilters((state) => onSelectOption({ state, index, checked }));
  };
  const onSectorInputChange = ({ index, checked }) => {
    setSectorFilters((state) => onSelectOption({ state, index, checked }));
  };
  const onCAInputChange = ({ index, checked }) => {
    setCapaFilters((state) => onSelectOption({ state, index, checked }));
  };
  // - Perform Search
  const getSearchData = () => {
    const maturityLevel = searchOptions(mLevelFilters);
    const sector = searchOptions(sectorFilters);
    const capabilities = searchOptions(capabFilters);
    // ...
    const { progName, type, country } = progData;
    // ...
    const geoScope = getOption({
      optionsList: "countriesOptions",
      value: country,
    });
    // ...
    let searchData = { progName, type, geoScope, sector, capabilities };
    if (maturityLevel.length) searchData = { ...searchData, maturityLevel };
    if (sector.length) searchData = { ...searchData, sector };
    if (capabilities.length) searchData = { ...searchData, capabilities };
    // ...
    return searchData;
  };
  // ...
  const [programs, setPrograms] = useState([]);
  // ...
  useTracker(() => {
    const data = getSearchData();
    const handle = Meteor.subscribe("programs-solver-search", { data });
    if (!handle.ready()) return;
    const programs = ProgramsCollection.find().fetch();
    setPrograms(programs);
  }, [progData, mLevelFilters, sectorFilters, capabFilters]);
  // ...
  const resultsProgram = programs.filter((prog) => {
    const searchFor = progData.progName?.toLowerCase();
    const searchIn = `${prog.title} ${prog.context}`.toLowerCase();
    return searchIn.includes(searchFor);
  });
  // ...
  return (
    <Box className="SearchPrograms">
      <Box className="SearchPrograms__filter">
        <ScrollArea momentum style={{ flex: 1, width: "100%", height: "100%" }}>
          <Box className="SearchPrograms__filter__inner">
            <Section
              title="Maturity level"
              data={mLevelFilters}
              onInputChange={onMLInputChange}
            />
            <Section
              title="Sectors"
              data={sectorFilters}
              onInputChange={onSectorInputChange}
            />
            <Section
              title="Capabilities"
              data={capabFilters}
              onInputChange={onCAInputChange}
            />
          </Box>
        </ScrollArea>
      </Box>
      <Box className="SearchPrograms__searchBox">
        <Box className="SearchPrograms__searchAction">
          <SearchProgramBar data={progData} onInputChange={onInputChange} />
        </Box>

        <Box className="SearchPrograms__challenges">
          {!!resultsProgram.length && (
            <ScrollArea
              momentum
              style={{ flex: 1, width: "100%", height: "100%" }}
            >
              <Box className="SearchPrograms__challenges__inner">
                {resultsProgram.map((program) => {
                  return (
                    <SolverProgramSearchCard data={program} key={program._id} />
                  );
                })}
              </Box>
            </ScrollArea>
          )}
          {!resultsProgram.length && (
            <Box className="SearchPrograms__empty">
              <EmptyView search />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchPrograms;
