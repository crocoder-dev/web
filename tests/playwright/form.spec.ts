import { test, expect } from "@playwright/test";

// const baseUrl = "http://localhost:4321";
const baseUrl = "https://www.crocoder.dev";
const contactUrl = "contact";
const routeUrl = "https://api.crocoder.dev/api/contact";

test.describe("Form page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/${contactUrl}`);
  });

  test("should have title and display elements corectly", async ({ page }) => {
    await expect(page).toHaveTitle(
      "CroCoder | Building Software that Builds Your Business",
    );
    await expect(page.getByText("get in touch")).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Full name *" }),
    ).toBeVisible();
    await expect(page.getByRole("textbox", { name: "E-mail *" })).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Tell us about your project *" }),
    ).toBeVisible();
    await expect(
      page.getByRole("checkbox", { name: "I give consent to CroCoder to" }),
    ).toBeVisible();
    await expect(
      page.getByText(
        "I give consent to CroCoder to use this information to contact me.",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Get a free build review" }),
    ).toBeVisible();
  });

  test("should support input of data and submission of a form", async ({
    page,
  }) => {
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
    await page.getByRole("textbox", { name: "Full name *" }).fill("Test name");
    await page.getByRole("textbox", { name: "E-mail *" }).fill("test@test.com");
    await page
      .getByRole("textbox", { name: "Tell us about your project *" })
      .fill("This is a test input");
    await page
      .getByRole("checkbox", { name: "I give consent to CroCoder to" })
      .click();
    await page.getByRole("button", { name: "Get a free build review" }).click();

    await expect(
      page.getByRole("heading", { name: "You're All Set!" }),
    ).toBeVisible();
  });
});

test.describe("Form submission from home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("sucessfull", async ({ page }) => {
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
    await page.getByRole("navigation").getByText("Contact us").last().click();

    await expect(page.getByText("get in touch")).toBeVisible();
    await page.getByRole("textbox", { name: "Full name *" }).fill("Test name");
    await page.getByRole("textbox", { name: "E-mail *" }).fill("test@test.com");
    await page
      .getByRole("textbox", { name: "Tell us about your project *" })
      .fill("This is a test input");
    await page
      .getByRole("checkbox", { name: "I give consent to CroCoder to" })
      .click();
    await page.getByRole("button", { name: "Get a free build review" }).click();

    await expect(
      page.getByRole("link", { name: "BACK TO HOMEPAGE" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "BACK TO HOMEPAGE" }).click();

    await page.waitForURL(`${baseUrl}/`);
    await expect(page.getByText("More than just developers")).toBeVisible();
  });

  test("unsucessfull", async ({ page }) => {
    await page.route(`${routeUrl}**`, async (route) => {
      await route.fulfill({
        status: 501,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "Issue while processing request",
        }),
      });
    });
    await page.getByRole("navigation").getByText("Contact us").last().click();

    await expect(page.getByText("get in touch")).toBeVisible();
    await page.getByRole("textbox", { name: "Full name *" }).fill("Test name");
    await page.getByRole("textbox", { name: "E-mail *" }).fill("test@test.com");
    await page
      .getByRole("textbox", { name: "Tell us about your project *" })
      .fill("This is a test input");
    await page
      .getByRole("checkbox", { name: "I give consent to CroCoder to" })
      .click();
    await page.getByRole("button", { name: "Get a free build review" }).click();

    await expect(
      page.getByText("Looks like something went wrong. Please try again."),
    ).toBeVisible();
  });
});
