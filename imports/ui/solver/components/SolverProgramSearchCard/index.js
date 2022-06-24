/* eslint-disable sonarjs/cognitive-complexity */
import "./style.scss";

import Box from "@material-ui/core/Box";
import GroupIcon from "@material-ui/icons/Group";
import PlaceIcon from "@material-ui/icons/Place";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { withTracker } from "meteor/react-meteor-data";
import moment from "moment";
import React from "react";

import SeekersCollection from "/imports/api/Seeker";
import ProgramTimeline from "/imports/libs/timeline";
import Image from "/imports/ui/common/Image";

import Typography from "../../../common/Typography";

const InfoItem = ({ label, icon }) => (
  <Box className="__item">
    {icon || <Box className="__item__icon" />}
    <Typography face="Medium" size="1.2rem" noWrap>
      {label}
    </Typography>
  </Box>
);

const SolverProgramSearchCard = ({ data }) => {
  const timeline = new ProgramTimeline({ data: data.timeline });
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
  const onOpenProgram = () => {
    window.open(`/dashboard/i/program-overview/${data._id}`);
  };
  // - Seeker
  const seeker = SeekersCollection.findOne({ _id: data.seekerId });
  // ...
  return (
    <Box className="SolverProgramSearchCard" onClick={onOpenProgram}>
      <div className="SolverProgramSearchCard__box">
        <div className="SolverProgramSearchCard__composition">
          <div className="SolverProgramSearchCard__composition__under" />
          <div className="SolverProgramSearchCard__composition__img">
            <div className="SolverProgramSearchCard__composition__upper" />
            <div className="SolverProgramSearchCard__head">
              <Image data={data.imgId} />
            </div>
          </div>
        </div>
        <div className="SolverProgramSearchCard__body">
          <Typography
            color="#051438"
            size="1.6rem"
            face="Black"
            height="2.5rem"
            m="0 0 1rem 0"
          >
            {data.title}
          </Typography>
          <Typography color="#051438" size="1.2rem" face="Medium">
            <span style={{ color: "#9197a5" }}>Hosted by</span>
            <span>{` ${seeker.organization}`}</span>
          </Typography>
          <div className="SolverProgramSearchCard__info">
            <div className="SolverProgramSearchCard__info__item">
              <InfoItem label={country} icon={<PlaceIcon />} />
            </div>
            {date && (
              <div className="SolverProgramSearchCard__info__item">
                <InfoItem
                  label={moment(date).format("DD MMMM YYYY")}
                  icon={<QueryBuilderIcon />}
                />
              </div>
            )}

            <div className="SolverProgramSearchCard__info__item">
              <InfoItem label={target} icon={<GroupIcon />} />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default withTracker((props) => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  // ...
  return {
    user,
    userId,
    ...props,
  };
})(SolverProgramSearchCard);
