import base from "./base";

export default (user, url) => {
  const regexp = /verify-email\/(.+)/;
  const matchs = url.match(regexp);
  const link = `${process.env.ROOT_URL}/auth/register/email-validation/${matchs[1]}`;
  // ...
  return base({
    title: "Validate your email",
    content: `
      <p>Hi ${user.profile.firstName}!</p> 
      <p>To finish signing up, please confirm that we’ve got the right email by clicking on the button below.</p>
      <p>If you didn’t create this account, you can safely ignore this email.</p>
      <p>The OIFA Team</p>`,
    link,
    linkLabel: "Validate your email",
  });
};
