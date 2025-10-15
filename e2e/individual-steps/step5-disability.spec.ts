/**
 * E2E Test: Step 5 - Disability Data (PCD)
 */

import { expect, test } from "@playwright/test";
import { disabilityDataTestData } from "../fixtures/test-data";
import { FormHelper, NavigationHelper } from "../helpers/test-helpers";

test.describe("Step 5: Disability Data", () => {
  let nav: NavigationHelper;
  let form: FormHelper;

  test.beforeEach(async ({ page }) => {
    nav = new NavigationHelper(page);
    form = new FormHelper(page);
    await nav.goToStep(5);
  });

  test("should show conditional fields when has disability", async ({
    page,
  }) => {
    await form.clickCheckbox(/possui deficiência/i);
    await expect(page.locator('[name="tipoDeficiencia"]')).toBeVisible();
    await expect(page.locator('[name="cid"]')).toBeVisible();
  });

  test("should hide conditional fields when no disability", async ({
    page,
  }) => {
    await form.uncheckCheckbox(/possui deficiência/i);
    await expect(page.locator('[name="tipoDeficiencia"]')).not.toBeVisible();
  });
});
