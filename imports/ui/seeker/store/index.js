/**
 * Petit Store
 * Using ~Meteor~ Reactive Dict
 */

import { ReactiveDict } from "meteor/reactive-dict";

export default new ReactiveDict({
  faq: {
    open: false,
    id: null,
  },
  challenge: {
    open: false,
    id: null,
  },
  question: {
    open: false,
    id: null,
  },
});
