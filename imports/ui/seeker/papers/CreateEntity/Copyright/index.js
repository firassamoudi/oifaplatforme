import Box from "@material-ui/core/Box";
import React from "react";

import { EntryText } from "../../../../common/Entry";

const ProgramCopyright = ({ isCFA, data, onInputChange }) => {
  const type = isCFA ? "CFA" : "Program";
  // ...
  return (
    <Box className="ProgramCopyright">
      <EntryText
        name="copyright"
        label={`${type} copyright *`}
        placeholder="It’s important to mention the copyright of the solution the applicant will be offering."
        multiline
        rows={11}
        value={data?.copyright}
        onInputChange={onInputChange}
      />
    </Box>
  );
};

export default ProgramCopyright;
