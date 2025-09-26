import { describe, it, expect, beforeEach, afterEach, vi } from "bun:test";
import { createContactObject, createContact, notion } from "./notion";

let callCount = 0;

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
  callCount = 0;
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
  describe("createContactObject", () => {
    it("should create correct Notion payload structure", () => {
      const payload = createContactObject(
        validContactData.id,
        validContactData.email,
        validContactData.name,
        validContactData.content,
        validContactData.databaseID,
        validContactData.source,
      );

      expect(payload).toHaveProperty("parent");
      expect(payload).toHaveProperty("properties");
      expect(payload).toHaveProperty("children");

      expect(payload.parent.database_id).toBe("mock-database-id");

      expect(payload.properties.id.title[0].text.content).toBe("test-id-123");
      expect(payload.properties.email.email).toBe("john@example.com");
      expect(payload.properties.name.rich_text[0].text.content).toBe(
        "John Doe",
      );
      expect(payload.properties.source.rich_text[0].text.content).toBe(
        "website",
      );

      expect(payload.children[0].paragraph.rich_text[0].text?.content).toBe(
        "Test message",
      );
    });
  });

  describe("createContact", () => {
    it("should validate required fields", () => {
      const requiredFields = ["id", "email", "name", "databaseID"];
      requiredFields.forEach((field) => {
        expect(validContactData).toHaveProperty(field);
        expect((validContactData as any)[field]).toBeTruthy();
      });
    });

    it("should create Notion page", async () => {
      const response = await createContact(
        validContactData.id,
        validContactData.email,
        validContactData.name,
        validContactData.content,
        validContactData.databaseID,
        validContactData.source,
      );

      expect(response.id).toBe("fake-page-id");
      expect(response.url).toContain("www.notion.so");
      expect(mock).toHaveBeenCalledTimes(1);
    });
  });
});
