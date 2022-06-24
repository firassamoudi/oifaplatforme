/* eslint-disable simple-import-sort/sort */

// - Dashobard
import DashboardAdmin from "./Dashboard";
import Stats from "./Dashboard/Stats";
import Seekers from "./Dashboard/Seekers";
import Solvers from "./Dashboard/Solvers";
import Programs from "./Dashboard/Programs";
import ManagePeople from "./Dashboard/ManagePeople";
import Subscribers from "./Dashboard/Subscribers";

export default [
  // - Dashboard
  {
    id: "DashboardAdmin",
    path: "/dashboard/stats",
    Component: DashboardAdmin,
    roles: ["ADMIN_ADMIN", "ADMIN_MEMBER"],
    props: {
      stepIndex: 0,
      Paper: Stats,
    },
  },
  {
    id: "DashboardAdmin",
    path: "/dashboard/seekers",
    Component: DashboardAdmin,
    roles: ["ADMIN_ADMIN", "ADMIN_MEMBER"],
    props: {
      stepIndex: 1,
      Paper: Seekers,
    },
  },
  {
    id: "DashboardAdmin",
    path: "/dashboard/solvers",
    Component: DashboardAdmin,
    roles: ["ADMIN_ADMIN", "ADMIN_MEMBER"],
    props: {
      stepIndex: 2,
      Paper: Solvers,
    },
  },
  {
    id: "DashboardAdmin",
    path: "/dashboard/programs",
    Component: DashboardAdmin,
    roles: ["ADMIN_ADMIN", "ADMIN_MEMBER"],
    props: {
      stepIndex: 3,
      Paper: Programs,
    },
  },
  {
    id: "DashboardAdmin",
    path: "/dashboard/subscribers",
    Component: DashboardAdmin,
    roles: ["ADMIN_ADMIN", "ADMIN_MEMBER"],
    props: {
      stepIndex: 4,
      Paper: Subscribers,
    },
  },
  {
    id: "DashboardAdmin",
    path: "/dashboard/manage-team",
    Component: DashboardAdmin,
    roles: ["ADMIN_ADMIN"],
    props: {
      stepIndex: 5,
      Paper: ManagePeople,
    },
  },
];
