import "react-multi-email/style.css";

import Box from "@material-ui/core/Box";
import React, { useState } from "react";
import { ReactMultiEmail } from "react-multi-email";

const ReactMultiemail = ({
  name,
  label,
  placeholder,
  value,
  onInputChange,
}) => {
  const [data, setData] = useState([...value]);
  // ...
  const onAddValue = (data) => {
    setData(data);
    // ...
    onInputChange({ [name]: data });
  };
  const onRemoveHandler = (index) => {
    const data = [...emails];
    data.splice(index, 1);
    setData(data);
    // ...
    onInputChange({ [name]: data });
  };
  // ...
  return (
    <Box className="ReactMultiemail">
      <h3>{label}</h3>
      <ReactMultiEmail
        name={name}
        placeholder={placeholder}
        emails={data}
        onChange={onAddValue}
        getLabel={(email, index) => (
          <Box data-tag key={index}>
            {email}
            <Box
              component="span"
              data-tag-handle
              onClick={() => {
                onRemoveHandler(index);
              }}
            >
              ×
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

export default ReactMultiemail;
