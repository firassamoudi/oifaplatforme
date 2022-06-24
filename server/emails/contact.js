import base from "./base";

export default ({ data }) => {
  return base({
    title: `Dear ${data?.firstName || ""}`,
    content: `
    <p>Thanks for reaching out!</p>
    <p>We appreciate you for contacting us. One of our colleagues will get back in touch with you soon.</p>
    <p>Have a great day!</p>
    <p></p>
    <p>The OIFA Team.</p>
    `,
  });
};
