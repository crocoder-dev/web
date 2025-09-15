import { test, expect } from "@playwright/test";

// const baseUrl = "http://localhost:4321";
const baseUrl = "https://www.crocoder.dev";
const contactUrl = "contact";
const bookACallSection = "book-a-call-section";

test.describe("Book a call section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("should navigate to Contuct page when pressing on link", async ({
    page,
  }) => {
    const contactUsLink = page
      .locator(`#${bookACallSection}`)
      .getByRole("link", { name: "contact us here" });

    await contactUsLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${contactUrl}`, { timeout: 10000 }),
      expect(page.getByText("get in touch")).toBeVisible(),
    ]);
  });
});
