import base from "./base";

export default ({ progTitle }) => {
  return base({
    title: `Close deadline! Finish your application now to ${progTitle}`,
    content: `
    <p>Hi!</p>
    <p>Last few hours before the application to the ${progTitle} closes.</p>
    <p>Don’t miss out on the last opportunity to finish your application to stand a chance at winning the challenge.</p>
    <p>Click <a href="https://app.oifa.tech/dashboard" style="font-size:16px;color:#838fa7;line-height:25px;font-weight:500;">here</a> to complete your application.</p>
    <p>We look forward to your submission soon!</p>
    <p>The OIFA Team.</p>
    `,
  });
};
