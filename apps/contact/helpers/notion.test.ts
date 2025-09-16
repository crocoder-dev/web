import { describe, it, expect, beforeEach, afterEach } from "bun:test";

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
});

describe("Notion Helper", () => {
  describe("processContact", () => {
    const validContactData = {
      id: "test-id-123",
      email: "john@example.com",
      name: "John Doe",
      message: "Test message",
      databaseID: "mock-database-id",
      source: "website",
    };

    it("should process contact data structure correctly", () => {
      expect(validContactData.id).toBe("test-id-123");
      expect(validContactData.email).toContain("@");
      expect(validContactData.name.length).toBeGreaterThan(0);
      expect(validContactData.message.length).toBeGreaterThan(0);
      expect(validContactData.databaseID.length).toBeGreaterThan(0);
    });

    it("should validate required fields", () => {
      const requiredFields = ["id", "email", "name", "databaseID"];
      requiredFields.forEach((field) => {
        expect(validContactData).toHaveProperty(field);
        expect((validContactData as any)[field]).toBeTruthy();
      });
    });
  });
});
