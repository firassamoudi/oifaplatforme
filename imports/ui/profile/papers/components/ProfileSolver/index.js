/* eslint-disable sonarjs/cognitive-complexity */
import "./style.scss";

import Box from "@material-ui/core/Box";
import cx from "classnames";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";

import SeekerCollection from "/imports/api/Seeker";
import { getOptionLabel } from "/imports/libs/inputs";

import CapList from "./CapList/CapList";
import CardsList from "./CardsList/CardsList";
import Description from "./Description/Description";
import DevInfo from "./DevInfo/DevInfo";
import MediaSection from "./MediaSection/MediaSection";
import SendSection from "./SendSection/SendSection";
import StartUpInfo from "./StartUpInfo/StartUpInfo";
import Track from "./Track/Track";

const Profile = (props) => {
  // - Seeker
  const seeker = props.seeker;
  const connected = seeker?.isConnectedToThisSolver?.(props._id);
  const canMakeConnexion = seeker?.plan?.()?.canMakeConnexion?.();
  // ...
  const isStartup = props.type === "Startup";
  const isStudent = props.type === "Student";
  const isResearcher = props.type === "Researcher";
  // ...
  return (
    <Box
      className={cx("SolverProfile", { "SolverProfile--startUp": isStartup })}
    >
      <Box component="aside">
        <Box className="SolverProfile__action">
          <Box className="SolverProfile__send">
            <SendSection
              solver
              _id={props._id}
              seekerId={seeker?._id}
              accepted={props.accepted}
              avatar={props.avatar}
              imgId={props.imgId}
              org={props.org}
              connected={connected}
              canMakeConnexion={canMakeConnexion}
              // ...
              isAdmin={props.isAdmin}
              isSeeker={props.isSeeker}
            />
          </Box>

          {isStartup && (
            <StartUpInfo
              connected={connected || props.isAdmin}
              city={props.city}
              country={getOptionLabel({
                optionsList: "countriesOptions",
                value: props.country,
              })}
              foundedDate={props.foundedDate}
              portfolioLink={props.portfolioLink}
              websiteLink={props.websiteLink}
              phoneNumber={props.phoneNumber}
              sector={props.sector}
              maturityLevel={getOptionLabel({
                optionsList: "maturities",
                value: props.maturityLevel,
              })}
            />
          )}
        </Box>
        <Box className="SolverProfile__media">
          {isStartup ? (
            <MediaSection
              connected={connected || props.isAdmin}
              pitchDeck={props.pitchDeck}
              demoLink={props.demoLink}
            />
          ) : (
            <DevInfo
              connected={connected || props.isAdmin}
              city={props.city}
              country={getOptionLabel({
                optionsList: "countriesOptions",
                value: props.country,
              })}
              portfolioLink={props.portfolioLink}
              linkedinLink={props.linkedinLink}
              phoneNumber={props.phoneNumber}
            />
          )}
        </Box>
        <Box className="SolverProfile__track">
          {isStartup ? (
            <Track
              trackRecordNbClient={props.trackRecordNbClient}
              trackRecordRevenue={props.trackRecordRevenue}
              trackRecordCommunitySize={props.trackRecordCommunitySize}
              trackRecordClientsPartners={props.trackRecordClientsPartners}
            />
          ) : (
            <CapList
              title="Capibilities"
              capabilities={props.capabilities}
              connected={connected || props.isAdmin}
            />
          )}
        </Box>
      </Box>
      <Box component="main">
        {isStartup ? (
          <>
            <Box component="section">
              <Description
                connected={connected || props.isAdmin}
                title="Description"
                para={props.description}
              />
            </Box>
            <Box component="section">
              <CapList
                title="Capibilities"
                capabilities={props.capabilities}
                connected={connected || props.isAdmin}
              />
            </Box>

            <CardsList
              title="Founders"
              connected={connected || props.isAdmin}
              team={props.founders}
            />

            <CardsList
              title="Team"
              connected={connected || props.isAdmin}
              team={props.members}
            />
          </>
        ) : (
          <>
            <Box component="section">
              <Description
                connected
                title={`${props.type ?? ""} Experience`}
                para={props.experience || props.internship || props.expertise}
              />
            </Box>
            {isStudent && (
              <Box component="section">
                <Description
                  connected
                  title="Years to graduate"
                  para={props.yearsToGraduate}
                />
              </Box>
            )}
            {isResearcher && (
              <Box component="section">
                <Description
                  connected
                  title="Institution"
                  para={props.institution}
                />
              </Box>
            )}
            <Box component="section">
              <Description
                connected={connected || props.isAdmin}
                title="Track records"
                ressources={props.trackRecordFiles}
                para={props.trackRecord}
              />
            </Box>
            <Box component="section">
              <Description
                connected
                title="Experience in entrepreneurship and open innovation"
                para={props.openInnovationExperience}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default withTracker(() => {
  const userId = Meteor.userId();
  const user = Meteor.user();
  const isAdmin = Roles?.userIsInRole(userId, ["ADMIN_ADMIN", "ADMIN_MEMBER"]);
  // ...
  const seekerId = user?.seekerId;
  const seeker = SeekerCollection.findOne({ _id: seekerId });
  const isSeeker = !!seeker;
  // ...
  return {
    userId,
    seeker,
    // ...
    isSeeker,
    isAdmin,
  };
})(Profile);
