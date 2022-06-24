import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { withRouter } from "react-router";
import Scrollbar from "react-scrollbars-custom";

import SolverCollection from "/imports/api/Solver";

import Profile from "../components/ProfileSolver";
import Layout from "../layouts/layout";

const SolverProfile = ({ data }) => {
  const {
    _id,
    imgId,
    accepted,
    capabilities = [],
    portfolioLink,
    city,
    country,
    team = [],
    websiteLink,
    foundedDate,
    sector = [],
    maturityLevel,
    trackRecordNbClient,
    trackRecordRevenue,
    trackRecordCommunitySize,
    trackRecordClientsPartners,
    description,
    members = [],
    founders = [],
    type,
    internship,
    linkedinLink,
    yearsToGraduate,
    openInnovationExperience,
    trackRecord,
    experience,
    trackRecordFiles,
    institution,
    expertise,
    pitchDeck,
    demoLink,
    phoneNumber,
  } = data ?? {};
  // ...
  const org = data?.getOrgName?.() ?? "";
  const avatar = data?.getAvatar?.() ?? "";
  // ...
  return (
    <Box className="SeekerProfile">
      <Scrollbar
        momentum
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Layout w profile>
          <Box style={{ borderTop: "1px solid #ebebeb" }} />
          <Box className="container container--std">
            <Box style={{ padding: "5rem 0 7rem 0" }}>
              <Profile
                solver
                _id={_id}
                accepted={accepted}
                capabilities={capabilities}
                portfolioLink={portfolioLink}
                city={city}
                country={country}
                team={team}
                websiteLink={websiteLink}
                avatar={avatar}
                imgId={imgId}
                org={org}
                internship={internship}
                phoneNumber={phoneNumber}
                yearsToGraduate={yearsToGraduate}
                foundedDate={foundedDate}
                sector={sector}
                maturityLevel={maturityLevel}
                trackRecordNbClient={trackRecordNbClient}
                trackRecordRevenue={trackRecordRevenue}
                trackRecordCommunitySize={trackRecordCommunitySize}
                trackRecordClientsPartners={trackRecordClientsPartners}
                description={description}
                members={members}
                founders={founders}
                type={type}
                linkedinLink={linkedinLink}
                openInnovationExperience={openInnovationExperience}
                trackRecord={trackRecord}
                experience={experience}
                trackRecordFiles={trackRecordFiles}
                pitchDeck={pitchDeck}
                demoLink={demoLink}
                institution={institution}
                expertise={expertise}
              />
            </Box>
          </Box>
        </Layout>
      </Scrollbar>
    </Box>
  );
};

export default withRouter(
  withTracker(({ ...props }) => {
    const solverId = props.match.params.id;
    const handle = Meteor.subscribe("solver-profile", { solverId });
    if (!handle.ready()) return { data: {} };
    // ...
    const data = SolverCollection.findOne(solverId);
    // ...
    return {
      data,
    };
  })(SolverProfile)
);
