import base from "./base";

export default ({ orgName, program }) => {
  return base({
    title: `You have been assigned to ${program} program.`,
    content: `
    <p>Hello</p>
    <p>${orgName} has marked you as an evaluator for ${program}. </p>
    <p>Start evaluating the applications. </p>
    <p>The OIFA Team.</p>
    `,
  });
};
