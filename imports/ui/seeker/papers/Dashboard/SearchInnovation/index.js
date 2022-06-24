/* eslint-disable sonarjs/cognitive-complexity */
import "./style.scss";

import Box from "@material-ui/core/Box";
import { useTracker, withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import ScrollArea from "react-scrollbars-custom";

import SeekerCollection from "/imports/api/Seeker";
import SolverCollection from "/imports/api/Solver";
import { capabilities, maturities, sectorsOptions } from "/imports/libs/inputs";

import EmptyView from "../../../../common/EmptyView";
import EntryCheckBox from "../../../../common/Entry/EntryCheckBox";
import Typography from "../../../../common/Typography";
import InnovationCard from "../../../components/InnovationCard";
import SearchInnovationBar from "../../../components/SearchInnovationBar";

const tableColsStartup = [
  {
    label: "NAME",
    className: "__col __col--name",
  },
  {
    label: "Country",
    className: "__col __col--country",
  },
  {
    label: "Maturity level",
    className: "__col __col--maturity",
  },
  {
    label: "Sectors",
    className: "__col __col--sector",
  },
  {
    label: "Capibilities",
    className: "__col __col--capibilities",
  },
  {
    label: "",
    className: "__col __col--actions",
  },
];

const tableColsOther = [
  {
    label: "NAME",
    className: "__col __col--name",
  },
  {
    label: "Country",
    className: "__col __col--country",
  },
  {
    label: "Experience",
    className: "__col __col--xperiencia",
  },
  {
    label: "Capibilities",
    className: "__col __col--capibilities",
  },
  {
    label: "",
    className: "__col __col--actions",
  },
];

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
  <Box className="SearchInnovation__filter__section">
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

const SearchInnovation = ({ seeker }) => {
  const [orgData, setOrgData] = useState({
    orgName: "",
    type: "Startup",
    country: "",
  });
  const onInputChange = (inp) => {
    setOrgData((state) => ({ ...state, ...inp }));
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
    let searchData = { ...orgData, sector, capabilities };
    if (maturityLevel.length) searchData = { ...searchData, maturityLevel };
    if (sector.length) searchData = { ...searchData, sector };
    if (capabilities.length) searchData = { ...searchData, capabilities };
    // ...
    return searchData;
  };
  // ...
  const [solvers, setSolvers] = useState([]);
  // ...
  useTracker(() => {
    const data = getSearchData();
    const handle = Meteor.subscribe("seeker.search.solvers", { data });
    if (!handle.ready()) return;
    // ...
    const solvers = SolverCollection.find().fetch();
    setSolvers(solvers);
  }, [orgData, mLevelFilters, sectorFilters, capabFilters]);
  // ...
  const resultsSolvers = [...solvers].filter((solver) => {
    const searchFor = orgData.orgName?.toLowerCase();
    const searchIn = `${solver.firstName} ${solver.lasrName} ${solver.organization}`.toLowerCase();
    // ...
    const isConnected = seeker?.isConnectedToThisSolver?.(solver._id);
    const isIncluded = searchIn.includes(searchFor.toLowerCase());
    return searchFor ? isConnected && isIncluded : isIncluded;
  });
  // ...
  const tableCols =
    orgData.type === "Startup" ? tableColsStartup : tableColsOther;
  // ...
  return (
    <Box className="SearchInnovation">
      <Box className="SearchInnovation__filter">
        <ScrollArea momentum style={{ flex: 1, width: "100%", height: "100%" }}>
          <Box className="SearchInnovation__filter__inner">
            {orgData.type === "Startup" && (
              <>
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
              </>
            )}
            <Section
              title="Capabilities"
              data={capabFilters}
              onInputChange={onCAInputChange}
            />
          </Box>
        </ScrollArea>
      </Box>
      <Box className="SearchInnovation__searchBox">
        <Box className="SearchInnovation__searchAction">
          <SearchInnovationBar data={orgData} onInputChange={onInputChange} />
        </Box>

        <Box className="SearchInnovation__table">
          {!!resultsSolvers.length && (
            <Box className="SearchInnovation__table__cols">
              {tableCols.map((col, index) => (
                <Typography
                  key={index}
                  name="div"
                  size="1.2rem"
                  color="#8993a8"
                  face="Medium"
                  className={col.className}
                >
                  {col.label}
                </Typography>
              ))}
            </Box>
          )}

          <Box className="SearchInnovation__body">
            {!!resultsSolvers.length && (
              <ScrollArea
                momentum
                style={{ flex: 1, width: "100%", height: "100%" }}
              >
                <Box className="SearchInnovation__body__inner">
                  {resultsSolvers.map((solver, index) => (
                    <InnovationCard data={solver} key={index} />
                  ))}
                </Box>
              </ScrollArea>
            )}
            {!resultsSolvers.length && (
              <Box className="SearchInnovation__empty">
                <EmptyView search />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  if (!user) {
    return {
      seeker: {},
    };
  }
  // ...
  const seekerId = user.seekerId;
  const seeker = SeekerCollection.findOne(seekerId);
  // ...
  return {
    seeker,
  };
})(SearchInnovation);
