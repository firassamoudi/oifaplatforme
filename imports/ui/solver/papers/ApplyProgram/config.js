import Joi from "@hapi/joi";

const details = {
  city: Joi.string().min(1),
  country: Joi.string().min(1),
  firstName: Joi.string().min(3),
  lastName: Joi.string().min(3),
  jobPosition: Joi.string().min(3),
  phoneNumber: Joi.string().min(3),
  email: Joi.string().min(3),
};
export const detailsSchemaStartup = Joi.object({
  ...details,
  organization: Joi.string().min(3),
  websiteLink: Joi.string().uri(),
  // foundedDate: Joi.date(),
});
export const detailsSchemaOther = Joi.object({
  ...details,
});
// - Solution
export const solutionSchema = (data) => {
  let valid = true;
  Object.keys(data).forEach((key) => {
    if (key === "challenges") {
      const chls = data[key].filter((chl) => {
        return !!chl.picked;
      });
      if (!chls.length) valid = false;
    } else if (key === "additional-elements") {
      data[key].forEach((link) => {
        if (!link) valid = false;
      });
    } else if (typeof data[key] === "object" && !data[key].answer) {
      valid = false;
    }
  });
  return valid;
};
// ...
export const teamSchemaStartup = Joi.object({
  founders: Joi.array()
    .items(
      Joi.object({
        firstName: Joi.string().min(1),
        lastName: Joi.string().min(1),
        position: Joi.string().min(1),
        linkedinLink: Joi.string().min(1),
      })
    )
    .min(1),
  members: Joi.array().items(
    Joi.object({
      firstName: Joi.string().min(1),
      lastName: Joi.string().min(1),
      position: Joi.string().min(1),
      linkedinLink: Joi.string().min(1),
    })
  ),
});
export const teamSchemaOther = Joi.object({
  founders: Joi.array().items(
    Joi.object({
      firstName: Joi.string().min(1),
      lastName: Joi.string().min(1),
      position: Joi.string().min(1),
      linkedinLink: Joi.string().min(1),
    })
  ),
  members: Joi.array().items(
    Joi.object({
      firstName: Joi.string().min(1),
      lastName: Joi.string().min(1),
      position: Joi.string().min(1),
      linkedinLink: Joi.string().min(1),
    })
  ),
});
// ...
export const hearAboutUsSchema = Joi.object({
  hearAboutUs: Joi.string().min(1),
});

// - Sidebar
export const sidebarStep = [
  {
    label: "### details",
    icon: "/application/details.svg",
    path: "/dashboard/program/:id/applications/:aid/details",
    isTab: true,
  },
  {
    label: "Solution",
    icon: "/application/solution.svg",
    path: "/dashboard/program/:id/applications/:aid/solution",
    isTab: true,
  },
  {
    label: "Team",
    icon: "/application/team.svg",
    path: "/dashboard/program/:id/applications/:aid/team",
    isTab: true,
  },
  {
    label: "Hear about us?",
    icon: "/application/hear_about_us.svg",
    path: "/dashboard/program/:id/applications/:aid/hear-about-us",
    isTab: true,
  },
];
