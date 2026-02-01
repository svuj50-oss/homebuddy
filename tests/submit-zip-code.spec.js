import { test, expect } from "@playwright/test";

test("Submit valid ZIP code", async ({ page }) => {
  await page.goto("https://hb-test.stage.sirenltd.dev/");

  const zipInput = page
    .locator('input[type="tel"][placeholder="Enter ZIP Code"]')
    .first();
  await zipInput.fill("10001");

  const getEstimatedButton = page
    .locator('button:has-text("Get estimate")')
    .first();
  await getEstimatedButton.click();

  const nextStepElement = page.locator(
    'text="Which elements of the kitchen would you like to update?"'
  );
  await expect(nextStepElement).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(3000);

  await expect(page).not.toHaveURL(/error/i);
});
