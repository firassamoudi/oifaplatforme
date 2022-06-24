import * as Yup from "yup";

const digitsOnly = (value) => /^\d+$/.test(value);

export const createProfileSchema = Yup.object().shape({
  imgId: Yup.string().min(3),
  // ...
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  organization: Yup.string().required("Organizaion is required"),
  taxRegistrationNumber: Yup.string().required(
    "Tax registration number is required"
  ),
  jobPosition: Yup.string().required("Job position is required"),
  email: Yup.string().email().required("Email is required"),
  // ...
  websiteLink: Yup.string()
    .url("Website url must be a valid URL")
    .required("Website url is required"),
  description: Yup.string().required("Description is required"),
  sector: Yup.array().min(1, "Sector is required"),
  operateCountries: Yup.array().min(1, "Operate countries is required"),
  interestedMarket: Yup.array().min(1, "Interested market is required"),
  headOffice: Yup.string().required("Head office is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string()
    .test("Digits only", "The field should have digits only", digitsOnly)
    .required("Postal code is required"),
  interestedTheme: Yup.array().min(1, "Interested theme is required"),
});
