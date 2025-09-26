import { test, expect } from "@playwright/test";

// const baseUrl = "http://localhost:4321";
const baseUrl = "https://www.crocoder.dev";
const contactUrl = "contact";
const successUrl = "success";
const routeUrl = "https://api.crocoder.dev/api/contact";

test.describe("Submiting a form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}`);
  });

  test("sucessfully", async ({ page }) => {
    await page.route(`${routeUrl}**`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message:
            "Page successfully created in Notion and message sent to Slack.",
        }),
      });
    });
    await page.getByRole("link", { name: "Contact us", exact: true }).click();

    await expect(page).toHaveURL(`${baseUrl}/${contactUrl}`);
    await page.fill('input[name="form-full-name"]', "Test name");
    await page.fill('input[name="form-email"]', "test@test.com");
    await page.fill('textarea[name="form-message"]', "This is a test input");
    await page.check('input[name="form-consent"]');
    await page.click("#form-submit-button");

    await expect(page).toHaveURL(`${baseUrl}/${contactUrl}/${successUrl}`);
  });
});
