import { describe, it, expect, beforeEach, mock } from "bun:test";
import { POST, OPTIONS } from "../app/api/contact/route";

const mockCreateContact = mock(() =>
  Promise.resolve({
    object: "page",
    id: "mock-notion-id",
    url: "https://www.notion.so/mocknotionid",
  }),
);

const mockNotifyContactCreated = mock(() => Promise.resolve({}));
const mockNotifyContactError = mock(() => Promise.resolve({}));
const mockNanoid = mock(() => "mock-id-12345");

mock.module("@/helpers/notion", () => ({
  createContact: mockCreateContact,
}));

mock.module("@/helpers/slack", () => ({
  notifyContactCreated: mockNotifyContactCreated,
  notifyContactError: mockNotifyContactError,
}));

mock.module("nanoid", () => ({
  nanoid: mockNanoid,
}));

const originalEnv = process.env;
beforeEach(() => {
  process.env = {
    ...originalEnv,
    NOTION_DATABASE_ID: "mock-database-id",
  };
  mockCreateContact.mockClear();
  mockNotifyContactCreated.mockClear();
  mockNotifyContactError.mockClear();
  mockNanoid.mockClear();
});

describe("Contact API Route", () => {
  describe("OPTIONS", () => {
    it("should return CORS headers", async () => {
      const response = await OPTIONS();

      expect(response.status).toBe(200);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
        "http://localhost:4321",
      );
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
        "OPTIONS, POST",
      );
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type",
      );
    });
  });

  describe("POST", () => {
    const createMockRequest = (
      body: any,
      contentType = "application/json",
      url = "http://localhost/api/contact",
    ) => {
      const request = new Request(url, {
        method: "POST",
        headers: {
          "Content-Type": contentType,
        },
        body: contentType === "application/json" ? JSON.stringify(body) : body,
      });

      return request as any;
    };

    it("should return 200 for valid request with consent", async () => {
      const validBody = {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello there",
        hasConsent: true,
      };

      const request = createMockRequest(validBody);
      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(mockCreateContact).toHaveBeenCalledTimes(1);
      expect(mockNotifyContactCreated).toHaveBeenCalledTimes(1);
      expect(mockNotifyContactError).toHaveBeenCalledTimes(0);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
        "http://localhost:4321",
      );
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
        "POST, OPTIONS",
      );
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type",
      );
    });

    it("should return 400 for invalid email", async () => {
      const invalidBody = {
        name: "John Doe",
        email: "invalid-email",
        message: "Hello there",
        hasConsent: true,
      };

      const request = createMockRequest(invalidBody);
      const response = await POST(request);

      expect(response.status).toBe(400);
      expect(mockCreateContact).toHaveBeenCalledTimes(0);
      expect(mockNotifyContactCreated).toHaveBeenCalledTimes(0);
      expect(mockNotifyContactError).toHaveBeenCalledTimes(0);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
        "http://localhost:4321",
      );
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
        "POST, OPTIONS",
      );
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type",
      );
    });

    it("should return 400 for missing required fields", async () => {
      const invalidBody = {
        name: "John Doe",
        email: "john@example.com",
        message: "",
        hasConsent: true,
      };

      const request = createMockRequest(invalidBody);
      const response = await POST(request);

      expect(response.status).toBe(400);
      expect(mockCreateContact).toHaveBeenCalledTimes(0);
      expect(mockNotifyContactCreated).toHaveBeenCalledTimes(0);
      expect(mockNotifyContactError).toHaveBeenCalledTimes(0);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
        "http://localhost:4321",
      );
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
        "POST, OPTIONS",
      );
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type",
      );
    });

    it("should return 403 for no consent", async () => {
      const bodyWithoutConsent = {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello there",
        hasConsent: false,
      };

      const request = createMockRequest(bodyWithoutConsent);
      const response = await POST(request);

      expect(response.status).toBe(403);
      expect(mockCreateContact).toHaveBeenCalledTimes(0);
      expect(mockNotifyContactCreated).toHaveBeenCalledTimes(0);
      expect(mockNotifyContactError).toHaveBeenCalledTimes(0);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
        "http://localhost:4321",
      );
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
        "POST, OPTIONS",
      );
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type",
      );
    });

    it("should return 500 if Notion page creation failed", async () => {
      mockCreateContact.mockImplementationOnce(() =>
        Promise.resolve({
          object: "page",
          id: "",
          url: "",
          error: "Error message",
        }),
      );

      const validBody = {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello there",
        hasConsent: true,
      };

      const request = createMockRequest(validBody);
      const response = await POST(request);

      expect(response.status).toBe(500);
      expect(mockCreateContact).toHaveBeenCalledTimes(1);
      expect(mockNotifyContactCreated).toHaveBeenCalledTimes(0);
      expect(mockNotifyContactError).toHaveBeenCalledTimes(1);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
        "http://localhost:4321",
      );
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
        "POST, OPTIONS",
      );
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type",
      );
    });

    it("should return 415 for non-JSON content type", async () => {
      const request = createMockRequest("plain text", "text/plain");
      const response = await POST(request);

      expect(response.status).toBe(415);
      expect(mockCreateContact).toHaveBeenCalledTimes(0);
      expect(mockNotifyContactCreated).toHaveBeenCalledTimes(0);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
        "http://localhost:4321",
      );
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
        "POST, OPTIONS",
      );
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type",
      );
    });
  });
});
