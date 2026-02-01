import { test, expect } from "@playwright/test";

test("Submit valid ZIP code", async ({ page }) => {
  const response = await page.goto("https://hb-test.stage.sirenltd.dev/");
  expect(response).toBeTruthy();
  expect(response.status()).toBe(200);

  const zipInput = page
    .locator('input[type="tel"][placeholder="Enter ZIP Code"]')
    .first();
  await zipInput.fill("10001");

  await expect(zipInput).toBeVisible();
  await expect(zipInput).toBeEnabled();
  await expect(zipInput).toHaveValue("10001");

  const getEstimatedButton = page
    .locator('button:has-text("Get estimate")')
    .first();
  await expect(getEstimatedButton).toBeVisible();
  await expect(getEstimatedButton).toBeEnabled();
  await getEstimatedButton.click();
  const urlBefore = page.url();

  const nextStepElement = page.locator(
    'text="Which elements of the kitchen would you like to update?"'
  );
  await expect(nextStepElement).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(3000);
  expect(page.url()).toBe(urlBefore);
  await expect(page).not.toHaveURL(/error/i);
});
