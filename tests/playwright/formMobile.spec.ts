import { test, expect, devices } from "@playwright/test";
import type { Page } from "@playwright/test";

// const baseUrl = "http://localhost:4321";
const baseUrl = "https://www.crocoder.dev";
const contactUrl = "contact";
const routeUrl = "https://api.crocoder.dev/api/contact";

test.describe("Form page in mobile view", () => {
  let page: Page;
  let context;
  test.beforeEach(async ({ browser }) => {
    const testDevice = devices["Galaxy S24"];
    context =
      browser.browserType().name() === "firefox"
        ? await browser.newContext({
            viewport: testDevice.viewport,
            userAgent: testDevice.userAgent,
            deviceScaleFactor: testDevice.deviceScaleFactor,
            hasTouch: testDevice.hasTouch,
          })
        : await browser.newContext(testDevice);
    page = await context.newPage();
    await page.goto(`${baseUrl}/${contactUrl}`);
  });

  test("should have title and display elements corectly", async () => {
    await expect(page).toHaveTitle(
      "CroCoder | Building Software that Builds Your Business",
    );
    await expect(
      page.getByRole("heading", { name: "Let’s Talk About Your Project" }),
    ).toBeVisible();
    await expect(page.getByPlaceholder("Full name *")).toBeVisible();
    await expect(page.getByPlaceholder("E-mail *")).toBeVisible();
    await expect(
      page.getByPlaceholder("Tell us about your project *"),
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

  test("should support input of data and submission of a form", async () => {
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

    await page.getByPlaceholder("Full name *").fill("Test name");
    await page.getByPlaceholder("E-mail *").fill("test@test.com");
    await page
      .getByPlaceholder("Tell us about your project *")
      .fill("This is a test input");
    await page
      .getByText(
        "I give consent to CroCoder to use this information to contact me.",
      )
      .click();
    await page.getByRole("button", { name: "Get a free build review" }).click();

    await expect(
      page.getByRole("heading", { name: "You're All Set!" }),
    ).toBeVisible();
  });
});

test.describe("Form submission in mobile view from home page", () => {
  let page: Page;
  let context;
  test.beforeEach(async ({ browser }) => {
    const testDevice = devices["Galaxy S24"];
    context =
      browser.browserType().name() === "firefox"
        ? await browser.newContext({
            viewport: testDevice.viewport,
            userAgent: testDevice.userAgent,
            deviceScaleFactor: testDevice.deviceScaleFactor,
            hasTouch: testDevice.hasTouch,
          })
        : await browser.newContext(testDevice);
    page = await context.newPage();
    await page.goto(baseUrl);
  });

  test("sucessfull", async () => {
    await page.getByRole("link", { name: "Contact us", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Let’s Talk About Your Project" }),
    ).toBeVisible();
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

    await page.getByPlaceholder("Full name *").fill("Test name");
    await page.getByPlaceholder("E-mail *").fill("test@test.com");
    await page
      .getByPlaceholder("Tell us about your project *")
      .fill("This is a test input");
    await page
      .getByText(
        "I give consent to CroCoder to use this information to contact me.",
      )
      .click();
    await page.getByRole("button", { name: "Get a free build review" }).click();

    await expect(
      page.getByRole("link", { name: "BACK TO HOMEPAGE" }),
    ).toBeVisible();
    await page.getByRole("link", { name: "BACK TO HOMEPAGE" }).click();
    await page.waitForURL(`${baseUrl}/`);

    await expect(
      page.getByRole("heading", {
        name: "Building Software that Builds Your Business",
      }),
    ).toBeVisible();
  });

  test("unsucessfull", async () => {
    await page.getByRole("link", { name: "Contact us", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Let’s Talk About Your Project" }),
    ).toBeVisible();
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

    await page.getByPlaceholder("Full name *").fill("Test name");
    await page.getByPlaceholder("E-mail *").fill("test@test.com");
    await page
      .getByPlaceholder("Tell us about your project *")
      .fill("This is a test input");
    await page
      .getByText(
        "I give consent to CroCoder to use this information to contact me.",
      )
      .click();
    await page.getByRole("button", { name: "Get a free build review" }).click();

    await expect(
      page.getByText("Looks like something went wrong. Please try again."),
    ).toBeVisible();
  });
});
