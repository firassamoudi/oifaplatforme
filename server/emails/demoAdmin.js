import base from "./base";

export default ({ data }) => {
  const name = `${data?.firstName} ${data?.lastName}`;
  return base({
    title: `${name || ""} requested a demo.`,
    content: `
    <p style="color:black">Email:</p>
    <p>${data?.email || ""}</p>
    <p style="color:black">Job title:</p>
    <p>${data?.jobTitle || ""}</p>
    <p style="color:black">Company:</p>
    <p>${data?.company || ""}</p>
    <p style="color:black">Company size:</p>
    <p>${data?.size || ""}</p>
    <p style="color:black">Country:</p>
    <p>${data?.country || ""}</p>
    <p style="color:black">Comment/Question:</p>
    <p>${data?.comment || ""}</p>
    `,
  });
};
