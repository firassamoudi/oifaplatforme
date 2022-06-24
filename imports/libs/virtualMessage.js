/**
 * Virtual Local Message
 */

import SeekerCollection from "/imports/api/Seeker";
import SolverCollection from "/imports/api/Solver";

export default class VirtualMessage {
  constructor(data) {
    this._id = data._id;
    this.content = data.content;
    this.files = data.files;
    this.ownerId = data.ownerId;
  }

  orgOwner() {
    const seeker = SeekerCollection.findOne({ _id: this.ownerId });
    const solver = SolverCollection.findOne({ _id: this.ownerId });
    return seeker || solver;
  }
}
