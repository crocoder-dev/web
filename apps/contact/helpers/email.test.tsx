import { expect, describe, it, mock, beforeEach, afterEach } from "bun:test";

const mockSendMail = mock(() => {
  console.log("SENDING");
  return Promise.resolve({});
});

mock.module("@aws-sdk/client-sesv2", () => {
  class MockSESv2Client {
    send = mockSendMail;
  }

  class MockSendEmailCommand {
    constructor(args: any) {
      return args;
    }
  }

  return {
    SESv2Client: MockSESv2Client,
    SendEmailCommand: MockSendEmailCommand,
  };
});

const originalEnv = process.env;
beforeEach(() => {
  process.env = {
    ...originalEnv,
    AWS_REGION: "us-east-1",
    EMAIL_AWS_ACCESS_KEY: "mock-aws-access-key",
    EMAIL_AWS_SECRET_ACCESS_KEY: "mock-aws-secret-access-key",
  };
});

afterEach(() => {
  process.env = originalEnv;
  mockSendMail.mockReset();
});

const { sendEmail } = await import("./email");

describe("Email Helper", () => {
  const MockEmailTemplate = () => <>Hello</>;
  const options = {
    from: "from@example.com",
    to: "to@example.com",
    subject: "Test",
  };
  describe("sendEmail", () => {
    it("should send email with correct arguments", async () => {
      await sendEmail({
        template: <MockEmailTemplate />,
        options: options,
      });

      expect(mockSendMail).toHaveBeenCalledTimes(1);
    });
  });
});
