import base from "./base";

export default ({ progId, progTitle }) => {
  const link = `${process.env.ROOT_URL}/dashboard/i/program-overview/${progId}`;
  // ...
  return base({
    title: "Welcome to Open Innovation For Africa",
    content: `
    <p>Hello</p>
    <p>OIFA aims to address African challenges through innovation, by connecting innovation talent like you with large corporates.</p>
    <p>If you are looking to solve real business challenges, access new markets and scale your solution, we have new programs on our platform that might be the opportunity for you!</p>
    <p>Here are some of our latest challenges that may interest you <a href="${link}" style="font-size:16px;color:#838fa7;line-height:25px;font-weight:500;">${progTitle}</a></p>
    <p>You can find more opportunities by visiting our <a href="https://oifa.tech" style="font-size:16px;color:#838fa7;line-height:25px;font-weight:500;">website</a></p>
    <p>The OIFA Team.</p>
    `,
  });
};
