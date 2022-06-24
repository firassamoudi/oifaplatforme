import base from "./base";

export default ({ progId, progTitle }) => {
  const link = `${process.env.ROOT_URL}/dashboard/programs/${progId}/applications`;
  // ...
  return base({
    title: "Welcome to Open Innovation For Africa",
    content: `
    <p>Hello</p>
    <p>Your call for application for <b>${progTitle}</b> is done! It is now time to start reviewing your applications.</p>
    <p>Check applications <a href="${link}" style="font-size:16px;color:#838fa7;line-height:25px;font-weight:500;">here</a>.</p>
    <p>The OIFA Team.</p>
    `,
  });
};
