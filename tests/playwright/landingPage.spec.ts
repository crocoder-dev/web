import { test, expect } from "@playwright/test";

// const baseUrl = "http://localhost:4321";
const baseUrl = "https://www.crocoder.dev";
const bookACallSection = "book-a-call-section";
const discoverOurServices = "discover-our-services";

test.describe("Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("should have title and corresponding text", async ({ page }) => {
    await expect(page).toHaveTitle(
      "CroCoder | Building Software that Builds Your Business",
    );
    await expect(page.getByText("More than just developers")).toBeVisible();
  });
});

test.describe("Navigation via links to", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Book a call section", async ({ page }) => {
    const bookACallLink = page.getByRole("link", {
      name: "BOOK A CALL",
      exact: true,
    });

    await bookACallLink.click();

    await expect(page).toHaveURL(`${baseUrl}/#${bookACallSection}`);
    await expect(page.locator(`#${bookACallSection}`)).toBeInViewport();
  });

  test("Discover our services section", async ({ page }) => {
    const discoverOurServicesLink = page.getByRole("link", {
      name: "DISCOVER OUR SERVICES",
      exact: true,
    });

    await discoverOurServicesLink.click();

    await expect(page).toHaveURL(`${baseUrl}/#${discoverOurServices}`);
    await expect(page.locator(`#${discoverOurServices}`)).toBeInViewport();
  });
});
