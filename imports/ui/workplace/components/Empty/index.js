import Box from "@material-ui/core/Box";
import React, { useState } from "react";

import Button from "../../../common/Button";
import Typography from "../../../common/Typography";
import CreateTeamModal from "../CreateTeamModal";

const Empty = ({ empty, children }) => {
  // - Team modal
  const [showTeamModal, setShowTeamModal] = useState(false);
  const onShowTeamModal = () => {
    setShowTeamModal(true);
  };
  const onHideTeamModal = () => {
    setShowTeamModal(false);
  };
  // ...
  return (
    <Box className="Workplace__createTeam">
      <Box className="Workplace__createTeam__box">
        {empty ? (
          <>
            <Typography
              size="2.43rem"
              color="#333760"
              face="Book"
              m="0 0 1.6rem 0"
            >
              Create your first team
            </Typography>

            <Typography
              size="1.6rem"
              color="rgba(47,64,90,0.41)"
              face="Book"
              m="0 0 2rem 0"
            >
              Create your first team and start managing their tasks
            </Typography>
            <Button onClick={onShowTeamModal}>
              {/* <AddIcon
                style={{
                  fontSize: "2.3rem",
                  color: "#F9BF58",
                  marginRight: ".5rem",
                }}
              /> */}
              Create team
            </Button>
          </>
        ) : (
          <Typography size="1.6rem" color="rgba(47,64,90,0.41)" face="Book">
            {children}
          </Typography>
        )}
      </Box>

      <CreateTeamModal open={showTeamModal} closeModal={onHideTeamModal} />
    </Box>
  );
};

export default Empty;
