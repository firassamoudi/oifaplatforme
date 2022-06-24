import "./style.scss";

import Box from "@material-ui/core/Box";
import LaunchIcon from "@material-ui/icons/Launch";
import cx from "classnames";
import React, { useState } from "react";

import Button from "../../../../../common/Button";
import Typography from "../../../../../common/Typography";
import ShareModal from "../../ShareModal";
import TabPanel from "../TabPanel";

const FixedHeader = ({
  data,
  fixed,
  tabs,
  value,
  scrollBarRef,
  handleTabChange,
  onNavigateHandler,
  // ...
  isSolver,
  isAdmin,
  canApply,
  canAccept,
  isEligible,
  isInAppPhaseOut,
  onProgramApply,
  onAdminAccept,
  isLoading,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const onCloseModal = () => {
    setOpenModal(false);
  };
  // ...
  return (
    <>
      <ShareModal
        title="Share Challenge"
        data={data}
        open={openModal}
        closeModal={onCloseModal}
      />
      <Box
        className={cx("ProgramTabs__tabs-box", {
          "ProgramTabs__tabs-box--show": fixed,
        })}
      >
        <Box className="container container--std">
          <Box className="ProgramTabs__tabs-box__inner">
            <Typography
              face="Bold"
              size="3rem"
              color="#051438"
              height="3rem"
              fontWeight="500"
            >
              {data.title}
            </Typography>
            <Box className="HeaderProgram__action">
              <Box className="HeaderProgram__btn-apply">
                {isSolver && (
                  <Box className="HeaderProgram__btn-apply">
                    <Button
                      onClick={onProgramApply}
                      disabled={isInAppPhaseOut || canApply || !isEligible}
                      isLoading={isLoading}
                    >
                      {isInAppPhaseOut && "Applications closed"}
                      {!isInAppPhaseOut && !isEligible && "Not eligible"}
                      {!isInAppPhaseOut &&
                        isEligible &&
                        canApply &&
                        "Already applied"}
                      {!isInAppPhaseOut && isEligible && !canApply && "Apply"}
                    </Button>
                  </Box>
                )}

                {isAdmin && (
                  <Box className="HeaderProgram__btn-apply">
                    <Button
                      onClick={onAdminAccept}
                      disabled={canAccept}
                      isLoading={isLoading}
                    >
                      {canAccept && "Already approved"}
                      {!canAccept && "Approve"}
                    </Button>
                  </Box>
                )}
              </Box>
              <Box
                className="HeaderProgram__btn-launch"
                onClick={() => setOpenModal(true)}
                style={{ width: "5rem", height: "5rem", cursor: "pointer" }}
              >
                <LaunchIcon />
              </Box>
            </Box>
          </Box>

          <TabPanel
            data={data}
            tabs={tabs}
            value={value}
            scrollBarRef={scrollBarRef}
            handleTabChange={handleTabChange}
            onNavigateHandler={onNavigateHandler}
          />
        </Box>
      </Box>
    </>
  );
};

export default FixedHeader;
