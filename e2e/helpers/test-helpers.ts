/**
 * Test Helpers for Torra Portal Admissões E2E Tests
 *
 * Contains reusable helper functions for page navigation, form filling,
 * API mocking, assertions, and test utilities.
 */

import { expect, type Page, type Route } from "@playwright/test";

/**
 * Navigation Helpers
 */
export class NavigationHelper {
  constructor(private page: Page) {}

  async goToStep(stepNumber: number): Promise<void> {
    await this.page.goto(`/onboarding/${stepNumber}`);
    await this.page.waitForLoadState("networkidle");
  }

  async goToHomePage(): Promise<void> {
    await this.page.goto("/");
    await this.page.waitForLoadState("networkidle");
  }

  async clickNextButton(): Promise<void> {
    await this.page.getByRole("button", { name: /próximo/i }).click();
  }

  async clickSaveButton(): Promise<void> {
    await this.page.getByRole("button", { name: /salvar/i }).click();
  }

  async clickBackButton(): Promise<void> {
    await this.page.getByRole("button", { name: /voltar/i }).click();
  }

  async verifyCurrentStep(stepNumber: number): Promise<void> {
    // Verify URL
    await expect(this.page).toHaveURL(`/onboarding/${stepNumber}`);

    // Verify stepper shows correct step
    const stepper = this.page.locator('[data-testid="stepper"]');
    if (await stepper.isVisible()) {
      const currentStepIndicator = stepper.locator(`[data-step="${stepNumber}"][data-current="true"]`);
      await expect(currentStepIndicator).toBeVisible();
    }
  }
}

/**
 * Form Filling Helpers
 */
export class FormHelper {
  constructor(private page: Page) {}

  async fillInput(label: string, value: string): Promise<void> {
    const input = this.page.getByLabel(label, { exact: false });
    await input.clear();
    await input.fill(value);
  }

  async fillInputByName(name: string, value: string): Promise<void> {
    const input = this.page.locator(`[name="${name}"]`);
    await input.clear();
    await input.fill(value);
  }

  async fillInputByPlaceholder(placeholder: string, value: string): Promise<void> {
    const input = this.page.getByPlaceholder(placeholder);
    await input.clear();
    await input.fill(value);
  }

  async selectOption(label: string, value: string): Promise<void> {
    const select = this.page.getByLabel(label, { exact: false });
    await select.selectOption(value);
  }

  async clickCheckbox(label: string): Promise<void> {
    const checkbox = this.page.getByLabel(label, { exact: false });
    await checkbox.check();
  }

  async uncheckCheckbox(label: string): Promise<void> {
    const checkbox = this.page.getByLabel(label, { exact: false });
    await checkbox.uncheck();
  }

  async uploadFile(label: string, filePath: string): Promise<void> {
    const fileInput = this.page.getByLabel(label, { exact: false });
    await fileInput.setInputFiles(filePath);
  }

  async waitForFormValidation(): Promise<void> {
    await this.page.waitForTimeout(500); // Wait for validation to complete
  }

  async verifyValidationError(message: string): Promise<void> {
    const errorElement = this.page.locator(`text=${message}`);
    await expect(errorElement).toBeVisible();
  }

  async verifyNoValidationErrors(): Promise<void> {
    const errorElements = this.page.locator('[role="alert"]');
    await expect(errorElements).toHaveCount(0);
  }
}

/**
 * Personal Data Form Helpers (Step 1)
 */
