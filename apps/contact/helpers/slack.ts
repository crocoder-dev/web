const { SLACK_CHANNEL, SLACK_BOT_TOKEN, IS_OFFLINE } = process.env;

export const createPayload = (name: string, email: string, url: string) => ({
  channel: SLACK_CHANNEL,
  blocks: [
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
        text: `We got a new message from _${name}_ (_${email}_).`,
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
        url,
        action_id: "button-action",
      },
    },
  ],
});

export const createErrorPayload = (
  name: string,
  email: string,
  content: string,
) => ({
  channel: SLACK_CHANNEL,
  blocks: [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: "An error ocured while creating a contact",
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `There was an error trying to create a contact for _${name}_ (_${email}_).`,
      },
    },
    {
      type: "section",
      text: content,
    },
  ],
});

export const notifyContactCreated = async (
  name: string,
  email: string,
  url: string,
) => {
  const payload = createPayload(name, email, url);
  const payloadStringify = JSON.stringify(payload);

  if (IS_OFFLINE) {
    console.log(payload);
  } else {
    const result = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      body: payloadStringify,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": payloadStringify.length.toString(),
        Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
        Accept: "application/json",
      },
    });
    if (result.status !== 200) {
      throw {
        body: "Could not send notification message to Slack",
        statusCode: result.status,
      };
    }
  }
};

export const notifyContactError = async (
  name: string,
  email: string,
  content: string,
) => {
  const payload = createErrorPayload(name, email, content);
  const payloadStringify = JSON.stringify(payload);

  if (IS_OFFLINE) {
    console.log(payload);
  } else {
    const result = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      body: payloadStringify,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": payloadStringify.length.toString(),
        Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
        Accept: "application/json",
      },
    });
    if (result.status !== 200) {
      throw {
        body: "Could not send notification message to Slack",
        statusCode: result.status,
      };
    }
  }
};
