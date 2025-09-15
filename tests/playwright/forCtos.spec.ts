import { test, expect } from "@playwright/test";

// const baseUrl = "http://localhost:4321";
const baseUrl = "https://www.crocoder.dev";
const forCtosUrl = "for-ctos";
const contactUrl = "contact";
const valuesSection = "values-grid";
const bookACallSection = "book-a-call-section";

test.describe("For CTOs page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/${forCtosUrl}`);
  });

  test("should have title and corresponding text", async ({ page }) => {
    await expect(page).toHaveTitle(
      "CroCoder | Building Software that Builds Your Business",
    );
    await expect(page.getByText("Integrated solutions for CTOs")).toBeVisible();
  });
});

test.describe("Navigation via links to", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/${forCtosUrl}`);
  });

  test("Book a call section from hero", async ({ page }) => {
    const getStertedLink = page.getByRole("link", { name: "GET STARTED" });

    await getStertedLink.click();

    await expect(page).toHaveURL(
      `${baseUrl}/${forCtosUrl}#${bookACallSection}`,
    );
    await expect(page.locator(`#${bookACallSection}`)).toBeInViewport();
  });

  test("Book a call section from values section", async ({ page }) => {
    const bookACallLink = page.locator(`#${valuesSection}`).getByRole("link", {
      name: "Book a call",
    });

    await bookACallLink.click();

    await expect(page).toHaveURL(
      `${baseUrl}/${forCtosUrl}#${bookACallSection}`,
    );
    await expect(page.locator(`#${bookACallSection}`)).toBeInViewport();
  });

  test("Contact us page from values section", async ({ page }) => {
    const contactUsLink = page
      .locator(`#${valuesSection}`)
      .getByRole("link", { name: "Contact us" });

    await contactUsLink.click();

    await Promise.allSettled([
      page.waitForURL(`${baseUrl}/${contactUrl}`, { timeout: 10000 }),
      expect(page.getByText("get in touch")).toBeVisible(),
    ]);
  });
});
