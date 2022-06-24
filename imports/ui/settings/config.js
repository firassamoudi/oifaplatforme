import AccountSeeker from "./papers/AccountSeeker";
import AccountSolver from "./papers/AccountSolver";
import Plan from "./papers/Plan";
import Profile from "./papers/Profile";
import RessourcesSolver from "./papers/RessourcesSolver";
import Security from "./papers/Security";
import TeamSolver from "./papers/TeamSolver";

export const settingsTabs = [
  {
    label: "Edit Profile",
    Paper: Profile,
  },
  {
    label: "Edit Account",
    Paper: AccountSeeker,
    roles: ["SEEKER_OWNER"],
  },
  {
    label: "Edit Account",
    Paper: AccountSolver,
    roles: ["SOLVER_OWNER"],
  },
  {
    label: "Edit Ressouces",
    Paper: RessourcesSolver,
    roles: ["SOLVER_OWNER"],
  },
  {
    label: "Edit Team",
    Paper: TeamSolver,
    solverRole: "Startup",
    roles: ["SOLVER_OWNER"],
  },
  {
    label: "Security",
    Paper: Security,
  },
  {
    label: "Plan & Billing",
    Paper: Plan,
    roles: ["SEEKER_OWNER"],
  },
];
