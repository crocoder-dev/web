import { Client, isFullPage } from "@notionhq/client";

import { nanoid } from "nanoid";
import z from "zod";

const bodyValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z
    .string()
    .min(1, { message: "Required field" })
    .email({ message: "Invalid email adress" }),
  message: z.string().min(1, { message: "Required field" }),
  hasConsent: z.boolean().optional(),
});

type RequestBody = z.infer<typeof bodyValidationSchema>;

const {
  NOTION_TOKEN,
  SLACK_CHANNEL,
  SLACK_BOT_TOKEN,
  MENTION_EMAILS,
  MENTION_IDS,
  NOTION_DATABASE_ID,

  IS_OFFLINE,
} = process.env;

const notion = new Client({ auth: NOTION_TOKEN });

const createPayload = (name: string, email: string, url: string) => ({
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

const notifyContactCreated = async (
  name: string,
  email: string,
  url: string,
) => {
  const payload = createPayload(name, email, url);
  const payloadStringify = JSON.stringify(payload);

  if (IS_OFFLINE) {
    console.log(payload);
  } else {
    try {
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
          statusCode: result.status,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        };
      }
    } catch (error) {
      throw error;
    }
  }
};

const mentionPerson = ({ id, email }: { id: string; email: string }) => [
  {
    mention: {
      user: {
        id,
        person: {
          email,
        },
      },
    },
    plain_text: "",
    href: null,
  },
  {
    text: {
      content: " ",
    },
  },
];

const getMentions = () => {
  try {
    if (
      MENTION_EMAILS &&
      MENTION_IDS &&
      typeof MENTION_EMAILS === "string" &&
      typeof MENTION_IDS === "string"
    ) {
      const emails = MENTION_EMAILS.split(",").filter(Boolean);
      const ids = MENTION_IDS.split(",").filter(Boolean);

      if (emails.length && ids.length) {
        return ids.map((id, i) => ({
          id: id.trim(),
          email: emails[i]?.trim() || "",
        }));
      }
    }
  } catch (error) {
    console.error("Error in getMentions:", error);
  }
  return [];
};

const mentionPeople = () => {
  return getMentions().flatMap(mentionPerson);
};

const createContactObject = (
  id: string,
  email: string,
  name: string,
  content: string,
) => ({
  parent: {
    database_id: NOTION_DATABASE_ID || "",
  },
  properties: {
    id: {
      title: [
        {
          text: {
            content: id,
          },
        },
      ],
    },
    email: {
      email,
    },
    name: {
      rich_text: [
        {
          text: {
            content: name,
          },
        },
      ],
    },
    date: {
      date: {
        start: new Date().toISOString(),
      },
    },
  },
  children: [
    {
      paragraph: {
        rich_text: [
          {
            text: {
              content,
            },
          },
        ],
      },
    },
    {
      paragraph: {
        rich_text: mentionPeople(),
      },
    },
  ],
});

const createContact = async (
  id: string,
  email: string,
  name: string,
  content: string,
) => {
  try {
    const response = await notion.pages.create(
      createContactObject(id, email, name, content),
    );

    if (response.id && isFullPage(response)) {
      return response.url;
    }
    throw {
      body: {
        message: "Failed to create notion page",
      },
    };
  } catch (error) {
    throw error;
  }
};

const processContact = async (event: {
  id: string;
  email: string;
  name: string;
  message: string;
}) => {
  try {
    const { id, email, name, message } = event;

    if (!id || !email || !name || !message) {
      throw {
        body: {
          message: "Missing id, email, name or message",
        },
      };
    }

    const url = await createContact(
      `Message from ${name} (${id})`,
      email,
      name,
      message,
    );
    await notifyContactCreated(name, email, url);
  } catch (error) {
    throw error;
  }
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(request: Request) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (request.headers.get("Content-Type") === "application/json") {
    try {
      const body = (await request.json()) as RequestBody;
      const bodyValidationResult = bodyValidationSchema.safeParse(body);

      if (!body || bodyValidationResult.error) {
        return new Response(
          JSON.stringify({
            message: bodyValidationResult.error?.message || "No body was found",
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
            },
          },
        );
      }

      const { name, email, message, hasConsent } = body;

      if (!hasConsent) {
        return new Response(JSON.stringify({ message: "No consent by user" }), {
          status: 403,
          headers: {
            ...corsHeaders,
          },
        });
      }

      await processContact({
        id: nanoid(),
        email,
        name,
        message,
      });

      return new Response(
        JSON.stringify({
          message: "Success",
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
          },
        },
      );
    } catch (error) {
      console.error("Error - api/contacts", error);

      const statusCode = (error as any).statusCode || 501;
      const message =
        (error as any)?.body?.message || "Issue while processing request";

      return new Response(JSON.stringify({ message }), {
        status: statusCode,
        headers: {
          ...corsHeaders,
        },
      });
    }
  }

  return new Response(null, { status: 400, headers: corsHeaders });
}
