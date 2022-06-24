import { getOptionLabel } from "/imports/libs/inputs";

export const getSolverInfo = ({ data }) => [
  {
    title: "Website",
    para: data.websiteLink,
  },
  {
    title: "Founded date",
    para: data.foundedDate,
  },
  {
    title: "Country",
    para: getOptionLabel({
      optionsList: "countriesOptions",
      value: data.country,
    }),
  },
  {
    title: "City",
    para: data.city,
  },
];

export const getContactInfo = ({ data }) => [
  {
    title: "Contact name",
    para: `${data.firstName} ${data.lastName}`,
  },
  {
    title: "Contact email",
    para: data.email,
  },
  {
    title: "Contact phone",
    para: data.phoneNumber,
  },
];

export const getSolverSolution = ({ data, program, solverType }) => {
  let template = [];
  if (solverType === "Startup") template = [...program.questionsStartup];
  if (solverType === "Developer") template = [...program.questionsDeveloper];
  if (solverType === "Designer") template = [...program.questionsDesigner];
  if (solverType === "Student") template = [...program.questionsStudent];
  if (solverType === "Researcher") template = [...program.questionsResearcher];
  // ...
  const dataReturn = [];
  template.forEach((ques) => {
    const id = ques.id;
    const title = ques.label;
    const answer = data[id];
    if (id === "challenges") {
      dataReturn.push({ id, title, challenges: answer });
    } else if (answer && Array.isArray(answer)) {
      dataReturn.push({ id, title, list: answer });
    } else if (answer) {
      dataReturn.push({ id, title, para: answer.answer });
    }
  });
  // ...
  return dataReturn;
};
