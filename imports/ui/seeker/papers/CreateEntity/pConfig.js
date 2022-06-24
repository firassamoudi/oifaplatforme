import Joi from "@hapi/joi";

export const detailsSchema = Joi.object({
  title: Joi.string().min(3),
  sector: Joi.array().min(1),
  context: Joi.string().min(3),
});
// ...
export const visualSchema = Joi.object({
  imgId: Joi.string().min(1),
});
// ...
export const incentiveSchema = Joi.object({
  incentive: Joi.object({
    incubation: Joi.string().empty(""),
    cashPrize: Joi.string().empty(""),
    testProductOnMarket: Joi.string().empty(""),
    equipments: Joi.string().empty(""),
    trainings: Joi.string().empty(""),
    other: Joi.string().empty(""),
  }).min(1),
});
// ...
export const copyrightSchema = Joi.object({
  copyright: Joi.string().min(3),
});
// ...
export const timelineSchema = Joi.object({
  timeline: Joi.array()
    .items(
      Joi.object({
        label: Joi.string().min(1),
        start: Joi.date(),
        end: Joi.date(),
      })
    )
    .min(4),
});
// ...
export const faqSchema = Joi.object({
  faq: Joi.array()
    .min(1)
    .max(13)
    .items(
      Joi.object({
        question: Joi.string().min(3),
        response: Joi.string().min(3),
      })
    ),
});
// ...
export const targetSchema = Joi.object({
  targetAudience: Joi.array().min(1),
  geographicalScope: Joi.array().min(1),
  maturityLevel: Joi.string().min(1),
  capabilities: Joi.array().min(1),
  criteria: Joi.array().min(1),
});
// ...
export const challengesSchema = Joi.object({
  challenges: Joi.array().min(1).items(Joi.object({})),
});

export const applicationQuestionsSchema = Joi.object({
  questionsStartup: Joi.array().min(1),
  questionsDesigner: Joi.array().min(1),
  questionsDeveloper: Joi.array().min(1),
  questionsStudent: Joi.array().min(1),
  questionsResearcher: Joi.array().min(1),
});

// ...
export const sidebarSteps = [
  {
    label: "Program details",
    icon: "/create_program/details.svg",
    completed: false,
    path: "/dashboard/programs/:id/program-details",
    isTab: true,
    lastStep: false,
  },
  {
    label: "Program visual",
    icon: "/create_program/visual.svg",
    completed: false,
    path: "/dashboard/programs/:id/program-visual",
    isTab: true,
    lastStep: false,
  },
  {
    label: "Incentive",
    icon: "/create_program/incentive.svg",
    completed: false,
    path: "/dashboard/programs/:id/program-incentive",
    isTab: true,
    lastStep: false,
  },
  {
    label: "Copyright",
    icon: "/create_program/copyright.svg",
    completed: false,
    path: "/dashboard/programs/:id/program-copyright",
    isTab: true,
    lastStep: false,
  },
  {
    label: "Timeline",
    icon: "/create_program/timeline.svg",
    completed: false,
    path: "/dashboard/programs/:id/program-timeline",
    isTab: true,
    lastStep: false,
  },
  {
    label: "FAQ",
    icon: "/create_program/faq.svg",
    completed: false,
    path: "/dashboard/programs/:id/program-faq",
    isTab: true,
    lastStep: false,
  },
  {
    label: "Target audience",
    icon: "/create_program/target_audience.svg",
    completed: false,
    path: "/dashboard/programs/:id/program-target-audience",
    isTab: true,
    lastStep: false,
  },
  {
    label: "Challenge information",
    icon: "/create_program/challenge_information.svg",
    completed: false,
    path: "/dashboard/programs/:id/program-challenge-information",
    isTab: true,
    lastStep: false,
  },
  {
    label: "Application questions",
    icon: "/create_program/application_question.svg",
    completed: false,
    path: "/dashboard/programs/:id/program-application-questions",
    isTab: true,
    lastStep: false,
  },
  {
    path: "/dashboard/programs/:id/program-congrats",
    isTab: false,
    lastStep: true,
  },
];
