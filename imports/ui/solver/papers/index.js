/* eslint-disable simple-import-sort/sort */

// - Dashobard
import DashboardSolver from "./Dashboard";
import Programs from "./Dashboard/Programs";
import SearchPrograms from "./Dashboard/SearchPrograms";
// ...
import ApplyProgram from "./ApplyProgram";
import ApplyProgramDetails from "./ApplyProgram/ApplyDetails";
import ApplyProgramSolution from "./ApplyProgram/ApplySolution";
import ApplyProgramTeam from "./ApplyProgram/ApplyTeam";
import ApplyProgramHearAboutUs from "./ApplyProgram/ApplyHearAboutUs";
import ApplyProgramCongrats from "./ApplyProgramCongrats";

export default [
  // - Apply for a Program
  {
    id: "ApplyProgram",
    path: "/dashboard/program/:id/applications/:aid/details",
    Component: ApplyProgram,
    roles: ["SOLVER_OWNER"],
    props: {
      stepIndex: 0,
      Paper: ApplyProgramDetails,
    },
  },
  {
    id: "ApplyProgram",
    path: "/dashboard/program/:id/applications/:aid/solution",
    Component: ApplyProgram,
    roles: ["SOLVER_OWNER"],
    props: {
      stepIndex: 1,
      Paper: ApplyProgramSolution,
    },
  },
  {
    id: "ApplyProgram",
    path: "/dashboard/program/:id/applications/:aid/team",
    Component: ApplyProgram,
    roles: ["SOLVER_OWNER"],
    props: {
      stepIndex: 2,
      Paper: ApplyProgramTeam,
    },
  },
  {
    id: "ApplyProgram",
    path: "/dashboard/program/:id/applications/:aid/hear-about-us",
    Component: ApplyProgram,
    roles: ["SOLVER_OWNER"],
    props: {
      stepIndex: 3,
      Paper: ApplyProgramHearAboutUs,
    },
  },
  {
    id: "ApplyProgramCongrats",
    path: "/dashboard/program/:id/applications/:aid/congrats",
    Component: ApplyProgramCongrats,
    roles: ["SOLVER_OWNER"],
    props: {},
  },
  // - Dashboard
  {
    id: "DashboardSolver",
    path: "/dashboard/programs",
    Component: DashboardSolver,
    roles: ["SOLVER_OWNER"],
    props: {
      stepIndex: 0,
      Paper: Programs,
    },
  },
  {
    id: "DashboardSolver",
    path: "/dashboard/search-programs",
    Component: DashboardSolver,
    roles: ["SOLVER_OWNER"],
    props: {
      stepIndex: 1,
      Paper: SearchPrograms,
    },
  },
];
