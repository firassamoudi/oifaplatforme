import "./style.scss";

import Box from "@material-ui/core/Box";
import React from "react";

import Typography from "../../../../../common/Typography";
import SolverTypeCard from "../../../../components/SolverTypeCard";

const types = [
  { label: "Designer", img: "/solverTypes/designer.jpg" },
  { label: "Developer", img: "/solverTypes/developer.jpg" },
  { label: "Student", img: "/solverTypes/student.jpg" },
  { label: "Researcher", img: "/solverTypes/researcher.jpg" },
  { label: "Startup", img: "/solverTypes/startup.jpg" },
];

const SolverTypes = ({ data, onInputChange }) => {
  const onSelectType = ({ type }) => {
    onInputChange({ type });
  };
  // ...
  return (
    <Box className="SolverTypes">
      <Typography
        color="#000639"
        face="Bold"
        size="3.6rem"
        height="4rem"
        style={{ margin: "0 0 6.5rem 0", textAlign: "center" }}
      >
        Before you sign up, choose your profile type
      </Typography>
      <Box className="SolverTypes__cards">
        {types.map((type, index) => (
          <SolverTypeCard
            key={index}
            type={type.label}
            img={type.img}
            selected={data.type === type.label}
            handler={onSelectType}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SolverTypes;
