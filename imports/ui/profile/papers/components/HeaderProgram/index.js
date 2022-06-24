/* eslint-disable sonarjs/cognitive-complexity */
import "./style.scss";

import Box from "@material-ui/core/Box";
import GroupIcon from "@material-ui/icons/Group";
import LaunchIcon from "@material-ui/icons/Launch";
import PlaceIcon from "@material-ui/icons/Place";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import cx from "classnames";
import moment from "moment";
import React, { useState } from "react";

import SeekersCollection from "/imports/api/Seeker";
import ProgramTimeline from "/imports/libs/timeline";
import Button from "/imports/ui/common/Button";
import Image from "/imports/ui/common/Image";
import Typography from "/imports/ui/common/Typography";

import ShareModal from "../ShareModal";

const HeaderItem = ({ label, icon, isTarget }) => (
  <Box className={cx("__item", { isTarget })}>
    {icon || <Box className="__item__icon" />}
    <Typography face="Medium" size="1.4rem" noWrap>
      {label}
    </Typography>
  </Box>
);

const HeaderSectors = ({ sectors }) => (
  <Box className="HeaderProgram__sectors">
    {sectors.map((sector, index) => (
      <HeaderItem key={index} label={sector} />
    ))}
  </Box>
);

const HeaderInfo = ({ country, date, target }) => (
  <Box className="HeaderProgram__info">
    <HeaderItem label={country} icon={<PlaceIcon />} />
    {date && <HeaderItem label={date} icon={<QueryBuilderIcon />} />}
    <HeaderItem label={target} icon={<GroupIcon />} isTarget />
  </Box>
);

const HeaderProgram = ({
  data,
  isSolver,
  isAdmin,
  canApply,
  isEligible,
  isInAppPhaseOut,
  canAccept,
  onProgramApply,
  onAdminAccept,
  isLoading,
}) => {
  const sectors = (data.sector || []).map((c) => c.label);
  // ...
  const timeline = new ProgramTimeline({ data: data?.timeline ?? [] });
  const appPhase = timeline.getPhase("applications");
  const date = appPhase.start;
  const country = (data.geographicalScope || [])
    .map((c) => c.label)
    .toString()
    .replace(/,/g, ", ");
  const target = (data.targetAudience || [])
    .map((t) => t.label)
    .toString()
    .replace(/,/g, ", ");
  // ...
  const seeker = SeekersCollection.findOne({ _id: data.seekerId }) ?? {};
  // ...
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
      <Box className="HeaderProgram">
        <Box className="container container--std">
          <Box className="HeaderProgram__inner">
            <Box className="HeaderProgram__content">
              <Box className="HeaderProgram__content-box">
                <Typography
                  face="Bold"
                  size="4.5rem"
                  color="#051438"
                  height="5rem"
                  fontWeight="900"
                  m="0 0 2rem 0"
                >
                  {data.title}
                </Typography>
                {seeker && (
                  <Typography
                    color="#051438"
                    size="1.5rem"
                    face="Medium"
                    m="0 0 2rem 0"
                  >
                    <span style={{ color: "#9197a5" }}>Hosted by</span>
                    <span>{` ${seeker.organization ?? ""}`}</span>
                  </Typography>
                )}

                <Box className="HeaderProgram__details">
                  <HeaderSectors sectors={sectors} />

                  <HeaderInfo
                    country={country}
                    date={date ? moment(date).format("DD MMMM YYYY") : null}
                    target={target}
                  />
                </Box>

                <Box className="HeaderProgram__action">
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

                  <Box
                    className="HeaderProgram__btn-launch"
                    onClick={() => setOpenModal(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <LaunchIcon />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className="HeaderProgram__img-box">
              <Box className="HeaderProgram__img">
                <Image data={data.imgId} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HeaderProgram;
