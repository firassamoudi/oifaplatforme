import "./style.scss";

import Box from "@material-ui/core/Box";
import { withTracker } from "meteor/react-meteor-data";
import moment from "moment";
import React from "react";

import SeekerCollection from "/imports/api/Seeker";

import FileBill from "../../../common/FileBill";
import Typography from "../../../common/Typography";

const Plan = ({ seeker }) => {
  const plan = seeker?.plan() ?? {};
  const type = plan?.type;
  const isSubscription = type === "SUBSCRIPTION";
  const typeLabel = isSubscription ? "Subscription" : "Pay As You Go";
  // ...
  const progrCurrent = plan?.programsCurrent ?? 0;
  const conxsCurrent = plan?.connexionsCurrent ?? 0;
  // ...
  const enDate = plan?.endDate;
  let progLabel = `You still have ${progrCurrent} challenges`;
  let conxLabel = `You still have ${conxsCurrent} connections`;
  if (isSubscription) {
    progLabel += ` until ${moment(enDate).format("DD/MM/YYYY")}`;
    conxLabel += ` until ${moment(enDate).format("DD/MM/YYYY")}`;
  }
  // ...
  const seekerBills = plan?.billings;
  // - Data
  const plans = [
    {
      title: "Plan",
      content: typeLabel,
    },
    {
      title: "Program & CFA",
      content: progLabel,
    },
    {
      title: "Innovation agent connexion",
      content: conxLabel,
    },
    {
      title: "Billing history",
      isBilling: true,
    },
  ];

  // ...
  return (
    <Box className="Settings__Plan">
      {plans.map((plan, index) => (
        <Box className="__Plan__section" key={index}>
          <Typography
            color="#2c303b"
            face="Book"
            size="1.5rem"
            height="1.9rem"
            style={{ margin: "0 0 1.6rem 0" }}
          >
            {plan.title}
          </Typography>
          {!!plan.content && (
            <Typography
              color="#939caf"
              face="Book"
              size="1.5rem"
              height="1.9rem"
            >
              {plan.content}
            </Typography>
          )}
          {!!plan.isBilling && (
            <Box className="Settings__Plan__billings">
              <Box className="Settings__Plan__billings__head">
                <Box className="Settings__Plan__billings__row">
                  <Box className="Settings__Plan__billings__col">
                    Billing period
                  </Box>
                  <Box className="Settings__Plan__billings__col">Receipt</Box>
                </Box>
              </Box>
              <Box className="Settings__Plan__billings__body">
                {seekerBills
                  ?.sort((x, y) => y.startDate - x.startDate)
                  ?.map((bill, index) => {
                    return (
                      <Box
                        className="Settings__Plan__billings__row"
                        key={index}
                      >
                        <Box className="Settings__Plan__billings__col">
                          <FileBill fileId={bill.fileId} {...bill} />
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default withTracker(() => {
  const user = Meteor.user();
  const userId = Meteor.userId();
  const handle = Meteor.subscribe("seeker-profile", {
    seekerId: user?.seekerId,
  });
  if (!handle.ready()) return { user, userId };
  // ...
  const seeker = SeekerCollection.findOne({ _id: user?.seekerId });
  // ...
  return {
    seeker,
  };
})(Plan);
