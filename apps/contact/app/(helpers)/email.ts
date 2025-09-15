import { render } from "@react-email/components";
import { createTransport } from "nodemailer";

const { EMAIL_HOST, EMAIL_FROM, EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

const transporter = createTransport({
  host: EMAIL_HOST,
  port: 587,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

export const sendEmail = async ({
  template,
  options: { from, to, subject },
}: {
  template: React.ReactNode;
  options: {
    from?: string;
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
