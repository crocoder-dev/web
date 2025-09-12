import {
  notifyContactCreated,
  createPayload,
} from "../../apps/contact/app/(helpers)/slack";

const mockData = {
  name: "Test name",
  email: "test@test.com",
  url: "https://www.test.dev/",
};

const mockBlocks = [
  {
    type: "header",
    text: {
      type: "plain_text",
      text: "We have 1 new message(s).",
      emoji: true,
    },
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `We got a new message from _Test name_ (_test@test.com_).`,
    },
  },
  {
    type: "divider",
  },
  {
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
      url: "https://www.test.dev/",
      action_id: "button-action",
    },
  },
];

describe("Slack functions", () => {
  it("should create expected payload", async () => {
    const payload = createPayload(mockData.name, mockData.email, mockData.url);

    expect(payload.blocks).toEqual(mockBlocks);
  });

  it("should call notifyContactCreated once if conditions are met", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
    });

    await notifyContactCreated(mockData.name, mockData.email, mockData.url);
    const [[url, options]] = (global.fetch as jest.Mock).mock.calls;
    const data = JSON.parse(options.body);
    const blocks = JSON.stringify(data.blocks);

    expect(url).toBe("https://slack.com/api/chat.postMessage");
    expect(blocks).toMatch(JSON.stringify(mockBlocks));
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should throw error if fetch fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 401,
    });

    await expect(
      notifyContactCreated(mockData.name, mockData.email, mockData.url),
    ).rejects.toEqual({
      body: "Could not send notification message to Slack",
      statusCode: 401,
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
