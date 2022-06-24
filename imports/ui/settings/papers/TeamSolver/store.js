import { ReactiveDict } from "meteor/reactive-dict";

export default new ReactiveDict({
  team: {
    open: false,
    id: null,
    founder: true,
    member: false,
  },
});
