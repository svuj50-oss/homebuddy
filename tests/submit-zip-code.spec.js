/*
Basic automated test for inserting valid ZIP code, validation of it and checking redirection after successful submition  
*/

import { test, expect } from "@playwright/test";
// Going to test page
test("Submit valid ZIP Code", async ({ page }) => {
  const response = await page.goto("https://hb-test.stage.sirenltd.dev/");
  expect(response).toBeTruthy();
  expect(response.status()).toBe(200);
  // Find input field and insert valid value
  const zipInput = page
    .locator('input[type="tel"][placeholder="Enter ZIP Code"]')
    .first();
  await zipInput.fill("10001");
  // Basic validation tests for input field
  await expect(zipInput).toBeVisible();
  await expect(zipInput).toBeEnabled();
  await expect(zipInput).toHaveValue("10001");
  // First Get estimate Button
  const getEstimatedButton = page
    .locator('button:has-text("Get estimate")')
    .first();
  // Check his visibility
  await expect(getEstimatedButton).toBeVisible();
  await expect(getEstimatedButton).toBeEnabled();
  await getEstimatedButton.click();
  const urlBefore = page.url();
  //  Redirection check
  const nextStepElement = page.locator(
    'text="Which elements of the kitchen would you like to update?"'
  );
  await expect(nextStepElement).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(3000);
  // Check if url is the same as before
  expect(page.url()).toBe(urlBefore);
  await expect(page).not.toHaveURL(/error/i);
});