export class PersonalDataFormHelper extends FormHelper {
  async fillPersonalData(data: {
    nomeCompleto: string;
    nomeSocial?: string;
    dataNascimento: string;
    celular: string;
    nomePai?: string;
    nomeMae?: string;
    numeroRG: string;
    dataEmissaoRG: string;
    orgaoEmissor: string;
    cpf: string;
    estadoCivil?: string;
    grauEscolaridade?: string;
  }): Promise<void> {
    await this.fillInputByName("nomeCompleto", data.nomeCompleto);
    if (data.nomeSocial) await this.fillInputByName("nomeSocial", data.nomeSocial);
    await this.fillInputByName("dataNascimento", data.dataNascimento);
    await this.fillInputByName("celular", data.celular);
    if (data.nomePai) await this.fillInputByName("nomePai", data.nomePai);
    if (data.nomeMae) await this.fillInputByName("nomeMae", data.nomeMae);
    await this.fillInputByName("numeroRG", data.numeroRG);
    await this.fillInputByName("dataEmissaoRG", data.dataEmissaoRG);
    await this.fillInputByName("orgaoEmissor", data.orgaoEmissor);
    await this.fillInputByName("cpf", data.cpf);
    if (data.estadoCivil) await this.fillInputByName("estadoCivil", data.estadoCivil);
    if (data.grauEscolaridade) await this.fillInputByName("grauEscolaridade", data.grauEscolaridade);
  }
}

/**
 * Address Form Helpers (Step 3)
 */
export class AddressFormHelper extends FormHelper {
  async fillAddress(data: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
  }): Promise<void> {
    await this.fillInputByName("cep", data.cep);
    // Wait for CEP lookup to complete
    await this.page.waitForTimeout(1000);
    await this.fillInputByName("logradouro", data.logradouro);
    await this.fillInputByName("numero", data.numero);
    if (data.complemento) await this.fillInputByName("complemento", data.complemento);
    await this.fillInputByName("bairro", data.bairro);
    await this.fillInputByName("cidade", data.cidade);
    await this.fillInputByName("estado", data.estado);
  }

  async verifyCEPAutoFill(expectedData: {
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
  }): Promise<void> {
    const logradouro = this.page.locator('[name="logradouro"]');
    const bairro = this.page.locator('[name="bairro"]');
    const cidade = this.page.locator('[name="cidade"]');
    const estado = this.page.locator('[name="estado"]');

    await expect(logradouro).toHaveValue(expectedData.logradouro);
    await expect(bairro).toHaveValue(expectedData.bairro);
    await expect(cidade).toHaveValue(expectedData.cidade);
    await expect(estado).toHaveValue(expectedData.estado);
  }
}

/**
 * API Mock Helpers
 */
export class APIMockHelper {
  constructor(private page: Page) {}

  async mockColaboradorGet(data: any): Promise<void> {
    await this.page.route("**/api/colaboradores/*", async (route: Route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(data),
        });
      } else {
        await route.continue();
      }
    });
  }

  async mockStepSubmission(stepNumber: number, response: any, status = 200): Promise<void> {
    const patterns = [
      "**/api/admissao/dados-gerais",
      "**/api/admissao/dependentes",
      "**/api/admissao/endereco",
      "**/api/admissao/dados-contratuais",
      "**/api/admissao/dados-pcd",
      "**/api/admissao/vale-transporte",
      "**/api/admissao/dados-estrangeiro",
      "**/api/admissao/dados-aprendiz",
      "**/api/admissao/dados-bancarios",
    ];

    await this.page.route(patterns[stepNumber - 1], async (route: Route) => {
      if (route.request().method() === "POST" || route.request().method() === "PUT") {
        await route.fulfill({
          status,
          contentType: "application/json",
          body: JSON.stringify(response),
        });
      } else {
        await route.continue();
      }
    });
  }

  async mockDocumentUpload(response: any, status = 200): Promise<void> {
    await this.page.route("**/api/documentos/upload", async (route: Route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({
          status,
          contentType: "application/json",
          body: JSON.stringify(response),
        });
      } else {
        await route.continue();
      }
    });
  }

  async mockCEPValidation(cep: string, response: any): Promise<void> {
    await this.page.route(`**/api/cep/${cep}`, async (route: Route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(response),
      });
    });
  }

  async mockNetworkError(pattern: string): Promise<void> {
    await this.page.route(pattern, async (route: Route) => {
      await route.abort("failed");
    });
  }

  async mockServerError(pattern: string, status = 500): Promise<void> {
    await this.page.route(pattern, async (route: Route) => {
      await route.fulfill({
        status,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          message: "Internal server error",
          errors: ["Unexpected error occurred"],
        }),
      });
    });
  }

  async clearAllMocks(): Promise<void> {
    await this.page.unroute("**/*");
  }
}

