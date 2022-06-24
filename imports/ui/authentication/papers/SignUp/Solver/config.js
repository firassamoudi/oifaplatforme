/* eslint-disable sonarjs/no-duplicate-string */
import * as Yup from "yup";

// eslint-disable-next-line no-useless-escape
const URL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const typeSchema = Yup.object({
  type: Yup.string().required(),
});

const account = {
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Email is required").required("Email is required"),
  password: Yup.string().required("Password is required"),
  jobPosition: Yup.string().required("Job position is required"),
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number is required")
    .required("Phone number is required"),
};
export const accountSchemaStartup = Yup.object({ ...account });
export const accountSchemaOther = Yup.object({
  ...account,
  linkedinLink: Yup.string()
    .matches(URL, "Linkedin link is required")
    .required("Linkedin link is required"),
});
// ...
const details = {
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  capabilities: Yup.array().min(1, "Capabilities are required"),
};
export const detailsSchemaStartup = Yup.object({
  ...details,
  organization: Yup.string().required("Organization is required"),
  websiteLink: Yup.string()
    .matches(URL, "Website link is required")
    .required("Website link is required"),
  foundedDate: Yup.date(),
  description: Yup.string().required("Description is required"),
  sector: Yup.array().min(1),
  maturityLevel: Yup.string().required("Maturity level is required"),
});
export const detailsSchemaDD = Yup.object({
  ...details,
  experience: Yup.string().required("Experience is required"),
  openInnovationExperience: Yup.string().required(
    "Open Innovation Experience is required"
  ),
});
export const detailsSchemaStudent = Yup.object({
  ...details,
  degree: Yup.string().required("Field is required"),
  institution: Yup.string().required("Field is required"),
  yearsToGraduate: Yup.string().required("Field is required"),
  internship: Yup.string().required("Field is required"),
  openInnovationExperience: Yup.string().required("Field is required"),
});
export const detailsSchemaResearcher = Yup.object({
  ...details,
  expertise: Yup.string().required("Field is required"),
  institution: Yup.string().required("Field is required"),
  openInnovationExperience: Yup.string().required("Field is required"),
});
// ...
export const trackRecordSchemaStartup = Yup.object({
  trackRecordNbClient: Yup.string().required("Field is required"),
  trackRecordClientsPartners: Yup.string().required("Field is required"),
  trackRecordCommunitySize: Yup.string().required("Field is required"),
  trackRecordRevenue: Yup.string().required("Field is required"),
  pitchDeck: Yup.string()
    .matches(URL, "Pitch link is required")
    .required("Pitch link is required"),
  demoLink: Yup.string()
    .matches(URL, "Demo link is required")
    .required("Demo link is required"),
});
export const trackRecordSchemaOther = Yup.object({
  trackRecord: Yup.string().required("Field is required"),
  trackRecordFiles: Yup.array(),
});
// ...
export const teamSchemaStartup = Yup.object({
  founders: Yup.array()
    .of(
      Yup.object({
        // firstName: Yup.string().required("First name is required"),
        // lastName: Yup.string().required("Last name is required"),
        // position: Yup.string().required("Position is required"),
        // linkedinLink: Yup.string()
        //   .matches(URL, "LinkedIn link is required")
        //   .required("Position is required"),
      })
    )
    .min(1),
  members: Yup.array().of(
    Yup.object({
      // firstName: Yup.string().required("First name is required"),
      // lastName: Yup.string().required("Last name is required"),
      // position: Yup.string().required("Position is required"),
      // linkedinLink: Yup.string()
      //   .matches(URL, "LinkedIn link is required")
      //   .required("LinkedIn link is required"),
    })
  ),
});
export const teamSchemaOther = Yup.object({});
// ...
export const hearAboutUsSchema = Yup.object({
  hearAboutUs: Yup.string().min(1),
});
// ...
export const bookedSchema = Yup.object({
  booked: Yup.boolean(),
});

// ...

export const idxStartupSchema = [
  typeSchema,
  accountSchemaStartup,
  detailsSchemaStartup,
  trackRecordSchemaStartup,
  teamSchemaStartup,
  hearAboutUsSchema,
  bookedSchema,
];

export const idxDesignerSchema = [
  typeSchema,
  accountSchemaOther,
  detailsSchemaDD,
  trackRecordSchemaOther,
  teamSchemaOther,
  hearAboutUsSchema,
  bookedSchema,
];

export const idxDeveloperSchema = [
  typeSchema,
  accountSchemaOther,
  detailsSchemaDD,
  trackRecordSchemaOther,
  teamSchemaOther,
  hearAboutUsSchema,
  bookedSchema,
];

export const idxStudentSchema = [
  typeSchema,
  accountSchemaOther,
  detailsSchemaStudent,
  trackRecordSchemaOther,
  teamSchemaOther,
  hearAboutUsSchema,
  bookedSchema,
];

export const idxResearcherSchema = [
  typeSchema,
  accountSchemaOther,
  detailsSchemaResearcher,
  trackRecordSchemaOther,
  teamSchemaOther,
  hearAboutUsSchema,
  bookedSchema,
];

// - Sidebar
const title = "Create your ### account to start exploring our solution";
const icon = "/create_program/visual.svg";

export const sidebarStep = [
  {
    path: "/auth/register/solver",
    isTab: false,
    noSidebar: true,
  },
  {
    label: "Account details",
    icon: "/assets/account details.svg",
    path: "/auth/register/solver/create-account",
    title,
    isTab: true,
  },
  {
    label: "### details",
    icon,
    path: "/auth/register/solver/create-profile",
    title,
    isTab: true,
  },
  {
    label: "Track records",
    icon: "/assets/Track records.svg",
    path: "/auth/register/solver/track-records",
    title,
    isTab: true,
  },
  {
    label: "Team",
    icon: "/assets/Team.svg",
    path: "/auth/register/solver/team",
    title,
    isTab: true,
  },
  {
    label: "Hear about us?",
    icon: "/assets/Hear about us.svg",
    path: "/auth/register/solver/hear-about-us",
    title,
    isTab: true,
  },
  {
    label: "Book a meeting",
    icon: "/assets/Book a meeting.svg",
    path: "/auth/register/solver/book-a-meeting",
    title,
    isTab: true,
  },
];
