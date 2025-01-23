import { Client, isFullPage } from "@notionhq/client";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";
import z from "zod";
import type { VercelRequest, VercelResponse } from "@vercel/node";

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

const {
  NOTION_TOKEN,
  SLACK_CHANNEL,
  SLACK_BOT_TOKEN,
  MENTION_EMAILS,
  MENTION_IDS,
  NOTION_DATABASE_ID,
  UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN,
  IS_OFFLINE,
} = process.env;

const notion = new Client({ auth: NOTION_TOKEN });

const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL,
  token: UPSTASH_REDIS_REST_TOKEN,
});

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
          headers: [
            { name: "Access-Control-Allow-Origin", value: "*" },
            { name: "Access-Control-Allow-Credentials", value: "true" },
          ],
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
  if (MENTION_EMAILS && MENTION_IDS) {
    const emails = MENTION_EMAILS.split(",");
    const ids = MENTION_IDS.split(",");

    if (emails.length && ids.length) {
      return ids.map((id: any, i: number) => ({
        id,
        email: emails[i],
      }));
    }
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

const allowRequest = async (request: VercelRequest & { ip?: string }) => {
  try {
    const ip = request.ip ?? "127.0.0.1";

    const ratelimit = new Ratelimit({
      limiter: Ratelimit.fixedWindow(1, "30 s"),
      /** Use fromEnv() to automatically load connection secrets from your environment
       * variables. For instance when using the Vercel integration.
       *
       * This tries to load `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from
       * your environment using `import.meta.env`.
       */
      redis,
    });

    const response = await ratelimit.limit(ip);
    return response;
  } catch (error) {
    throw {
      body: {
        message: error,
      },
    };
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (or specify your frontend domain)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  try {
    const body = req.body;
    const bodyValidationResult = bodyValidationSchema.safeParse(body);

    if (!body || bodyValidationResult.error) {
      throw {
        statusCode: 400,
        headers: [
          { name: "Access-Control-Allow-Origin", value: "*" },
          { name: "Access-Control-Allow-Credentials", value: "true" },
        ],
        body: {
          message: bodyValidationResult.error?.message || "No body was found",
        },
      };
    }

    const { name, email, message, hasConsent } = body;

    if (!hasConsent) {
      throw {
        statusCode: 403,
        body: {
          message: "No consent by user",
        },
      };
    }

    const { success, limit, reset, remaining } = await allowRequest(req);

    if (!success) {
      throw {
        statusCode: 429,
        body: {
          message: "Too many requests. Please try again in a minute",
        },
      };
    }

    try {
      await processContact({
        id: nanoid(),
        email,
        name,
        message,
      });
    } catch (error) {
      throw error;
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("X-RateLimit-Limit", limit.toString());
    res.setHeader("X-RateLimit-Remaining", remaining.toString());
    res.setHeader("X-RateLimit-Reset", reset.toString());

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    const customError = error as Error & {
      statusCode?: number;
      body?: {
        message?: string;
      };
      headers?: Array<{ name: string; value: string }>;
    };

    console.error("Error - api/contacts", customError);

    if (customError && customError.headers) {
      customError.headers.forEach((header) => {
        res.setHeader(header.name, header.value);
      });
    }

    return res.status(customError.statusCode || 501).json({
      message: customError?.body?.message || "Issue while processing request",
    });
  }
}
