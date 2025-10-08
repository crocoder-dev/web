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

const createContactObject = (
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
): Promise<{ url: string } | { error: string }> => {
  if (!id || !email || !name || !databaseID) {
    return {
      error: "Missing data in process contact event",
    };
  }

  try {
    const response = await notion.pages.create(
      createContactObject(id, email, name, content, databaseID, source),
    );

    // isFullPage checks if the response is type PageObjectResponse => contains url
    if (response.id && isFullPage(response)) {
      return {
        url: response.url,
      };
    }
    if (response.id && !isFullPage(response)) {
      // Notion allows navigation to the created page using only the id without '-'
      // https://dev.to/adamcoster/change-a-url-without-breaking-existing-links-4m0d
      const cleanId = response.id.replace(/-/g, "");
      const pageUrl = `https://www.notion.so/${cleanId}`;
      return {
        url: pageUrl,
      };
    }
    console.error("Notion hepler => Failed to create notion page");
    return {
      error: "Failed to create notion page",
    };
  } catch (error) {
    console.error("Notion hepler", error);
    return {
      error: "Failed to create notion page",
    };
  }
};
