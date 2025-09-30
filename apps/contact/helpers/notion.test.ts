import { describe, it, expect, beforeEach, afterEach, vi } from "bun:test";
import { createContact, notion } from "./notion";

const mock = vi.spyOn(notion.pages, "create").mockResolvedValue({
  object: "page",
  id: "fake-page-id",
  url: "https://www.notion.so/fakepageid",
});

const originalEnv = process.env;
beforeEach(() => {
  process.env = {
    ...originalEnv,
    NOTION_TOKEN: "mock-notion-token",
    MENTION_EMAILS: "user1@example.com,user2@example.com",
    MENTION_IDS: "user-id-1,user-id-2",
  };
});

afterEach(() => {
  process.env = originalEnv;
  vi.clearAllMocks();
});

describe("Notion Helper", () => {
  const validContactData = {
    id: "test-id-123",
    email: "john@example.com",
    name: "John Doe",
    content: "Test message",
    databaseID: "mock-database-id",
    source: "website",
  };
  describe("createContact", () => {
    it("should validate required fields", () => {
      const requiredFields = ["id", "email", "name", "databaseID"];
      requiredFields.forEach((field) => {
        expect(validContactData).toHaveProperty(field);
        expect((validContactData as any)[field]).toBeTruthy();
      });
    });

    it("should create Notion page and return valid url", async () => {
      const response = await createContact(
        validContactData.id,
        validContactData.email,
        validContactData.name,
        validContactData.content,
        validContactData.databaseID,
        validContactData.source,
      );

      expect(mock).toHaveBeenCalledTimes(1);
      expect(mock).toHaveBeenCalledWith(
        expect.objectContaining({
          parent: {
            database_id: "mock-database-id",
          },
        }),
      );
      expect(mock).toHaveBeenCalledWith(
        expect.objectContaining({
          properties: expect.objectContaining({
            email: {
              email: "john@example.com",
            },
          }),
        }),
      );
      expect(mock).toHaveBeenCalledWith(
        expect.objectContaining({
          properties: expect.objectContaining({
            name: {
              rich_text: [
                {
                  text: {
                    content: "John Doe",
                  },
                },
              ],
            },
          }),
        }),
      );
      expect(mock).toHaveBeenCalledWith(
        expect.objectContaining({
          properties: expect.objectContaining({
            source: {
              rich_text: [
                {
                  text: {
                    content: "website",
                  },
                },
              ],
            },
          }),
        }),
      );
      expect(mock).toHaveBeenCalledWith(
        expect.objectContaining({
          children: expect.arrayContaining([
            expect.objectContaining({
              paragraph: {
                rich_text: [
                  {
                    text: {
                      content: "Test message",
                    },
                  },
                ],
              },
            }),
          ]),
        }),
      );
      expect(response).toHaveProperty(
        "url",
        "https://www.notion.so/fakepageid",
      );
      expect(response).not.toHaveProperty("error");
    });

    it("should return error message if data is missing", async () => {
      const response = await createContact("", "", "", "", "", "");

      expect(mock).toHaveBeenCalledTimes(0);
      expect(response).not.toHaveProperty("url");
      expect(response).toHaveProperty("error");
    });

    it("should return error message if page was not created", async () => {
      const mock = vi.spyOn(notion.pages, "create").mockResolvedValueOnce({
        object: "page",
        id: "",
        url: "",
      });
      const response = await createContact(
        validContactData.id,
        validContactData.email,
        validContactData.name,
        validContactData.content,
        validContactData.databaseID,
        validContactData.source,
      );

      expect(mock).toHaveBeenCalledTimes(1);
      expect(response).not.toHaveProperty("url");
      expect(response).toHaveProperty("error");
    });
  });
});
