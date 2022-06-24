import base from "./base";

export default ({ progId, progTitle, seekerName }) => {
  const link = `${process.env.ROOT_URL}/dashboard/i/program-overview/${progId}`;
  // ...
  return base({
    title: `Congratulations! Your application to ${progTitle} has been selected.`,
    content: `
    <p>Hello</p>
    <p>${seekerName} will connect with you shortly to start working on your collaboration!</p>
    <p>Click <a href="${link}" style="font-size:16px;color:#838fa7;line-height:25px;font-weight:500;">here</a> to see the next steps of the program.</p>
    <p>In the meantime, we invite you to check out our article on how to create successful collaborations with large corporates. </p>
    <p>The OIFA Team.</p>
    `,
  });
};
