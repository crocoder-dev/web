import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { createPayload } from "./slack";

const originalEnv = process.env;
beforeEach(() => {
  process.env = {
    ...originalEnv,
    SLACK_CHANNEL: "#test-channel",
    SLACK_BOT_TOKEN: "xoxb-test-token",
  };
});

afterEach(() => {
  process.env = originalEnv;
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

      expect(payload.blocks[0]).toEqual({
        type: "header",
        text: {
          type: "plain_text",
          text: "We have 1 new message(s).",
          emoji: true,
        },
      });

      expect(payload.blocks[1]).toEqual({
        type: "section",
        text: {
          type: "mrkdwn",
          text: "We got a new message from _John Doe_ (_john@example.com_).",
        },
      });

      expect(payload.blocks[3]).toEqual({
        type: "section",
        text: {
          type: "mrkdwn",
          text: " ",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Show me the message",
            emoji: true,
          },
          value: "new_message_click",
          url: "https://notion.so/test",
          action_id: "button-action",
        },
      });
    });

    it("should handle different user names and emails", () => {
      const payload = createPayload(
        "Jane Smith",
        "jane@test.com",
        "https://notion.so/page123",
      );

      expect(payload.blocks[1]?.text?.text).toContain("Jane Smith");
      expect(payload.blocks[1]?.text?.text).toContain("jane@test.com");
      expect(payload.blocks[3]?.accessory?.url).toBe(
        "https://notion.so/page123",
      );
    });
  });
});
