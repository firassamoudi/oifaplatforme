import "./style.scss";

import moment from "moment";
import React from "react";

import Typography from "../../Typography";

const ProfileDropHead = ({ seeker }) => {
  const seekerPlan = seeker?.plan?.() ?? {};
  // ...
  const type = seekerPlan?.type;
  const isSubscription = type === "SUBSCRIPTION";
  const typeLabel = isSubscription ? "Subscription plan" : "Pay As You Go plan";
  // ...
  const progrCurrent = seekerPlan?.programsCurrent ?? 0;
  const conxsCurrent = seekerPlan?.connexionsCurrent ?? 0;
  const enDate = seekerPlan?.endDate;
  // ...
  return (
    <div className="ProfileDropHead">
      <Typography color="#021C30" face="Medium" size="1.6rem" m="0 0 1rem 0">
        {typeLabel}
      </Typography>
      <Typography color="#7C8799" size="1.3rem" face="Medium" m="0 0 0.7rem 0">
        {`Still have ${progrCurrent} challenges`}
      </Typography>
      <Typography color="#7C8799" size="1.3rem" face="Medium">
        {`Still have ${conxsCurrent} connections`}
      </Typography>
      {isSubscription && (
        <Typography color="#7C8799" size="1.2rem" face="Medium" m="1rem 0 0 0">
          {`Expiration date : ${moment(enDate).format("DD/MM/YYYY")}`}
        </Typography>
      )}
    </div>
  );
};

export default ProfileDropHead;
