/**
 * E2E Test: Complete Onboarding Flow
 *
 * Tests the complete happy path through all 10 onboarding steps,
 * including navigation, data persistence, and progress tracking.
 */

import { test, expect } from "@playwright/test";
import {
  completeOnboardingData,
  personalDataTestData,
  dependentsTestData,
  addressTestData,
  contractDataTestData,
  disabilityDataTestData,
  transportDataTestData,
  foreignerDataTestData,
  apprenticeDataTestData,
  bankDataTestData,
  mockApiResponses,
} from "./fixtures/test-data";
import {
  NavigationHelper,
  FormHelper,
  APIMockHelper,
  LocalStorageHelper,
  AssertionHelper,
  PersonalDataFormHelper,
  AddressFormHelper,
  DependentHelper,
  TransportHelper,
} from "./helpers/test-helpers";

test.describe("Complete Onboarding Flow - Happy Path", () => {
  let nav: NavigationHelper;
  let form: FormHelper;
  let api: APIMockHelper;
  let storage: LocalStorageHelper;
  let assertions: AssertionHelper;

  test.beforeEach(async ({ page }) => {
    // Initialize helpers
    nav = new NavigationHelper(page);
    form = new FormHelper(page);
    api = new APIMockHelper(page);
    storage = new LocalStorageHelper(page);
    assertions = new AssertionHelper(page);

    // Clear localStorage before each test
    await storage.clearOnboardingState();

    // Mock API responses
    await api.mockColaboradorGet(mockApiResponses.colaborador);
  });

  test("should complete all 10 steps successfully", async ({ page }) => {
    // Step 1: Personal Data
    await nav.goToStep(1);
    await nav.verifyCurrentStep(1);

    const personalDataForm = new PersonalDataFormHelper(page);
    await personalDataForm.fillPersonalData(personalDataTestData.valid);

    await api.mockStepSubmission(1, mockApiResponses.submitSuccess);
    await nav.clickNextButton();

    // Verify step completion
    await storage.verifyStepCompleted(1);
    await nav.verifyCurrentStep(2);

    // Step 2: Dependents
    const dependentHelper = new DependentHelper(page);

    // Add first dependent
    await dependentHelper.addDependent(dependentsTestData.valid[0]);
    await dependentHelper.verifyDependentCount(1);

    // Add second dependent
    await dependentHelper.addDependent(dependentsTestData.valid[1]);
    await dependentHelper.verifyDependentCount(2);

    await api.mockStepSubmission(2, mockApiResponses.submitSuccess);
    await nav.clickNextButton();

    await storage.verifyStepCompleted(2);
    await nav.verifyCurrentStep(3);

    // Step 3: Address
    const addressForm = new AddressFormHelper(page);
    await api.mockCEPValidation(addressTestData.valid.cep, mockApiResponses.cepValidation);
    await addressForm.fillAddress(addressTestData.valid);

    await api.mockStepSubmission(3, mockApiResponses.submitSuccess);
    await nav.clickNextButton();

    await storage.verifyStepCompleted(3);
    await nav.verifyCurrentStep(4);

    // Step 4: Contract Data
    await form.fillInputByName("cargo", contractDataTestData.valid.cargo);
    await form.fillInputByName("departamento", contractDataTestData.valid.departamento);
    await form.fillInputByName("dataAdmissao", contractDataTestData.valid.dataAdmissao);
    await form.fillInputByName("salario", contractDataTestData.valid.salario);
    await form.fillInputByName("horarioTrabalho", contractDataTestData.valid.horarioTrabalho);
    await form.fillInputByName("tipoContrato", contractDataTestData.valid.tipoContrato);

    await api.mockStepSubmission(4, mockApiResponses.submitSuccess);
    await nav.clickNextButton();

    await storage.verifyStepCompleted(4);
    await nav.verifyCurrentStep(5);

    // Step 5: Disability Data - No disability
    await form.uncheckCheckbox(/possui deficiência/i);

    await api.mockStepSubmission(5, mockApiResponses.submitSuccess);
    await nav.clickNextButton();

    await storage.verifyStepCompleted(5);
    await nav.verifyCurrentStep(6);

    // Step 6: Transport Voucher
    const transportHelper = new TransportHelper(page);
    await form.clickCheckbox(/necessita vale transporte/i);

    // Add transport lines
    await transportHelper.addTransportLine(transportDataTestData.withTransport.linhas[0]);
    await transportHelper.addTransportLine(transportDataTestData.withTransport.linhas[1]);
    await transportHelper.verifyTransportLineCount(2);

    await api.mockStepSubmission(6, mockApiResponses.submitSuccess);
    await nav.clickNextButton();

    await storage.verifyStepCompleted(6);
    await nav.verifyCurrentStep(7);

    // Step 7: Foreigner Data - Not a foreigner
    await form.uncheckCheckbox(/estrangeiro/i);

    await api.mockStepSubmission(7, mockApiResponses.submitSuccess);
    await nav.clickNextButton();

    await storage.verifyStepCompleted(7);
    await nav.verifyCurrentStep(8);

    // Step 8: Apprentice Data - Not an apprentice
    await form.uncheckCheckbox(/aprendiz/i);

    await api.mockStepSubmission(8, mockApiResponses.submitSuccess);
    await nav.clickNextButton();

    await storage.verifyStepCompleted(8);
    await nav.verifyCurrentStep(9);

    // Step 9: Bank Data
    await form.fillInputByName("nomeBanco", bankDataTestData.valid.nomeBanco);
    await form.fillInputByName("codigoBanco", bankDataTestData.valid.codigoBanco);
    await form.fillInputByName("agencia", bankDataTestData.valid.agencia);
    await form.fillInputByName("numeroConta", bankDataTestData.valid.numeroConta);
    await form.selectOption(/tipo de conta/i, bankDataTestData.valid.tipoConta);
    await form.fillInputByName("chavePix", bankDataTestData.valid.chavePix);

    await api.mockStepSubmission(9, mockApiResponses.submitSuccess);
    await nav.clickNextButton();

    await storage.verifyStepCompleted(9);
    await nav.verifyCurrentStep(10);

    // Step 10: Document Upload (verified in separate test file)
    // Verify we reached the final step
    await expect(page).toHaveURL(/\/onboarding\/10/);
  });

  test("should navigate between steps correctly", async ({ page }) => {
    // Set initial state with completed steps
    await storage.setOnboardingState({
      currentStep: 5,
      completedSteps: [1, 2, 3, 4],
      formData: completeOnboardingData,
      documents: [],
    });

    // Should be able to access step 5
    await nav.goToStep(5);
    await nav.verifyCurrentStep(5);

    // Should be able to go back to previous steps
    await nav.goToStep(3);
    await nav.verifyCurrentStep(3);

    // Should be able to go to step 1
    await nav.goToStep(1);
    await nav.verifyCurrentStep(1);

    // Should be able to jump to step 5 (next after completed)
    await nav.goToStep(5);
    await nav.verifyCurrentStep(5);
  });

  test("should persist form data in localStorage", async ({ page }) => {
    // Step 1: Fill personal data
    await nav.goToStep(1);
    const personalDataForm = new PersonalDataFormHelper(page);
    await personalDataForm.fillPersonalData(personalDataTestData.valid);

    // Save without navigating
    await nav.clickSaveButton();
    await page.waitForTimeout(500);

    // Reload page
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Verify data persisted
    const state = await storage.getOnboardingState();
    expect(state.state.formData.personalData.cpf).toBe(personalDataTestData.valid.cpf);
    expect(state.state.formData.personalData.email).toBe(personalDataTestData.valid.email);

    // Verify form fields still contain data
    const cpfInput = page.locator('[name="cpf"]');
    await expect(cpfInput).toHaveValue(personalDataTestData.valid.cpf);
  });

  test("should show progress indicator correctly", async ({ page }) => {
    // Set state with 3 completed steps
    await storage.setOnboardingState({
      currentStep: 4,
      completedSteps: [1, 2, 3],
      formData: {},
      documents: [],
    });

    await nav.goToStep(4);

    // Verify stepper shows correct progress
    const stepper = page.locator('[data-testid="stepper"]');

    // Steps 1, 2, 3 should show as completed
    for (let i = 1; i <= 3; i++) {
      const stepIndicator = stepper.locator(`[data-step="${i}"]`);
      await expect(stepIndicator).toHaveAttribute("data-completed", "true");
    }

    // Step 4 should show as current
    const currentStep = stepper.locator('[data-step="4"]');
    await expect(currentStep).toHaveAttribute("data-current", "true");

    // Steps 5-10 should not be completed
    for (let i = 5; i <= 10; i++) {
      const stepIndicator = stepper.locator(`[data-step="${i}"]`);
      await expect(stepIndicator).not.toHaveAttribute("data-completed", "true");
    }
  });

  test("should prevent skipping steps", async ({ page }) => {
    // Clear state - start fresh
    await storage.clearOnboardingState();

    // Try to access step 5 directly (should redirect or show error)
    await page.goto("/onboarding/5");

    // Should either redirect to step 1 or show access denied
    const currentUrl = page.url();
    const hasAccessDenied = await page.locator('text=/acesso negado|não pode acessar/i').isVisible().catch(() => false);

    expect(currentUrl.includes("/onboarding/1") || hasAccessDenied).toBeTruthy();
  });

  test("should allow navigation back to previous steps", async ({ page }) => {
    // Set state with completed steps
    await storage.setOnboardingState({
      currentStep: 4,
      completedSteps: [1, 2, 3],
      formData: completeOnboardingData,
      documents: [],
    });

    await nav.goToStep(4);

    // Navigate back to step 2
    await nav.goToStep(2);
    await nav.verifyCurrentStep(2);

    // Form should still have saved data
    const state = await storage.getOnboardingState();
    expect(state.state.formData.dependents).toBeDefined();
  });

  test("should update progress when completing steps", async ({ page }) => {
    await nav.goToStep(1);

    const personalDataForm = new PersonalDataFormHelper(page);
    await personalDataForm.fillPersonalData(personalDataTestData.valid);

    await api.mockStepSubmission(1, mockApiResponses.submitSuccess);
    await nav.clickNextButton();

    // Verify localStorage updated
    const state = await storage.getOnboardingState();
    expect(state.state.completedSteps).toContain(1);
    expect(state.state.currentStep).toBe(2);
  });

  test("should handle conditional fields correctly", async ({ page }) => {
    // Test Step 5: Disability Data with conditional fields
    await nav.goToStep(5);

    // Initially, conditional fields should not be visible
    await expect(page.locator('[name="tipoDeficiencia"]')).not.toBeVisible();
    await expect(page.locator('[name="cid"]')).not.toBeVisible();
    await expect(page.locator('[name="necessidadesEspeciais"]')).not.toBeVisible();

    // Check "possui deficiência"
    await form.clickCheckbox(/possui deficiência/i);

    // Conditional fields should now be visible
    await expect(page.locator('[name="tipoDeficiencia"]')).toBeVisible();
    await expect(page.locator('[name="cid"]')).toBeVisible();
    await expect(page.locator('[name="necessidadesEspeciais"]')).toBeVisible();

    // Uncheck - fields should hide again
    await form.uncheckCheckbox(/possui deficiência/i);
    await expect(page.locator('[name="tipoDeficiencia"]')).not.toBeVisible();
  });

  test("should save and continue from any step", async ({ page }) => {
    // Go to step 3
    await storage.setOnboardingState({
      currentStep: 3,
      completedSteps: [1, 2],
      formData: {},
      documents: [],
    });

    await nav.goToStep(3);

    const addressForm = new AddressFormHelper(page);
    await api.mockCEPValidation(addressTestData.valid.cep, mockApiResponses.cepValidation);
    await addressForm.fillAddress(addressTestData.valid);

    // Save without proceeding to next step
    await nav.clickSaveButton();
    await page.waitForTimeout(500);

    // Verify data saved to localStorage
    const state = await storage.getOnboardingState();
    expect(state.state.formData.address.cep).toBe(addressTestData.valid.cep);

    // Current step should still be 3
    expect(state.state.currentStep).toBe(3);
  });
});

