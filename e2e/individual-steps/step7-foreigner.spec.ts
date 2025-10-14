/**
 * E2E Test: Step 7 - Foreigner Data
 */

import { test, expect } from "@playwright/test";
import { foreignerDataTestData } from "../fixtures/test-data";
import { NavigationHelper, FormHelper } from "../helpers/test-helpers";

test.describe("Step 7: Foreigner Data", () => {
  let nav: NavigationHelper;
  let form: FormHelper;

  test.beforeEach(async ({ page }) => {
    nav = new NavigationHelper(page);
    form = new FormHelper(page);
    await nav.goToStep(7);
  });

  test("should show conditional fields for foreigners", async ({ page }) => {
    await form.clickCheckbox(/estrangeiro/i);
    await expect(page.locator('[name="numeroPassaporte"]')).toBeVisible();
    await expect(page.locator('[name="tipoVisto"]')).toBeVisible();
  });

  test("should hide conditional fields for Brazilians", async ({ page }) => {
    await form.uncheckCheckbox(/estrangeiro/i);
    await expect(page.locator('[name="numeroPassaporte"]')).not.toBeVisible();
  });

  test("should validate passport number format", async ({ page }) => {
    await form.clickCheckbox(/estrangeiro/i);
    await form.fillInputByName("numeroPassaporte", foreignerDataTestData.foreigner.numeroPassaporte);
    const input = page.locator('[name="numeroPassaporte"]');
    await expect(input).toHaveValue(foreignerDataTestData.foreigner.numeroPassaporte);
  });
});
