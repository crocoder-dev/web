/**
 * @jest-environment jsdom
 */

const mockNotion = jest.fn();
jest.mock("@notionhq/client", () => {
  const actual = jest.requireActual("@notionhq/client");

  return {
    ...actual,
    Client: jest.fn().mockImplementation(() => ({
      pages: {
        create: mockNotion,
      },
    })),
    isFullPage: jest.fn(() => true),
  };
});

jest.mock("../../apps/contact/app/(helpers)/slack", () => {
  return {
    notifyContactCreated: jest.fn(),
  };
});

process.env.NOTION_DATABASE_ID = "mocked-notion-database-id";

import { NextRequest } from "next/server";
import { POST } from "../../apps/contact/app/api/contact/route";
import { notifyContactCreated } from "../../apps/contact/app/(helpers)/slack";

const mockSlack = notifyContactCreated as jest.Mock;

const mockBody = {
  name: "Test",
  email: "test@example.com",
  message: "This is a test",
  hasConsent: true,
};

const mockInvalidBody = {
  name: "",
  email: "test@example.com",
  message: "",
  hasConsent: true,
};

const mockNoConsent = {
  name: "Test No Consent",
  email: "testNoConsent@example.com",
  message: "This is a no consent test",
  hasConsent: false,
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    mockNotion.mockResolvedValue({ id: "fake-page-id" });
    mockSlack.mockResolvedValue({ message: "success" });
    const { isFullPage } = require("@notionhq/client");
    isFullPage.mockImplementation(() => true);
  });
  afterAll(() => {
    delete process.env.NOTION_DATABASE_ID;
  });

  it("should call Notion, Slack and return 200 response on success", async () => {
    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify(mockBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(mockNotion).toHaveBeenCalledTimes(1);
    expect(mockSlack).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(data).toEqual({ message: "Success" });
  });

  it("shouldn't call Notion or Slack and return 400 response when incorect header Content-Type is set", async () => {
    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify(mockBody),
      headers: {
        "Content-Type": "",
      },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(mockNotion).toHaveBeenCalledTimes(0);
    expect(mockSlack).toHaveBeenCalledTimes(0);
  });

  it("should call Notion but not Slack if isFullPage is false", async () => {
    const { isFullPage } = require("@notionhq/client");
    isFullPage.mockImplementation(() => false);
    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify(mockBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(mockNotion).toHaveBeenCalledTimes(1);
    expect(mockSlack).toHaveBeenCalledTimes(0);
    expect(response.status).toBe(501);
    expect(data).toEqual({ message: "Failed to create notion page" });
  });

  it("should call Notion but not Slack if the page is not created", async () => {
    mockNotion.mockResolvedValue({ id: undefined });
    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify(mockBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(mockNotion).toHaveBeenCalledTimes(1);
    expect(mockSlack).toHaveBeenCalledTimes(0);
    expect(response.status).toBe(501);
    expect(data).toEqual({ message: "Failed to create notion page" });
  });

  it("shouldn't call Notion or Slack and return 400 response when no body was passed", async () => {
    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(mockNotion).toHaveBeenCalledTimes(0);
    expect(mockSlack).toHaveBeenCalledTimes(0);
  });

  it("shouldn't call Notion or Slack and return 400 response when invalid body was passed", async () => {
    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify(mockInvalidBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(mockNotion).toHaveBeenCalledTimes(0);
    expect(mockSlack).toHaveBeenCalledTimes(0);
  });

  it("should return 403 response when no consent from user", async () => {
    const request = new NextRequest("http://localhost", {
      method: "POST",
      body: JSON.stringify(mockNoConsent),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(403);
    expect(data).toEqual({ message: "No consent by user" });
    expect(mockNotion).toHaveBeenCalledTimes(0);
    expect(mockSlack).toHaveBeenCalledTimes(0);
  });
});
