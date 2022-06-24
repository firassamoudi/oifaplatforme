import ProgramOverview from "./papers/Program";
import SeekerProfile from "./papers/Seeker";
import SolverProfile from "./papers/Solver";

export default [
  {
    id: "ProgramOverview",
    path: "/dashboard/i/program-overview/:id",
    Component: ProgramOverview,
    roles: [
      "ADMIN_ADMIN",
      "ADMIN_MEMBER",
      "SEEKER_OWNER",
      "SEEKER_CREATOR",
      "EVALUATOR_OWNER",
      "SOLVER_OWNER",
    ],
    props: {},
  },
  {
    id: "ProgramOverview",
    path: "/dashboard/i/cfa-overview/:id",
    Component: ProgramOverview,
    roles: [
      "ADMIN_ADMIN",
      "ADMIN_MEMBER",
      "SEEKER_OWNER",
      "SEEKER_CREATOR",
      "EVALUATOR_OWNER",
      "SOLVER_OWNER",
    ],
    props: {},
  },
  {
    id: "SeekerProfile",
    path: "/dashboard/i/seeker-profile/:id",
    Component: SeekerProfile,
    roles: ["ADMIN_ADMIN", "ADMIN_MEMBER"],
    props: {},
  },
  {
    id: "SolverProfile",
    path: "/dashboard/i/solver-profile/:id",
    Component: SolverProfile,
    roles: [
      "ADMIN_ADMIN",
      "ADMIN_MEMBER",
      "SEEKER_OWNER",
      "SEEKER_CREATOR",
      "EVALUATOR_OWNER",
      "SOLVER_OWNER",
    ],
    props: {},
  },
];