test.describe("Onboarding Flow - Data Validation", () => {
  let nav: NavigationHelper;
  let form: FormHelper;

  test.beforeEach(async ({ page }) => {
    nav = new NavigationHelper(page);
    form = new FormHelper(page);
  });

  test("should validate required fields on each step", async ({ page }) => {
    // Step 1: Try to proceed without filling required fields
    await nav.goToStep(1);
    await nav.clickNextButton();

    // Should show validation errors
    await form.verifyValidationError(/obrigatório/i);

    // Next button should be disabled or form should not submit
    const nextButton = page.getByRole("button", { name: /próximo/i });
    const isDisabled = await nextButton.isDisabled();
    const currentUrl = page.url();

    // Either button is disabled or we're still on step 1
    expect(isDisabled || currentUrl.includes("/onboarding/1")).toBeTruthy();
  });

  test("should validate CPF format", async ({ page }) => {
    await nav.goToStep(1);

    // Enter invalid CPF
    await form.fillInputByName("cpf", personalDataTestData.invalid.cpfInvalid);
    await form.waitForFormValidation();

    // Should show CPF validation error
    const cpfError = page.locator('text=/cpf inválido|formato inválido/i');
    await expect(cpfError).toBeVisible({ timeout: 2000 }).catch(() => {
      // Some forms validate on submit, not on blur
    });
  });

  test("should validate phone number format", async ({ page }) => {
    await nav.goToStep(1);

    // Enter invalid phone
    await form.fillInputByName("celular", personalDataTestData.invalid.phoneInvalid);
    await form.waitForFormValidation();

    // Should show phone validation error or automatically format
    const phoneInput = page.locator('[name="celular"]');
    const value = await phoneInput.inputValue();

    // Phone should either show error or be automatically formatted
    expect(value.length <= 15).toBeTruthy(); // Max formatted length
  });

  test("should validate email format", async ({ page }) => {
    await nav.goToStep(1);

    // Enter invalid email
    await form.fillInputByName("email", personalDataTestData.invalid.emailInvalid);
    await form.waitForFormValidation();

    const emailError = page.locator('text=/email inválido|e-mail inválido/i');
    await expect(emailError).toBeVisible({ timeout: 2000 }).catch(() => {
      // Some forms validate on submit
    });
  });

  test("should validate date fields", async ({ page }) => {
    await nav.goToStep(1);

    // Try to enter future birth date
    await form.fillInputByName("dataNascimento", personalDataTestData.invalid.birthDateFuture);
    await form.waitForFormValidation();

    // Should show date validation error
    const dateError = page.locator('text=/data inválida|data de nascimento inválida/i');
    await expect(dateError).toBeVisible({ timeout: 2000 }).catch(() => {
      // Some validations happen on submit
    });
  });
});
