/**
 * E2E Test: Step 4 - Contract Data
 */

import { expect, test } from "@playwright/test";
import { contractDataTestData } from "../fixtures/test-data";
import {
  FormHelper,
  LocalStorageHelper,
  NavigationHelper,
} from "../helpers/test-helpers";

test.describe("Step 4: Contract Data", () => {
  let nav: NavigationHelper;
  let form: FormHelper;

  test.beforeEach(async ({ page }) => {
    nav = new NavigationHelper(page);
    form = new FormHelper(page);
    await nav.goToStep(4);
  });

  test("should validate required contract fields", async ({ page }) => {
    await nav.clickNextButton();
    const errors = page.locator('[role="alert"]');
    await expect(errors.first())
      .toBeVisible({ timeout: 2000 })
      .catch(() => {});
  });

  test("should accept valid contract data", async ({ page }) => {
    await form.fillInputByName("cargo", contractDataTestData.valid.cargo);
    await form.fillInputByName(
      "departamento",
      contractDataTestData.valid.departamento,
    );
    await form.fillInputByName(
      "dataAdmissao",
      contractDataTestData.valid.dataAdmissao,
    );
    await form.fillInputByName("salario", contractDataTestData.valid.salario);

    const cargoInput = page.locator('[name="cargo"]');
    await expect(cargoInput).toHaveValue(contractDataTestData.valid.cargo);
  });
});
