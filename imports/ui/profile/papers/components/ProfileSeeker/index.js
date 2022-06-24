import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";

import SeekerCollection from "/imports/api/Seeker";
import { getOptionLabel } from "/imports/libs/inputs";

import BoxTitled from "./BoxTitled/BoxTitled";
import BoxTitledBillings from "./BoxTitledBillings/BoxTitledBillings";
import CapList from "./CapList/CapList";
import ChallengesBox from "./ChallengesBox/ChallengesBox";
import ChallengesTabs from "./ChallengesBox/ChallengesTabs/ChallengesTabs";
import Description from "./Description/Description";
import SeekerInfo from "./SeekerInfo/SeekerInfo";
import SeekerPlanBillingsModal from "./SeekerPlanBillingsModal";
import SeekerPlanModal from "./SeekerPlanModal";
import SendSection from "./SendSection/SendSection";

const Profile = (props) => {
  const seekerId = props._id;
  const seekerPlan = props.seekerPlan;
  const seekerPlanType =
    seekerPlan?.type === "SUBSCRIPTION" ? "Subscription" : "Pay as you go";
  // ...
  const plan = [
    {
      title: "Type of plan",
      text: seekerPlanType,
    },
  ];
  // ...
  const contact = [
    {
      title: "Full name",
      text: `${props.profile?.firstName} ${props.profile?.lastName}`,
    },
    {
      title: "Job position",
      text: getOptionLabel({
        optionsList: "jobPositionOptions",
        value: props.jobPosition,
      }),
    },
    {
      title: "Professional Email",
      text: props.proEmail,
    },
  ];
  const organization = [
    { title: "Sector", text: props.sector },
    {
      title: "Where do you operate?",
      text: props.operateCountries,
    },
    {
      title: "Which market are you interested in?",
      text: props.interestedMarket,
    },
    {
      title: "Head Office",
      text: getOptionLabel({
        optionsList: "countriesOptions",
        value: props.headOffice,
      }),
    },
    { title: "Address", text: props.address },
    { title: "City", text: props.city },
    { title: "Post code", text: props.postalCode },
  ];
  // - Seeker Plan
  const [planModal, setPlanModal] = useState({ open: false, data: {} });
  const [planBillingModal, setPlanBillingModal] = useState({
    open: false,
    data: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  // ...
  const onEditPlan = () => {
    setPlanModal({ open: true, data: { ...props.plan } });
  };
  const onEditPlanBilling = () => {
    setPlanBillingModal({ open: true, data: { ...props.plan } });
  };
  const onCloseModel = () => {
    setPlanModal({ open: false, data: {} });
    setPlanBillingModal({ open: false, data: {} });
  };
  // ...
  const onPlanChange = (data) => {
    setIsLoading(true);
    /// ...
    if (!props.accepted) {
      Meteor.call("user.admin.seeker.accept", { data: { _id: props._id } });
    }
    Meteor.call("seeker.plan.update", { data }, () => {
      setIsLoading(false);
      onCloseModel();
    });
  };
  // ...
  return (
    <Box className="SolverProfile">
      <Box component="aside">
        <Box className="SolverProfile__action">
          <Box className="SolverProfile__send">
            <SendSection
              _id={props._id}
              avatar={props.avatar}
              imgId={props.imgId}
              org={props.org}
              isAdmin={props.isAdmin}
              accepted={props.accepted}
              onEditPlan={onEditPlan}
            />
          </Box>
          <SeekerInfo tax={props.tax} websiteLink={props.websiteLink} />
        </Box>
        <Box className="SolverProfile__Box">
          <BoxTitled title="Contact details" sections={contact} />
        </Box>

        {props.isAdmin && (
          <>
            <Box className="SolverProfile__Box">
              <BoxTitled
                title="Plan"
                sections={plan}
                handlerTitle="Modify Plan"
                handler={onEditPlan}
              />
            </Box>
            <Box className="SolverProfile__Box">
              <BoxTitledBillings
                title="Billings"
                data={{ ...props.seekerPlan }}
                handlerTitle="+ Add new bill"
                handler={onEditPlanBilling}
              />
            </Box>
          </>
        )}
      </Box>
      <Box component="main">
        <Box className="SolverProfile__Box">
          <BoxTitled title="Organization details" sections={organization} />
        </Box>
        {!!props.description && (
          <Box component="section" className="SolverProfile__Box">
            <Description
              title="Short description & key metrics"
              para={props.description}
            />
          </Box>
        )}
        {!!props.capabilities.length && (
          <Box component="section">
            <CapList
              title="What innovation themes are you interested in?"
              capabilities={props.capabilities}
            />
          </Box>
        )}
        <Box component="section">
          <ChallengesBox>
            <ChallengesTabs challenges={props.challenges} />
          </ChallengesBox>
        </Box>
      </Box>

      <SeekerPlanModal
        open={planModal.open}
        seekerId={seekerId}
        onPlanChange={onPlanChange}
        onCloseModel={() => onCloseModel()}
        isLoading={isLoading}
      />

      <SeekerPlanBillingsModal
        open={planBillingModal.open}
        seekerId={seekerId}
        onPlanChange={onPlanChange}
        onCloseModel={() => onCloseModel()}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default withTracker(({ ...props }) => {
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
    ...props,
  };
})(Profile);
