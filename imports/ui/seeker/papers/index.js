/* eslint-disable simple-import-sort/sort */
// - Ombording
import Ombording from "./Ombording";
import OmbordingCreateProfile from "./Ombording/CreateProfile";
import OmbordingGuide from "./Ombording/Guide";

// - Create Entity
import CreateProgram from "./CreateEntity/CreateProgram";
import CreateCFA from "./CreateEntity/CreateCFA";
// ...
import CreateEntityChallenge from "./CreateEntity/Challenge";
import CreateEntityCongrats from "./CreateEntity/Congrats";
import CreateEntityCopyright from "./CreateEntity/Copyright";
import CreateEntityDetails from "./CreateEntity/Details";
import CreateEntityFaq from "./CreateEntity/Faq";
import CreateEntityIncentive from "./CreateEntity/Incentive";
import CreateEntityQuestions from "./CreateEntity/Questions";
import CreateEntityTarget from "./CreateEntity/Target";
import CreateEntityTimeline from "./CreateEntity/Timeline";
import CreateEntityVisual from "./CreateEntity/Visual";

// - Dashobard
import DashboardSeeker from "./Dashboard";
import Programs from "./Dashboard/Programs";
import CFAs from "./Dashboard/CFAs";
import SearchInnovation from "./Dashboard/SearchInnovation";
import ManagePeople from "./Dashboard/ManagePeople";
// ...
import Applications from "./Dashboard/Applications";
import Evaluations from "./Dashboard/Evaluations";
import ApplicationEvaluation from "./ApplicationEvaluation";
import ApplicationEvaluationView from "./ApplicationEvaluationView";