/**
 * LocalStorage Helpers
 */
export class LocalStorageHelper {
  constructor(private page: Page) {}

  async setOnboardingState(state: any): Promise<void> {
    await this.page.evaluate((stateData) => {
      localStorage.setItem("torra-onboarding", JSON.stringify({ state: stateData }));
    }, state);
  }

  async getOnboardingState(): Promise<any> {
    return await this.page.evaluate(() => {
      const data = localStorage.getItem("torra-onboarding");
      return data ? JSON.parse(data) : null;
    });
  }

  async clearOnboardingState(): Promise<void> {
    await this.page.evaluate(() => {
      localStorage.removeItem("torra-onboarding");
    });
  }

  async verifyStepCompleted(stepNumber: number): Promise<void> {
    const state = await this.getOnboardingState();
    expect(state.state.completedSteps).toContain(stepNumber);
  }

  async verifyCurrentStep(stepNumber: number): Promise<void> {
    const state = await this.getOnboardingState();
    expect(state.state.currentStep).toBe(stepNumber);
  }
}

/**
 * Assertion Helpers
 */
export class AssertionHelper {
  constructor(private page: Page) {}

  async verifyToastMessage(message: string): Promise<void> {
    const toast = this.page.locator('[role="status"], [role="alert"]', { hasText: message });
    await expect(toast).toBeVisible();
  }

  async verifyErrorMessage(message: string): Promise<void> {
    const error = this.page.locator('[role="alert"]', { hasText: message });
    await expect(error).toBeVisible();
  }

  async verifySuccessMessage(message: string): Promise<void> {
    const success = this.page.locator('[role="status"]', { hasText: message });
    await expect(success).toBeVisible();
  }

  async verifyProgressIndicator(currentStep: number, totalSteps: number): Promise<void> {
    const progress = this.page.locator('[data-testid="progress-indicator"]');
    await expect(progress).toContainText(`${currentStep}/${totalSteps}`);
  }

  async verifyStepCompleteIndicator(stepNumber: number): Promise<void> {
    const stepIndicator = this.page.locator(`[data-step="${stepNumber}"][data-completed="true"]`);
    await expect(stepIndicator).toBeVisible();
  }

  async verifyButtonDisabled(buttonText: string): Promise<void> {
    const button = this.page.getByRole("button", { name: buttonText });
    await expect(button).toBeDisabled();
  }

  async verifyButtonEnabled(buttonText: string): Promise<void> {
    const button = this.page.getByRole("button", { name: buttonText });
    await expect(button).toBeEnabled();
  }
}

/**
 * Screenshot and Visual Regression Helpers
 */
export class VisualHelper {
  constructor(private page: Page) {}

  async takeStepScreenshot(stepNumber: number, name?: string): Promise<void> {
    const screenshotName = name || `step-${stepNumber}`;
    await this.page.screenshot({
      path: `test-results/screenshots/${screenshotName}.png`,
      fullPage: true,
    });
  }

  async compareStepScreenshot(stepNumber: number, name?: string): Promise<void> {
    const screenshotName = name || `step-${stepNumber}`;
    await expect(this.page).toHaveScreenshot(`${screenshotName}.png`, {
      fullPage: true,
      maxDiffPixels: 100,
    });
  }

  async captureVideoOnFailure(): Promise<void> {
    // Video capture is configured in playwright.config.ts
    // This is just a placeholder for custom video logic if needed
  }
}

/**
 * Wait Helpers
 */
export class WaitHelper {
  constructor(private page: Page) {}

  async waitForAPIResponse(url: string, timeout = 10000): Promise<void> {
    await this.page.waitForResponse(
      (response) => response.url().includes(url) && response.status() === 200,
      { timeout }
    );
  }

  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  async waitForElement(selector: string, timeout = 10000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout, state: "visible" });
  }

  async waitForFileUpload(): Promise<void> {
    await this.page.waitForTimeout(1000); // Wait for upload to process
  }

  async waitForFormSubmission(): Promise<void> {
    await this.page.waitForTimeout(500); // Wait for form submission
  }
}

