import base from "./base";

export default ({ name, email }) => {
  // ...
  const link = `${process.env.ROOT_URL}/auth/login`;
  // ...
  return base({
    title: "Welcome to Open Innovation For Africa",
    content: `
    <p>Hello ${name}</p>
    <p>This is OIFA admin. I want to officially welcome you on OIFA. You will see that it has never been easier to access a qualified ecosystem of African innovation talents.</p>
    <p>You can start now your journey at OIFA! African Innovation talents are waiting for your opportunities! Go online and submit your open innovation program or search for talents to collaborate with.</p>
    <p>I also invite you to check our [guides, tutorials,..] to get you started.</p>
    <p>Should you have any questions, please reach out to our great customer support team at ${email}</p>
    <p>In our efforts to consistently improve your experience on our platform, your opinion is of great value to us. We would appreciate if you could take 2 minutes to tell us why you joined OIFA by answering this email directly!</p>
    <p>Looking forward to hearing from you.</p>
    `,
    link,
    linkLabel: "Sign in",
  });
};