export default [
  // Seeker Ombording
  {
    id: "Ombording",
    path: "/dashboard/ombording/create-profile",
    Component: Ombording,
    roles: ["SEEKER_OWNER"],
    props: {
      stepIndex: 0,
      Paper: OmbordingCreateProfile,
    },
  },
  {
    id: "Ombording",
    path: "/dashboard/ombording/guide",
    Component: Ombording,
    roles: ["SEEKER_OWNER"],
    props: {
      stepIndex: 1,
      Paper: OmbordingGuide,
    },
  },
  //
  // Seeker CreateProgram
  //
  {
    id: "CreateProgram",
    path: "/dashboard/programs/:id/program-details",
    Component: CreateProgram,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 0,
      Paper: CreateEntityDetails,
    },
  },
  {
    id: "CreateProgram",
    path: "/dashboard/programs/:id/program-visual",
    Component: CreateProgram,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 1,
      Paper: CreateEntityVisual,
    },
  },
  {
    id: "CreateProgram",
    path: "/dashboard/programs/:id/program-incentive",
    Component: CreateProgram,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 2,
      Paper: CreateEntityIncentive,
    },
  },
  {
    id: "CreateProgram",
    path: "/dashboard/programs/:id/program-copyright",
    Component: CreateProgram,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 3,
      Paper: CreateEntityCopyright,
    },
  },
  {
    id: "CreateProgram",
    path: "/dashboard/programs/:id/program-timeline",
    Component: CreateProgram,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 4,
      Paper: CreateEntityTimeline,
    },
  },
  {
    id: "CreateProgram",
    path: "/dashboard/programs/:id/program-faq",
    Component: CreateProgram,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 5,
      Paper: CreateEntityFaq,
    },
  },
  {
    id: "CreateProgram",
    path: "/dashboard/programs/:id/program-target-audience",
    Component: CreateProgram,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 6,
      Paper: CreateEntityTarget,
    },
  },
  {
    id: "CreateProgram",
    path: "/dashboard/programs/:id/program-challenge-information",
    Component: CreateProgram,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 7,
      Paper: CreateEntityChallenge,
    },
  },
  {
    id: "CreateProgram",
    path: "/dashboard/programs/:id/program-application-questions",
    Component: CreateProgram,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 8,
      Paper: CreateEntityQuestions,
    },
  },
  {
    id: "CreateProgram",
    path: "/dashboard/programs/:id/program-congrats",
    Component: CreateProgram,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 9,
      Paper: CreateEntityCongrats,
    },
  },
  //
  // Seeker CreateCFA
  //
  {
    id: "CreateCFA",
    path: "/dashboard/call-for-applications/:id/cfa-details",
    Component: CreateCFA,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 0,
      Paper: CreateEntityDetails,
    },
  },
  {
    id: "CreateCFA",
    path: "/dashboard/call-for-applications/:id/cfa-visual",
    Component: CreateCFA,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 1,
      Paper: CreateEntityVisual,
    },
  },
  {
    id: "CreateCFA",
    path: "/dashboard/call-for-applications/:id/cfa-incentive",
    Component: CreateCFA,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 2,
      Paper: CreateEntityIncentive,
    },
  },
  {
    id: "CreateCFA",
    path: "/dashboard/call-for-applications/:id/cfa-copyright",
    Component: CreateCFA,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 3,
      Paper: CreateEntityCopyright,
    },
  },
  {
    id: "CreateCFA",
    path: "/dashboard/call-for-applications/:id/cfa-timeline",
    Component: CreateCFA,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 4,
      Paper: CreateEntityTimeline,
    },
  },
  {
    id: "CreateCFA",
    path: "/dashboard/call-for-applications/:id/cfa-faq",
    Component: CreateCFA,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 5,
      Paper: CreateEntityFaq,
    },
  },
  {
    id: "CreateCFA",
    path: "/dashboard/call-for-applications/:id/cfa-target-audience",
    Component: CreateCFA,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 6,
      Paper: CreateEntityTarget,
    },
  },
  {
    id: "CreateCFA",
    path: "/dashboard/call-for-applications/:id/cfa-application-questions",
    Component: CreateCFA,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 7,
      Paper: CreateEntityQuestions,
    },
  },
  {
    id: "CreateCFA",
    path: "/dashboard/call-for-applications/:id/cfa-congrats",
    Component: CreateCFA,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 8,
      Paper: CreateEntityCongrats,
    },
  },
  //
  // Seeker Dashboard - Programs
  //
  {
    id: "DashboardSeeker",
    path: "/dashboard/programs",
    Component: DashboardSeeker,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR", "SEEKER_SEARCHER"],
    props: {
      stepIndex: 0,
      Paper: Programs,
    },
  },
  {
    id: "DashboardSeeker",
    path: "/dashboard/programs/:id/applications",
    Component: DashboardSeeker,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 0,
      Paper: Applications,
    },
  },
  {
    id: "DashboardSeeker",
    path: "/dashboard/programs/:id/applications/:aid/evaluations",
    Component: DashboardSeeker,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 0,
      Paper: Evaluations,
    },
  },
  //
  // Seeker Dashboard - CFAs
  //
  {
    id: "DashboardSeeker",
    path: "/dashboard/call-for-applications",
    Component: DashboardSeeker,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR", "SEEKER_SEARCHER"],
    props: {
      stepIndex: 1,
      Paper: CFAs,
    },
  },
  {
    id: "DashboardSeeker",
    path: "/dashboard/call-for-applications/:id/applications",
    Component: DashboardSeeker,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 1,
      Paper: Applications,
    },
  },
  {
    id: "DashboardSeeker",
    path: "/dashboard/call-for-applications/:id/applications/:aid/evaluations",
    Component: DashboardSeeker,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR"],
    props: {
      stepIndex: 1,
      Paper: Evaluations,
    },
  },
  //
  // Seeker Dashboard - Application Evaluations
  //
  {
    id: "ApplicationEvaluation",
    path: "/dashboard/programs/:id/applications/:aid/view",
    Component: ApplicationEvaluationView,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR", "SEEKER_SEARCHER"],
    props: {},
  },
  {
    id: "ApplicationEvaluation",
    path: "/dashboard/programs/:id/applications/:aid/evaluator/:oid/evaluate",
    Component: ApplicationEvaluation,
    roles: ["SEEKER_OWNER", "SEEKER_CREATOR", "SEEKER_SEARCHER"],
    props: {},
  },
  //
  // Seeker Dashboard - Search
  //
  {
    id: "DashboardSeeker",
    path: "/dashboard/search-innovation-agent",
    Component: DashboardSeeker,
    roles: ["SEEKER_OWNER", "SEEKER_SEARCHER"],
    props: {
      stepIndex: 2,
      Paper: SearchInnovation,
    },
  },
  //
  // Seeker Dashboard - Team
  //
  {
    id: "DashboardSeeker",
    path: "/dashboard/manage-team",
    Component: DashboardSeeker,
    roles: ["SEEKER_OWNER"],
    props: {
      stepIndex: 3,
      Paper: ManagePeople,
    },
  },
];
