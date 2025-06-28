import transporter from "./nodemailerClient";

export const sendMail = async (
  email: string,
  subject: string,
  text: string,
) => {
  const info = await transporter.sendMail({
    to: email,
    subject,
    text,
    html: `<b>${text}</b>`,
  });
  console.log(text);

  return info;
};
