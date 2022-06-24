import * as Yup from "yup";

export const createAccountSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  organization: Yup.string().required("Organization is required"),
  taxRegistrationNumber: Yup.string().required(
    "Tax registration number is required"
  ),
  jobPosition: Yup.string().required("Job position is required"),
  email: Yup.string().email("Email is required").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const planSchema = Yup.object({
  plan: Yup.string().required(),
});

export const bookedSchema = Yup.object({
  booked: Yup.boolean().required(),
});

export const sidebarStep = [
  {
    label: "Create account",
    icon: "/assets/account details.svg",
    path: "/auth/register/seeker",
    title: "Create your account to start exploring our solution",
    isTab: true,
    lastStep: false,
  },
  {
    label: "Our plans",
    icon: "/create_program/visual.svg",
    path: "/auth/register/seeker/our-plans",
    title: "Oifa Packages overview",
    isTab: true,
    lastStep: false,
  },
  {
    label: "Book a meeting",
    icon: "/assets/Book a meeting.svg",
    path: "/auth/register/seeker/book-a-meeting",
    title: "Meeting with Oifa commercial team",
    isTab: true,
    lastStep: false,
  },
  {
    path: "/auth/register/seeker/account-confirmation",
    isTab: false,
    lastStep: true,
  },
];
