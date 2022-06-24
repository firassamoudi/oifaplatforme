import { ReactiveDict } from "meteor/reactive-dict";

export default new ReactiveDict({
  member: {
    open: false,
    id: null,
    founder: true,
    member: false,
  },
});
