import { ifYouAre } from "../helpers";
import SeekerPlanCollection from ".";

Meteor.methods({
  "seeker.plan.update"({ data }) {
    ifYouAre(["ADMIN_ADMIN", "ADMIN_MEMBER"]);
    // ...
    const _id = data._id;
    SeekerPlanCollection.update(_id, { $set: { ...data } });
  },
});
