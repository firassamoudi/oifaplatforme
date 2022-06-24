import base from "./base";

export default ({ name, email }) => {
  // ...
  const link = `${process.env.ROOT_URL}/auth/login`;
  // ...
  return base({
    title: "Welcome to Open Innovation For Africa",
    content: `
    <p>Hello ${name}</p>
    <p>I am OIFA admin, I just wanted to take a moment to thank you for signing up. On OIFA, you’ll be able to find the right business opportunities that will help you grow your portfolio.</p>
    <p>To kick-off your journey with us, start exploring challenges on our platform.</p>
    <p>You can also reach out to our great customer support team with any questions at ${email}</p>
    <p>In our efforts to consistently improve your experience on our platform, your opinion is of great value to us. We would appreciate if you could take 2 minutes to tell us why you joined OIFA by answering this email directly! The OIFA Team.</p>
    `,
    link,
    linkLabel: "Sign in",
  });
};
