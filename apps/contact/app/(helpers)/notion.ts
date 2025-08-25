import { Client, isFullPage } from "@notionhq/client";
import { notifyContactCreated } from "./slack";

const { NOTION_TOKEN, MENTION_EMAILS, MENTION_IDS } = process.env;

const notion = new Client({ auth: NOTION_TOKEN });

const mentionPerson = ({ id }: { id: string }) => [
  {
    mention: {
      user: {
        id,
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
      return ids.map((id, i) => ({
        id,
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
  databaseID: string,
) => ({
  parent: {
    database_id: databaseID,
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
  databaseID: string,
) => {
  const response = await notion.pages.create(
    createContactObject(id, email, name, content, databaseID),
  );

  if (response.id && isFullPage(response)) {
    return {
      id: response.id,
      url: response.url,
    };
  }
  throw {
    body: {
      message: "Failed to create notion page",
    },
  };
};

export const processContact = async (event: {
  id: string;
  email: string;
  name: string;
  message: string;
  databaseID: string;
}) => {
  const { id, email, name, message, databaseID } = event;

  if (!id || !email || !name || !databaseID) {
    console.log({ event });
    throw {
      body: {
        message: "Missing data in process contact event",
      },
    };
  }

  const { id: notionPageID, url } = await createContact(
    `Message from ${name} (${id})`,
    email,
    name,
    message,
    databaseID,
  );

  await notifyContactCreated(name, email, url);
  return notionPageID;
};
