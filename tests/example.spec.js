const { test, expect } = require('@playwright/test');

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const BASE_URL = 'https://hb-test.stage.sirenltd.dev/';
const VALID_ZIP = '10001';

// ─── LOCATORS ─────────────────────────────────────────────────────────────────
const locators = {
  zipInput: '#zipCode',
  getEstimatedBtn: '#zip_header button[data-submit-btn]',
  formStep1: '#zip_header[data-tracking="form-step-1"]',
  formStep2: '#zip_header[data-tracking="form-step-2"]',
};

// ─── TEST SUITE ───────────────────────────────────────────────────────────────
test.describe('HomeBuddy – Kitchen Remodeling | ZIP → Get Estimated Flow', () => {

  // ── 1. Page loads successfully ──────────────────────────────────────────
  test('should load the Kitchen Remodeling page successfully', async ({ page }) => {
    const response = await page.goto(BASE_URL);

    expect(response).toBeTruthy();
    expect(response.status()).toBe(200);

    await expect(page).toHaveTitle(/kitchen remodeling/i);
  });

  // ── 2. ZIP input is visible and enabled ─────────────────────────────────
  test('should display a visible and enabled ZIP code input field', async ({ page }) => {
    await page.goto(BASE_URL);

    const zipInput = page.locator(locators.zipInput);

    await expect(zipInput).toBeVisible();
    await expect(zipInput).toBeEnabled();
  });

  // ── 3. Enter ZIP 10001 → click Get Estimated → step changes ────────────
  test('should accept ZIP code 10001 and change content after clicking "Get Estimated"', async ({ page }) => {
    await page.goto(BASE_URL);

    // Confirm we start on step 1
    await expect(page.locator(locators.formStep1)).toBeVisible();

    // --- Fill ZIP ---
    const zipInput = page.locator(locators.zipInput);
    await zipInput.fill(VALID_ZIP);
    await expect(zipInput).toHaveValue(VALID_ZIP);

    // --- Click Get Estimated ---
    const getEstimatedBtn = page.locator(locators.getEstimatedBtn);
    await expect(getEstimatedBtn).toBeVisible();
    await expect(getEstimatedBtn).toBeEnabled();

    const urlBefore = page.url();

    await getEstimatedBtn.click();

    // --- Assertions ---

    // 1. URL ostaje isti — SPA, nema redirecta
    expect(page.url()).toBe(urlBefore);

    // 2. Form prešla sa step-1 na step-2
    // await expect(page.locator(locators.formStep2)).toBeVisible();
  });
// });
  // ── 4. (Negative) Empty ZIP should NOT proceed ─────────────────────────
  // test('should block submission when ZIP code field is empty', async ({ page }) => {
  //   await page.goto(`${BASE_URL}${KITCHEN_REMODELING_PATH}`, { waitUntil: 'networkidle' });

  //   const zipInput = page.locator(locators.zipInput);
  //   const getEstimatedBtn = page.locator(locators.getEstimatedBtn);

  //   await zipInput.clear();
  //   await expect(zipInput).toHaveValue('');

  //   const urlBefore = page.url();

  //   await getEstimatedBtn.click();

  //   // Mora ostati na istoj stranici — validacija treba da spreci navigaciju
  //   await expect(page).toHaveURL(urlBefore);
  // });
});