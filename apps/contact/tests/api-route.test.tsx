import { describe, it, expect, beforeEach, mock } from "bun:test";
import { POST, OPTIONS } from "../app/api/contact/route";

const mockCreateContact = mock(() =>
  Promise.resolve({
    object: "page",
    id: "mock-notion-id",
    url: "https://www.notion.so/fakepageid",
  }),
);
const mockNotifyContactCreated = mock(() => Promise.resolve({}));
const mockNanoid = mock(() => "mock-id-12345");

mock.module("@/helpers/notion", () => ({
  createContact: mockCreateContact,
}));

mock.module("@/helpers/slack", () => ({
  notifyContactCreated: mockNotifyContactCreated,
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
  mockNanoid.mockClear();
});

describe("Contact API Route", () => {
  describe("OPTIONS", () => {
    it("should return CORS headers", async () => {
      const response = await OPTIONS();

      expect(response.status).toBe(200);
      // Should * be alowed or should there be some restrictions
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

      (request as any).nextUrl = {
        searchParams: new URLSearchParams(new URL(url).search),
      };

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
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(mockCreateContact).toHaveBeenCalledTimes(1);
      expect(mockNotifyContactCreated).toHaveBeenCalledTimes(1);
    });
    // Add new test that checks the contetnt type

    it("should return 400 for invalid email", async () => {
      const invalidBody = {
        name: "John Doe",
        email: "invalid-email",
        message: "Hello there",
        hasConsent: true,
      };

      const request = createMockRequest(invalidBody);
      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(mockCreateContact).toHaveBeenCalledTimes(0);
      expect(mockNotifyContactCreated).toHaveBeenCalledTimes(0);
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
      const responseData = await response.json();

      expect(response.status).toBe(403);
      expect(mockCreateContact).toHaveBeenCalledTimes(0);
      expect(mockNotifyContactCreated).toHaveBeenCalledTimes(0);
    });

    it("should return 415 for non-JSON content type", async () => {
      const request = createMockRequest("plain text", "text/plain");
      const response = await POST(request);

      expect(response.status).toBe(415);
    });

    it("should include CORS headers in all responses", async () => {
      const validBody = {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello there",
        hasConsent: true,
      };

      const request = createMockRequest(validBody);
      const response = await POST(request);

      // Should * be alowed or should there be some restrictions
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
        "http://localhost:4321",
      );
      expect(response.headers.get("Access-Control-Allow-Credentials")).toBe(
        "false",
      );
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
        "POST, OPTIONS",
      );
    });
    // Check if there is need for tetsing the headers for all casses
    // If so should there be individual tests?
    // Check Allow headers to only have content-type
  });
});
