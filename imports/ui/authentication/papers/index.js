/* eslint-disable simple-import-sort/sort */
import "./style.scss";

import SignIn from "./SignIn";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import EmailConfirmation from "./EmailConfirmation";
// import EmailValidation from "./EmailValidation";

// Signup Member
import MemberSignUp from "./SignUp/Member";

// Signup Seeker
import SeekerSignUp from "./SignUp/Seeker";
import SeekerSignUpCreateAccount from "./SignUp/Seeker/CreateAccount";
import SeekerSignUpPlan from "./SignUp/Seeker/Plan";
import SeekerSignUpSetCall from "./SignUp/Seeker/SetCall";

// Signup Solver
import SolverSignUp from "./SignUp/Solver";
import SolverSignUpTypes from "./SignUp/Solver/SolverTypes";
import SolverSignUpCreateAccount from "./SignUp/Solver/CreateAccount";
import SolverSignUpCreateProfile from "./SignUp/Solver/CreateProfile";
import SolverSignUpTrackRecords from "./SignUp/Solver/TrackRecords";
import SolverSignUpTeam from "./SignUp/Solver/Team";
import SolverSignUpHearAboutUs from "./SignUp/Solver/HearAboutUs";
import SolverSignUpSetCall from "./SignUp/Solver/SetCall";

export default [
  //
  // - Common
  //

  {
    id: "SignIn",
    path: "/auth/login",
    Component: SignIn,
    props: {},
  },
  {
    id: "ForgotPassword",
    path: "/auth/forgot-password",
    Component: ForgotPassword,
    props: {},
  },
  {
    id: "ResetPassword",
    path: "/auth/reset-password/:token",
    Component: ResetPassword,
    props: {},
  },
  {
    id: "EmailConfirmation",
    path: "/auth/register/email-confirmation",
    Component: EmailConfirmation,
    props: {},
  },
  // {
  //   id: "EmailValidation",
  //   path: "/auth/register/email-validation/:token",
  //   Component: EmailValidation,
  //   props: {},
  // },

  //
  // - Member
  //

  {
    id: "MemberRegister",
    path: "/auth/register/member/:token",
    Component: MemberSignUp,
    props: {},
  },

  //
  // - Seeker
  //

  {
    id: "SeekerSignUp",
    path: "/auth/register/seeker",
    Component: SeekerSignUp,
    props: {
      stepIndex: 0,
      Paper: SeekerSignUpCreateAccount,
    },
  },
  {
    id: "SeekerSignUp",
    path: "/auth/register/seeker/our-plans",
    Component: SeekerSignUp,
    props: {
      stepIndex: 1,
      Paper: SeekerSignUpPlan,
    },
  },
  {
    id: "SeekerSignUp",
    path: "/auth/register/seeker/book-a-meeting",
    Component: SeekerSignUp,
    props: {
      stepIndex: 2,
      Paper: SeekerSignUpSetCall,
    },
  },

  //
  // - Solver
  //

  {
    id: "SolverSignUp",
    path: "/auth/register/solver",
    Component: SolverSignUp,
    props: {
      stepIndex: 0,
      Paper: SolverSignUpTypes,
    },
  },
  {
    id: "SolverSignUp",
    path: "/auth/register/solver/create-account",
    Component: SolverSignUp,
    props: {
      stepIndex: 1,
      Paper: SolverSignUpCreateAccount,
    },
  },
  {
    id: "SolverSignUp",
    path: "/auth/register/solver/create-profile",
    Component: SolverSignUp,
    props: {
      stepIndex: 2,
      Paper: SolverSignUpCreateProfile,
    },
  },
  {
    id: "SolverSignUp",
    path: "/auth/register/solver/track-records",
    Component: SolverSignUp,
    props: {
      stepIndex: 3,
      Paper: SolverSignUpTrackRecords,
    },
  },
  {
    id: "SolverSignUp",
    path: "/auth/register/solver/team",
    Component: SolverSignUp,
    props: {
      stepIndex: 4,
      Paper: SolverSignUpTeam,
    },
  },
  {
    id: "SolverSignUp",
    path: "/auth/register/solver/hear-about-us",
    Component: SolverSignUp,
    props: {
      stepIndex: 5,
      Paper: SolverSignUpHearAboutUs,
    },
  },
  {
    id: "SolverSignUp",
    path: "/auth/register/solver/book-a-meeting",
    Component: SolverSignUp,
    props: {
      stepIndex: 6,
      Paper: SolverSignUpSetCall,
    },
  },
];
