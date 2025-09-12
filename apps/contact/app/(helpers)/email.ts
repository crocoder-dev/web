import { render } from "@react-email/components";
import { createTransport } from "nodemailer";

const { EMAIL_SERVER, EMAIL_FROM } = process.env;

const transporter = createTransport(EMAIL_SERVER);

export const sendEmail = async ({
  template,
  options: { from, to, subject },
}: {
  template: React.ReactNode;
  options: {
    from: string;
    to: string;
    subject: string;
  };
}) => {
  const emailHtml = await render(template);

  await transporter.sendMail({
    from: from || EMAIL_FROM,
    to,
    subject,
    html: emailHtml,
  });
};
