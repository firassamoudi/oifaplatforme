import base from "./base";

export default ({ data }) => {
  const name = `${data?.firstName} ${data?.lastName}`;
  return base({
    title: `${name || ""} has contacted you.`,
    content: `
    <p style="color:black">Email:</p>
    <p>${data?.email || ""}</p>
    <p style="color:black">Company:</p>
    <p>${data?.company || ""}</p>
    <p style="color:black">Phone number:</p>
    <p>${data?.phoneNumber || ""}</p>
    <p style="color:black">Comment/Question:</p>
    <p>${data?.comment || ""}</p>
    `,
  });
};
