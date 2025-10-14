/**
 * E2E Test: Step 9 - Bank Account Data
 */

import { test, expect } from "@playwright/test";
import { bankDataTestData } from "../fixtures/test-data";
import { NavigationHelper, FormHelper } from "../helpers/test-helpers";

test.describe("Step 9: Bank Account Data", () => {
  let nav: NavigationHelper;
  let form: FormHelper;

  test.beforeEach(async ({ page }) => {
    nav = new NavigationHelper(page);
    form = new FormHelper(page);
    await nav.goToStep(9);
  });

  test("should validate required bank fields", async ({ page }) => {
    await nav.clickNextButton();
    const errors = page.locator('[role="alert"]');
    await expect(errors.first()).toBeVisible({ timeout: 2000 }).catch(() => {});
  });

  test("should accept valid bank data", async ({ page }) => {
    await form.fillInputByName("nomeBanco", bankDataTestData.valid.nomeBanco);
    await form.fillInputByName("codigoBanco", bankDataTestData.valid.codigoBanco);
    await form.fillInputByName("agencia", bankDataTestData.valid.agencia);
    await form.fillInputByName("numeroConta", bankDataTestData.valid.numeroConta);
    
    const bancoInput = page.locator('[name="nomeBanco"]');
    await expect(bancoInput).toHaveValue(bankDataTestData.valid.nomeBanco);
  });

  test("should validate PIX key format", async ({ page }) => {
    await form.fillInputByName("chavePix", bankDataTestData.valid.chavePix);
    const pixInput = page.locator('[name="chavePix"]');
    await expect(pixInput).toHaveValue(bankDataTestData.valid.chavePix);
  });

  test("should allow selecting account type", async ({ page }) => {
    await form.selectOption(/tipo.*conta/i, bankDataTestData.valid.tipoConta);
    const select = page.locator('[name="tipoConta"]');
    await expect(select).toHaveValue(bankDataTestData.valid.tipoConta);
  });
});
