import base from "./base";

export default (user, url) => {
  const regexp = /reset-password\/(.+)/;
  const matchs = url.match(regexp);
  const link = `${process.env.ROOT_URL}/auth/reset-password/${matchs[1]}`;
  // ...
  return base({
    title: "Reset your password",
    content: `
      <p>Hi ${user.profile.firstName}!</p> 
      <p>A request has been received to change the password for your account. Click the button below to rest it.</p>
      <p>If you did not initiate this request, you can safely ignore this email or reply to let us know.</p>
      <p>The OIFA Team</p>`,
    link,
    linkLabel: "Reset your password",
  });
};
