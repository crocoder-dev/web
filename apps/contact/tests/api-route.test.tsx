import { describe, it, expect, beforeEach, mock } from "bun:test";
import { POST, OPTIONS } from "../app/api/contact/route";

const mockProcessContact = mock(() => Promise.resolve("mock-notion-id"));
const mockNanoid = mock(() => "mock-id-12345");

mock.module("@/helpers/notion", () => ({
  processContact: mockProcessContact,
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
  mockProcessContact.mockClear();
  mockNanoid.mockClear();
});

describe("Contact API Route", () => {
  describe("OPTIONS", () => {
    it("should return CORS headers", async () => {
      const response = await OPTIONS();

      expect(response.status).toBe(200);
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
        "OPTIONS, POST",
      );
      expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
        "Content-Type, Authorization",
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
      expect(responseData.message).toBe("Success");
      expect(mockProcessContact).toHaveBeenCalledTimes(1);
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
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData.message).toContain("Invalid email");
    });

    /** Should this be the case? **/
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
      expect(responseData.message).toBe("No consent by user");
    });

    it("should return 400 for non-JSON content type", async () => {
      const request = createMockRequest("plain text", "text/plain");
      const response = await POST(request);

      expect(response.status).toBe(400);
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

      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
      expect(response.headers.get("Access-Control-Allow-Credentials")).toBe(
        "true",
      );
      expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
        "POST, OPTIONS",
      );
    });

    it("should handle source parameter from URL", async () => {
      const validBody = {
        name: "John Doe",
        email: "john@example.com",
        message: "Hello there",
        hasConsent: true,
      };

      const request = createMockRequest(
        validBody,
        "application/json",
        "http://localhost/api/contact?source=website",
      );

      const response = await POST(request);

      expect(response.status).toBe(200);
      expect(mockProcessContact).toHaveBeenCalledWith(
        expect.objectContaining({
          source: "website",
        }),
      );
    });
  });
});