/**
 * Keyboard Navigation Helpers
 */
export class KeyboardHelper {
  constructor(private page: Page) {}

  async navigateWithTab(times = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.page.keyboard.press("Tab");
    }
  }

  async navigateBackWithShiftTab(times = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      await this.page.keyboard.press("Shift+Tab");
    }
  }

  async submitWithEnter(): Promise<void> {
    await this.page.keyboard.press("Enter");
  }

  async pressEscape(): Promise<void> {
    await this.page.keyboard.press("Escape");
  }

  async verifyFocusedElement(selector: string): Promise<void> {
    const focusedElement = await this.page.locator(selector);
    await expect(focusedElement).toBeFocused();
  }
}

/**
 * Document Upload Helpers
 */
export class DocumentUploadHelper {
  constructor(private page: Page) {}

  async uploadDocument(documentType: string, filePath: string): Promise<void> {
    const uploadButton = this.page.locator(`[data-document-type="${documentType}"]`);
    const fileInput = uploadButton.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);
  }

  async verifyDocumentUploaded(documentName: string): Promise<void> {
    const uploadedDoc = this.page.locator('[data-testid="uploaded-document"]', {
      hasText: documentName,
    });
    await expect(uploadedDoc).toBeVisible();
  }

  async deleteDocument(documentName: string): Promise<void> {
    const deleteButton = this.page.locator(`[data-document="${documentName}"] button[aria-label*="delete"]`);
    await deleteButton.click();
  }

  async verifyDocumentDeleted(documentName: string): Promise<void> {
    const uploadedDoc = this.page.locator('[data-testid="uploaded-document"]', {
      hasText: documentName,
    });
    await expect(uploadedDoc).not.toBeVisible();
  }
}

/**
 * Dependent Management Helpers (Step 2)
 */
export class DependentHelper {
  constructor(private page: Page) {}

  async addDependent(data: {
    nome: string;
    cpf: string;
    dataNascimento: string;
    parentesco: string;
  }): Promise<void> {
    await this.page.getByRole("button", { name: /adicionar dependente/i }).click();

    await this.page.locator('[name="nome"]').fill(data.nome);
    await this.page.locator('[name="cpf"]').fill(data.cpf);
    await this.page.locator('[name="dataNascimento"]').fill(data.dataNascimento);
    await this.page.locator('[name="parentesco"]').selectOption(data.parentesco);

    await this.page.getByRole("button", { name: /salvar dependente/i }).click();
  }

  async removeDependent(index: number): Promise<void> {
    const removeButtons = this.page.locator('[aria-label*="remover dependente"]');
    await removeButtons.nth(index).click();
  }

  async verifyDependentCount(count: number): Promise<void> {
    const dependents = this.page.locator('[data-testid="dependent-item"]');
    await expect(dependents).toHaveCount(count);
  }
}

/**
 * Transport Line Helpers (Step 6)
 */
export class TransportHelper {
  constructor(private page: Page) {}

  async addTransportLine(data: {
    tipo: string;
    linha: string;
    tarifa: string;
  }): Promise<void> {
    await this.page.getByRole("button", { name: /adicionar linha/i }).click();

    await this.page.locator('[name="tipo"]').selectOption(data.tipo);
    await this.page.locator('[name="linha"]').fill(data.linha);
    await this.page.locator('[name="tarifa"]').fill(data.tarifa);

    await this.page.getByRole("button", { name: /salvar linha/i }).click();
  }

  async removeTransportLine(index: number): Promise<void> {
    const removeButtons = this.page.locator('[aria-label*="remover linha"]');
    await removeButtons.nth(index).click();
  }

  async verifyTransportLineCount(count: number): Promise<void> {
    const lines = this.page.locator('[data-testid="transport-line-item"]');
    await expect(lines).toHaveCount(count);
  }
}
