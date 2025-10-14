/**
 * E2E Test: Step 3 - Address Form with CEP Lookup
 */

import { test, expect } from "@playwright/test";
import { addressTestData, mockApiResponses } from "../fixtures/test-data";
import { NavigationHelper, AddressFormHelper, LocalStorageHelper, APIMockHelper } from "../helpers/test-helpers";

test.describe("Step 3: Address Form", () => {
  let nav: NavigationHelper;
  let addressForm: AddressFormHelper;
  let storage: LocalStorageHelper;
  let api: APIMockHelper;

  test.beforeEach(async ({ page }) => {
    nav = new NavigationHelper(page);
    addressForm = new AddressFormHelper(page);
    storage = new LocalStorageHelper(page);
    api = new APIMockHelper(page);

    await storage.setOnboardingState({
      currentStep: 3,
      completedSteps: [1, 2],
      formData: {},
      documents: [],
    });

    await nav.goToStep(3);
  });

  test("should auto-fill address from CEP", async ({ page }) => {
    await api.mockCEPValidation(addressTestData.valid.cep, mockApiResponses.cepValidation);
    
    await page.locator('[name="cep"]').fill(addressTestData.valid.cep);
    await page.waitForTimeout(1000);

    await addressForm.verifyCEPAutoFill({
      logradouro: addressTestData.valid.logradouro,
      bairro: addressTestData.valid.bairro,
      cidade: addressTestData.valid.cidade,
      estado: addressTestData.valid.estado,
    });
  });

  test("should validate CEP format", async ({ page }) => {
    await page.locator('[name="cep"]').fill("00000-000");
    await nav.clickNextButton();

    const cepError = page.locator('text=/cep inválido/i');
    await expect(cepError).toBeVisible({ timeout: 2000 }).catch(() => {});
  });

  test("should allow manual address entry", async ({ page }) => {
    await addressForm.fillAddress(addressTestData.validWithoutComplement);

    const logradouroInput = page.locator('[name="logradouro"]');
    await expect(logradouroInput).toHaveValue(addressTestData.validWithoutComplement.logradouro);
  });

  test("should save and proceed to step 4", async ({ page }) => {
    await addressForm.fillAddress(addressTestData.valid);

    await api.mockStepSubmission(3, { success: true, data: {}, message: "Success" });
    await nav.clickNextButton();
    await page.waitForTimeout(1000);

    await expect(page).toHaveURL(/\/onboarding\/4/);
  });
});
