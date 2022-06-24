import base from "./base";

export default ({ name, email, program }) => {
  // ...
  return base({
    title: "Welcome to Open Innovation For Africa",
    content: `
    <p>Hello ${name}</p>
    <p>Congratulations! Your program <b>${program}</b> was successfully validated by OIFA team.</p>
    <p>You can now add your evaluator(s), track the applications and search for innovation talents.</p>
    <p>Please note that you can still edit your program.</p>
    <p>Need further assistance, reach out to our team at <b>${email}</b>.</p>
    <p>The OIFA Team.</p>
    `,
  });
};
