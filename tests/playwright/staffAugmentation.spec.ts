import { test, expect } from "@playwright/test";

// const baseUrl = "http://localhost:4321";
const baseUrl = "https://www.crocoder.dev";
const staffAugmentationUrl = "staff-augmentation";
const bookACallSection = "book-a-call-section";

test.describe("Staff Augmentation page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/${staffAugmentationUrl}`);
  });

  test("should have title and corresponding text", async ({ page }) => {
    await expect(page).toHaveTitle(
      "CroCoder | Building Software that Builds Your Business",
    );
    await expect(
      page.getByText("Outcome-Driven Product Engineering"),
    ).toBeVisible();
  });
});

test.describe("Navigation via links to", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${baseUrl}/${staffAugmentationUrl}`);
  });

  test("Book a call section from hero", async ({ page }) => {
    const letsTalkLink = page.getByRole("link", { name: "LET'S TALK" });

    await letsTalkLink.click();

    await expect(page).toHaveURL(
      `${baseUrl}/${staffAugmentationUrl}#${bookACallSection}`,
    );
    await expect(page.locator(`#${bookACallSection}`)).toBeInViewport();
  });
});
