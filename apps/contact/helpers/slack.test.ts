import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { createPayload, notifyContactCreated } from "./slack";

const originalEnv = { ...process.env };
const originalFetch = globalThis.fetch;
let fetchCalls: string[] = [];

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

  globalThis.fetch = (async (url: string) => {
    fetchCalls.push(url);
    return { status: 200, json: async () => mockSlackResponse } as Response;
  }) as typeof fetch;
});

afterEach(() => {
  process.env = { ...originalEnv };
  globalThis.fetch = originalFetch;
});

describe("Slack Helper", () => {
  describe("createPayload", () => {
    it("should create correct Slack payload structure", () => {
      const payload = createPayload(
        "John Doe",
        "john@example.com",
        "https://notion.so/test",
      );

      expect(payload).toHaveProperty("channel");
      expect(payload).toHaveProperty("blocks");
      expect(payload.blocks).toHaveLength(4);

      // Checks that it is type header and contains text
      expect(payload.blocks[0]).toHaveProperty("type", "header");
      expect(payload.blocks[0]).toHaveProperty("text");
      expect(payload.blocks[0].text?.text.length).toBeGreaterThan(0);

      // Checks that it is type section and the text conatins name and email
      expect(payload.blocks[1]).toHaveProperty("type", "section");
      expect(payload.blocks[1]).toHaveProperty("text");
      expect(payload.blocks[1].text?.text).toContain("John Doe");
      expect(payload.blocks[1].text?.text).toContain("john@example.com");

      // Checks that it is type section and the accessory conatins the url
      expect(payload.blocks[3]).toHaveProperty("type", "section");
      expect(payload.blocks[3]).toHaveProperty("accessory");
      expect(payload.blocks[3].accessory?.url).toBe("https://notion.so/test");
    });
  });

  describe("notifyContactCreated", async () => {
    it("should send message on slack", async () => {
      await notifyContactCreated(
        "John Doe",
        "john@example.com",
        "https://notion.so/test",
      );

      expect(fetchCalls.length).toBe(1);
      expect(fetchCalls[0]).toBe("https://slack.com/api/chat.postMessage");
    });
  });
});
