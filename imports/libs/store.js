/**
 * Petit Store
 * Using ~Meteor~ Reactive Dict
 */

import { ReactiveDict } from "meteor/reactive-dict";

export default new ReactiveDict({
  snackbar: {
    key: null,
    variant: null,
    msg: null,
    persist: false,
    close: "",
  },
});
