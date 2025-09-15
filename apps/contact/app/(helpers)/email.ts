import { SendEmailCommand, SESv2Client } from "@aws-sdk/client-sesv2";
import { render } from "@react-email/components";
import { createTransport } from "nodemailer";

const {
  EMAIL_FROM,
  AWS_REGION,
  EMAIL_AWS_ACCESS_KEY,
  EMAIL_AWS_SECRET_ACCESS_KEY,
} = process.env;

const sesClient = new SESv2Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: EMAIL_AWS_ACCESS_KEY || "",
    secretAccessKey: EMAIL_AWS_SECRET_ACCESS_KEY || "",
  },
});

const transporter = createTransport({
  SES: { sesClient, SendEmailCommand },
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
