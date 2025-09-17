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

jest.mock("../(helpers)/slack", () => {
  return {
    notifyContactCreated: jest.fn(),
  };
});

import { notifyContactCreated } from "../(helpers)/slack";
import { processContact } from "../(helpers)/notion";

const mockSlack = notifyContactCreated as jest.Mock;

const mockData = {
  id: "123",
  email: "test@test.com",
  name: "Test Test",
  message: "This is a test message",
  databaseID: "mocked-notion-database-id",
  source: "Unknown",
};

describe("Notion helper", () => {
  beforeEach(() => {
    mockNotion.mockResolvedValue({ id: "fake-page-id" });
    mockSlack.mockResolvedValue({ message: "success" });
    const { isFullPage } = require("@notionhq/client");
    isFullPage.mockImplementation(() => true);
  });

  describe("processContact", () => {
    it("should call createContact and notifyContactCreated", async () => {
      const response = await processContact(mockData);

      expect(response).toBe("fake-page-id");
      expect(mockNotion).toHaveBeenCalledTimes(1);
      expect(mockSlack).toHaveBeenCalledTimes(1);
    });
  });
});
