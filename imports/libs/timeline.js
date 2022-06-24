/**
 * ProgramTimeline
 */

import nowRemain from "./nowRemain";

export default class ProgramTimeline {
  constructor({ data }) {
    this.now = new Date();
    this.phases = data?.map((phase) => {
      return {
        label: phase.label,
        id: phase.id,
        start: phase.start,
        end: phase.end,
        isIn: phase.start - this.now < 0 && phase.end - this.now > 0,
        isOut: phase.end - this.now < 0,
      };
    });
  }

  current() {
    let current = this.phases[0];
    // ...
    for (let i = 0; i < this.phases.length; i += 1) {
      const phase = this.phases[i];
      const nextPhase = this.phases[i + 1];
      // ...
      if (phase && phase.isIn && !phase.isOut) {
        current = { ...phase };
        break;
      } else if (
        phase &&
        !phase.isIn &&
        phase.isOut &&
        nextPhase &&
        !nextPhase.isIn &&
        !nextPhase.isOut
      ) {
        current = { ...nextPhase };
        break;
      }
    }
    // ...
    return current;
  }

  getPhase(id) {
    let phase = {};
    this.phases.forEach((ph) => {
      if (ph.id === id) phase = { ...ph };
    });
    // ...
    return phase;
  }

  isApplications() {
    return this.getPhase("applications")?.isIn;
  }

  isEvaluation() {
    return this.getPhase("evaluations")?.isIn;
  }

  isSelection() {
    return this.getPhase("selection")?.isIn;
  }

  isWorkplace() {
    return this.getPhase("workplace")?.isIn;
  }

  // isPhaseIn(id) {
  //   return this.getPhase(id)?.isIn
  //   return phase.start - this.now < 0 && phase.end - this.now > 0;
  // }

  isPhaseOut(id) {
    const isEndSet = !!this.getPhase(id)?.end;
    if (!isEndSet) return false;
    return this.getPhase(id)?.isOut;
  }

  isValid() {
    let valid = true;
    this.phases.forEach((ph) => {
      if (!ph.start || !ph.end) valid = false;
    });
    // ...
    return valid;
  }

  status() {
    const phase = this.phases[this.phases.length - 1];
    return phase.end && phase.end - this.now < 0 ? "Ended" : "-";
  }

  phaseRemain() {
    const isValid = this.isValid();
    const current = this.current();
    const status = this.status();
    // ...
    return isValid
      ? current?.isIn
        ? `Ends in  ${nowRemain(current.end)}`
        : `Starts in ${nowRemain(current.start)}`
      : status;
  }
}
