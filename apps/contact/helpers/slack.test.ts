import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { notifyContactCreated, notifyContactError } from "./slack";

const originalEnv = { ...process.env };
const originalFetch = globalThis.fetch;
let fetchCalls: {
  url: string;
  init: RequestInit;
}[] = [];

const mockSlackResponse = {
  ok: true,
  channel: "#test-channel",
  message: {
    text: "Test",
    type: "message",
  },
};

beforeEach(() => {
  process.env = {
    ...originalEnv,
    SLACK_CHANNEL: "#test-channel",
    SLACK_BOT_TOKEN: "xoxb-test-token",
  };

  fetchCalls = [];

  globalThis.fetch = (async (url: string, init: RequestInit) => {
    fetchCalls.push({ url, init });
    return { status: 200, json: async () => mockSlackResponse } as Response;
  }) as typeof fetch;
});

afterEach(() => {
  process.env = { ...originalEnv };
  globalThis.fetch = originalFetch;
});

describe("Slack Helper", () => {
  const validContactData = {
    name: "John Doe",
    email: "john@example.com",
    url: "https://notion.so/test",
  };
  const userMessage = "Test message";
  describe("notifyContactCreated", async () => {
    it("should send message on slack", async () => {
      await notifyContactCreated(
        validContactData.name,
        validContactData.email,
        validContactData.url,
      );

      expect(fetchCalls.length).toBe(1);
      expect(fetchCalls[0].url).toBe("https://slack.com/api/chat.postMessage");
      expect(fetchCalls[0].init.body).toContain(validContactData.name);
      expect(fetchCalls[0].init.body).toContain(validContactData.email);
      expect(fetchCalls[0].init.body).toContain(validContactData.url);
      expect(fetchCalls[0].init.body).not.toContain(userMessage);
    });
  });

  describe("notifyContactError", async () => {
    it("should send error message on slack", async () => {
      await notifyContactError(
        validContactData.name,
        validContactData.email,
        userMessage,
      );

      expect(fetchCalls.length).toBe(1);
      expect(fetchCalls[0].url).toBe("https://slack.com/api/chat.postMessage");
      expect(fetchCalls[0].init.body).toContain(validContactData.name);
      expect(fetchCalls[0].init.body).toContain(validContactData.email);
      expect(fetchCalls[0].init.body).not.toContain(validContactData.url);
      expect(fetchCalls[0].init.body).toContain(userMessage);
    });
  });
});
