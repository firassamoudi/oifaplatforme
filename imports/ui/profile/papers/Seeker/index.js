import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { withRouter } from "react-router";
import Scrollbar from "react-scrollbars-custom";

import SeekerCollection from "/imports/api/Seeker";
import SeekerPlanCollection from "/imports/api/SeekerPlan";

import Profile from "../components/ProfileSeeker";
import Layout from "../layouts/layout";

const SeekerProfile = ({ data, dataPlan }) => {
  const avatar = data?.getAvatar?.() ?? "";
  const org = data?.getOrgName?.() ?? "";
  const owner = data?.owner?.();
  const challenges = data?.programs?.() ?? [];
  // isCFA
  // ...
  const {
    _id,
    imgId,
    interestedTheme = [],
    taxRegistrationNumber,
    websiteLink,
    sector,
    operateCountries,
    interestedMarket,
    headOffice,
    city,
    postalCode,
    address,
    jobPosition,
    description,
  } = data ?? {};
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
                _id={_id}
                capabilities={interestedTheme}
                team={[]}
                avatar={avatar}
                imgId={imgId}
                org={org}
                tax={taxRegistrationNumber}
                headOffice={headOffice}
                websiteLink={websiteLink}
                seekerPlan={dataPlan}
                accepted={owner?.accepted}
                sector={sector}
                operateCountries={operateCountries}
                interestedMarket={interestedMarket}
                city={city}
                postalCode={postalCode}
                address={address}
                jobPosition={jobPosition}
                description={description}
                profile={owner?.profile}
                emails={owner?.emails}
                proEmail={owner?.emails?.[0]?.address}
                challenges={challenges}
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
    const seekerId = props?.match.params.id;
    const handle = Meteor.subscribe("seeker-profile", { seekerId });
    if (!handle.ready()) return { data: {} };
    // ...
    const data = SeekerCollection.findOne(seekerId);
    const dataPlan = SeekerPlanCollection.findOne({ _id: data?.planId });
    // ...
    return {
      data,
      dataPlan,
    };
  })(SeekerProfile)
);
