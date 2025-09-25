import { Client, isFullPage } from "@notionhq/client";

const { NOTION_TOKEN, MENTION_EMAILS, MENTION_IDS } = process.env;

export const notion = new Client({ auth: NOTION_TOKEN });

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

export const createContactObject = (
  id: string,
  email: string,
  name: string,
  content: string,
  databaseID: string,
  source: string,
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
    source: {
      rich_text: [
        {
          text: {
            content: source,
          },
        },
      ],
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

export const createContact = async (
  id: string,
  email: string,
  name: string,
  content: string,
  databaseID: string,
  source: string,
) => {
  if (!id || !email || !name || !databaseID) {
    console.log(id, email, name, databaseID);
    throw {
      body: {
        message: "Missing data in process contact event",
      },
    };
  }

  const response = await notion.pages.create(
    createContactObject(id, email, name, content, databaseID, source),
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
