/* eslint-disable camelcase */
/* eslint-disable sonarjs/no-duplicate-string */

import ProgramsCollection from "/imports/api/Program";

import {
  notif82_84,
  notif88_90,
  notif98,
  notif102,
  notif103,
  notif104,
  notif106,
} from "./notifications";

const CRON_PARSER = "at 00:00";
// const CRON_PARSER = "every 1 mins";

const programsLastDay = (phase) => {
  const dateNow = new Date();
  let compDate = new Date(dateNow);
  compDate = new Date(compDate.setDate(compDate.getDate() + 1));
  // ...
  return ProgramsCollection.find({
    published: true,
    accepted: true,
    [`timeline.${phase}.end`]: { $gte: dateNow, $lte: compDate },
  });
};

const programsNextDay = (phase) => {
  const dateNow = new Date();
  let compDate = new Date(dateNow);
  compDate = new Date(compDate.setDate(compDate.getDate() - 1));
  // ...
  return ProgramsCollection.find({
    published: true,
    accepted: true,
    [`timeline.${phase}.end`]: { $gte: compDate, $lte: dateNow },
  });
};

const applicationsLastDay = () => {
  const programs = programsLastDay(0);
  programs.forEach((program) => {
    // console.log("appLastDay : ", program.title);
    notif82_84(program);
    notif102(program);
  });
};
const applicationsNextDay = () => {
  const programs = programsNextDay(0);
  programs.forEach((program) => {
    // console.log("appNextDay : ", program.title);
    notif106(program);
  });
};

const evaluationsLastDay = () => {
  const programs = programsLastDay(1);
  programs.forEach((program) => {
    // console.log("evalLastDay : ", program.title);
    notif98(program);
    notif103(program);
  });
};
const evaluationsNextDay = () => {};

const selectionLastDay = () => {
  const programs = programsLastDay(2);
  programs.forEach((program) => {
    // console.log("selLastDay : ", program.title);
    notif104(program);
  });
};
const selectionNextDay = () => {
  const programs = programsNextDay(2);
  programs.forEach((program) => {
    // console.log("selNextDay : ", program.title);
    notif88_90(program);
  });
};

const workplaceLastDay = () => {
  // const programs = programsLastDay(3);
  // programs.forEach((program) => {});
};
const workplaceNextDay = () => {
  // const programs = programsNextDay(3);
  // programs.forEach((program) => {});
};

SyncedCron.config({
  collectionName: "__cron_logger",
  log: false,
  collectionTTL: 2628000,
});

SyncedCron.add({
  name: "applications-last-day",
  // ...
  schedule(parser) {
    return parser.text(CRON_PARSER);
  },
  // ...
  job() {
    return applicationsLastDay();
  },
});
SyncedCron.add({
  name: "applications-next-day",
  // ...
  schedule(parser) {
    return parser.text(CRON_PARSER);
  },
  // ...
  job() {
    return applicationsNextDay();
  },
});

SyncedCron.add({
  name: "evaluations-last-day",
  // ...
  schedule(parser) {
    return parser.text(CRON_PARSER);
  },
  // ...
  job() {
    return evaluationsLastDay();
  },
});
SyncedCron.add({
  name: "evaluations-next-day",
  // ...
  schedule(parser) {
    return parser.text(CRON_PARSER);
  },
  // ...
  job() {
    return evaluationsNextDay();
  },
});

SyncedCron.add({
  name: "selection-last-day",
  // ...
  schedule(parser) {
    return parser.text(CRON_PARSER);
  },
  // ...
  job() {
    return selectionLastDay();
  },
});
SyncedCron.add({
  name: "selection-next-day",
  // ...
  schedule(parser) {
    return parser.text(CRON_PARSER);
  },
  // ...
  job() {
    return selectionNextDay();
  },
});

SyncedCron.add({
  name: "workplace-last-day",
  // ...
  schedule(parser) {
    return parser.text(CRON_PARSER);
  },
  // ...
  job() {
    return workplaceLastDay();
  },
});
SyncedCron.add({
  name: "workplace-next-day",
  // ...
  schedule(parser) {
    return parser.text(CRON_PARSER);
  },
  // ...
  job() {
    return workplaceNextDay();
  },
});
