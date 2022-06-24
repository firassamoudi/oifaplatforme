/* eslint-disable simple-import-sort/sort */
// - Dashobard
import DashboardEvaluator from "./Dashboard";
import Programs from "./Dashboard/Programs";
import Applications from "./Dashboard/Applications";
// ...
import ApplicationEvaluation from "./ApplicationEvaluation";

export default [
  // - Dashboard
  {
    id: "DashboardEvaluator",
    path: "/dashboard/programs",
    Component: DashboardEvaluator,
    roles: ["EVALUATOR_OWNER"],
    props: {
      stepIndex: 0,
      Paper: Programs,
    },
  },
  {
    id: "DashboardEvaluator",
    path: "/dashboard/programs/:id/applications",
    Component: DashboardEvaluator,
    roles: ["EVALUATOR_OWNER"],
    props: {
      stepIndex: 0,
      Paper: Applications,
    },
  },
  {
    id: "ApplicationEvaluation",
    path: "/dashboard/programs/:id/applications/:aid/evaluate",
    Component: ApplicationEvaluation,
    roles: ["EVALUATOR_OWNER"],
    props: {},
  },
];
