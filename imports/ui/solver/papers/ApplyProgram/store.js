import { ReactiveDict } from "meteor/reactive-dict";

export default new ReactiveDict({
  applicationMember: {
    open: false,
    id: null,
    founder: true,
    member: false,
  },
});
