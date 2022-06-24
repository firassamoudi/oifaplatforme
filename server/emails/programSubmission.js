import base from "./base";

export default ({ name, program }) => {
  // ...
  // const link = `${process.env.ROOT_URL}/auth/login`;
  // ...
  return base({
    title: "Welcome to Open Innovation For Africa",
    content: `
    <p>Hello ${name}</p>
    <p>Thank you for creating an Open Innovation program on OIFA. We will proceed to review your submission before granting your request to publish <b>${program}</b>.</p>
    <p>Our team will get back to you within the next 24 hours. </p>
    <p>In the meatime, you can take a moment to search for super innovation talents or discover our resources and articles about Innovation.</p>
    <p>The OIFA Team.</p>
    `,
  });
};
