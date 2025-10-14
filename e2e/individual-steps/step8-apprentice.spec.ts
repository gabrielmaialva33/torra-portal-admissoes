/**
 * E2E Test: Step 8 - Apprentice Data
 */

import { test, expect } from "@playwright/test";
import { apprenticeDataTestData } from "../fixtures/test-data";
import { NavigationHelper, FormHelper } from "../helpers/test-helpers";

test.describe("Step 8: Apprentice Data", () => {
  let nav: NavigationHelper;
  let form: FormHelper;

  test.beforeEach(async ({ page }) => {
    nav = new NavigationHelper(page);
    form = new FormHelper(page);
    await nav.goToStep(8);
  });

  test("should show conditional fields for apprentices", async ({ page }) => {
    await form.clickCheckbox(/aprendiz/i);
    await expect(page.locator('[name="instituicaoEnsino"]')).toBeVisible();
    await expect(page.locator('[name="curso"]')).toBeVisible();
  });

  test("should validate institution name", async ({ page }) => {
    await form.clickCheckbox(/aprendiz/i);
    await form.fillInputByName("instituicaoEnsino", apprenticeDataTestData.apprentice.instituicaoEnsino);
    const input = page.locator('[name="instituicaoEnsino"]');
    await expect(input).toHaveValue(apprenticeDataTestData.apprentice.instituicaoEnsino);
  });
});
