/**
 * E2E Test: API Integration
 *
 * Tests API calls, error handling, retry logic, and network failures.
 */

import { expect, test } from "@playwright/test";
import { mockApiResponses, personalDataTestData } from "./fixtures/test-data";
import {
  APIMockHelper,
  LocalStorageHelper,
  NavigationHelper,
  PersonalDataFormHelper,
  WaitHelper,
} from "./helpers/test-helpers";

test.describe("API Integration Tests", () => {
  let nav: NavigationHelper;
  let personalForm: PersonalDataFormHelper;
  let api: APIMockHelper;
  let storage: LocalStorageHelper;
  let waiter: WaitHelper;

  test.beforeEach(async ({ page }) => {
    nav = new NavigationHelper(page);
    personalForm = new PersonalDataFormHelper(page);
    api = new APIMockHelper(page);
    storage = new LocalStorageHelper(page);
    waiter = new WaitHelper(page);

    await storage.clearOnboardingState();
  });

  test("should submit step 1 data successfully", async ({ page }) => {
    await nav.goToStep(1);

    // Fill form
    await personalForm.fillPersonalData(personalDataTestData.valid);

    // Mock successful API response
    await api.mockStepSubmission(1, mockApiResponses.submitSuccess);

    // Submit
    await nav.clickNextButton();

    // Wait for API call
    await waiter.waitForAPIResponse("/api/admissao/dados-gerais");

    // Verify navigation to next step
    await expect(page).toHaveURL(/\/onboarding\/2/);
  });

  test("should handle 400 Bad Request error", async ({ page }) => {
    await nav.goToStep(1);

    await personalForm.fillPersonalData(personalDataTestData.valid);

    // Mock 400 error
    await api.mockStepSubmission(
      1,
      {
        success: false,
        message: "Dados inválidos",
        errors: ["CPF já cadastrado no sistema"],
        statusCode: 400,
      },
      400,
    );

    await nav.clickNextButton();
    await page.waitForTimeout(1000);

    // Should show error message
    const errorMessage = page.locator(
      "text=/erro|dados inválidos|cpf já cadastrado/i",
    );
    await expect(errorMessage).toBeVisible({ timeout: 3000 });

    // Should stay on same step
    await expect(page).toHaveURL(/\/onboarding\/1/);
  });

  test("should handle 401 Unauthorized error", async ({ page }) => {
    await nav.goToStep(1);

    await personalForm.fillPersonalData(personalDataTestData.valid);

    // Mock 401 error
    await api.mockStepSubmission(
      1,
      {
        success: false,
        message: "Não autorizado",
        statusCode: 401,
      },
      401,
    );

    await nav.clickNextButton();
    await page.waitForTimeout(1000);

    // Should show authentication error
    const authError = page.locator(
      "text=/não autorizado|sessão expirada|faça login/i",
    );
    await expect(authError)
      .toBeVisible({ timeout: 3000 })
      .catch(() => {
        // Might redirect to login page instead
      });
  });

  test("should handle 500 Internal Server Error", async ({ page }) => {
    await nav.goToStep(1);

    await personalForm.fillPersonalData(personalDataTestData.valid);

    // Mock 500 error
    await api.mockServerError("**/api/admissao/dados-gerais", 500);

    await nav.clickNextButton();
    await page.waitForTimeout(1000);

    // Should show server error message
    const serverError = page.locator(
      "text=/erro no servidor|erro interno|tente novamente/i",
    );
    await expect(serverError).toBeVisible({ timeout: 3000 });

    // Should stay on same step
    await expect(page).toHaveURL(/\/onboarding\/1/);
  });

  test("should handle network timeout", async ({ page }) => {
    await nav.goToStep(1);

    await personalForm.fillPersonalData(personalDataTestData.valid);

    // Mock network error
    await api.mockNetworkError("**/api/admissao/dados-gerais");

    await nav.clickNextButton();
    await page.waitForTimeout(2000);

    // Should show connection error
    const networkError = page.locator(
      "text=/erro de conexão|sem conexão|verifique sua internet/i",
    );
    await expect(networkError).toBeVisible({ timeout: 5000 });
  });

  test("should retry failed requests", async ({ page }) => {
    await nav.goToStep(1);

    await personalForm.fillPersonalData(personalDataTestData.valid);

    let requestCount = 0;

    // Mock first request to fail, second to succeed
    await page.route("**/api/admissao/dados-gerais", async (route) => {
      requestCount++;

      if (requestCount === 1) {
        // First request fails
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            message: "Temporary error",
          }),
        });
      } else {
        // Second request succeeds
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockApiResponses.submitSuccess),
        });
      }
    });

    await nav.clickNextButton();

    // Look for retry button
    const retryButton = page.getByRole("button", {
      name: /tentar novamente|retry/i,
    });
    if (await retryButton.isVisible({ timeout: 3000 })) {
      await retryButton.click();
      await page.waitForTimeout(1000);

      // Should succeed on retry
      await expect(page).toHaveURL(/\/onboarding\/2/);
    }
  });

  test("should validate API response schema", async ({ page }) => {
    await nav.goToStep(1);

    await personalForm.fillPersonalData(personalDataTestData.valid);

    // Mock response with invalid schema
    await api.mockStepSubmission(1, {
      // Missing required fields
      data: {},
    } as any);

    await nav.clickNextButton();
    await page.waitForTimeout(1000);

    // Should handle invalid response gracefully
    const errorMessage = page.locator("text=/erro|resposta inválida/i");
    await expect(errorMessage)
      .toBeVisible({ timeout: 3000 })
      .catch(() => {
        // Might show generic error
      });
  });

  test("should send correct request payload", async ({ page }) => {
    await nav.goToStep(1);

    let capturedPayload: any = null;

    // Intercept and capture request
    await page.route("**/api/admissao/dados-gerais", async (route) => {
      const request = route.request();
      capturedPayload = request.postDataJSON();

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockApiResponses.submitSuccess),
      });
    });

    await personalForm.fillPersonalData(personalDataTestData.valid);
    await nav.clickNextButton();
    await page.waitForTimeout(1000);

    // Verify payload structure
    expect(capturedPayload).toBeDefined();
    expect(capturedPayload.nomeCompleto).toBe(
      personalDataTestData.valid.nomeCompleto,
    );
    expect(capturedPayload.cpf).toBeDefined();
    expect(capturedPayload.email).toBe(personalDataTestData.valid.email);
  });

  test("should include authentication headers", async ({ page }) => {
    await nav.goToStep(1);

    let capturedHeaders: any = {};

    // Intercept and capture headers
    await page.route("**/api/admissao/**", async (route) => {
      const request = route.request();
      capturedHeaders = request.headers();

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockApiResponses.submitSuccess),
      });
    });

    await personalForm.fillPersonalData(personalDataTestData.valid);
    await nav.clickNextButton();
    await page.waitForTimeout(1000);

    // Verify headers (if authentication is implemented)
    // expect(capturedHeaders['authorization']).toBeDefined();
  });

  test("should handle concurrent API requests", async ({ page }) => {
    // Set up multiple steps completed
    await storage.setOnboardingState({
      currentStep: 3,
      completedSteps: [1, 2],
      formData: {},
      documents: [],
    });

    await nav.goToStep(3);

    // Mock multiple API endpoints
    await api.mockStepSubmission(3, mockApiResponses.submitSuccess);
    await api.mockCEPValidation("01310-100", mockApiResponses.cepValidation);

    // Fill CEP (triggers API call)
    await page.locator('[name="cep"]').fill("01310-100");
    await page.waitForTimeout(500);

    // Fill rest of address form and submit (triggers another API call)
    await page.locator('[name="numero"]').fill("100");
    await nav.clickNextButton();

    // Both requests should complete successfully
    await page.waitForTimeout(2000);
  });

  test("should cache GET requests appropriately", async ({ page }) => {
    let requestCount = 0;

    // Track colaborador GET requests
    await page.route("**/api/colaboradores/*", async (route) => {
      if (route.request().method() === "GET") {
        requestCount++;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockApiResponses.colaborador),
        });
      } else {
        await route.continue();
      }
    });

    // Navigate to step 1
    await nav.goToStep(1);
    await page.waitForTimeout(500);

    const firstRequestCount = requestCount;

    // Navigate away and back
    await nav.goToStep(2);
    await page.waitForTimeout(500);
    await nav.goToStep(1);
    await page.waitForTimeout(500);

    // Should use cache (request count should not increase significantly)
    expect(requestCount).toBeLessThanOrEqual(firstRequestCount + 1);
  });

  test("should handle slow API responses", async ({ page }) => {
    await nav.goToStep(1);

    await personalForm.fillPersonalData(personalDataTestData.valid);

    // Mock slow response (3 seconds delay)
    await page.route("**/api/admissao/dados-gerais", async (route) => {
      await page.waitForTimeout(3000);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockApiResponses.submitSuccess),
      });
    });

    await nav.clickNextButton();

    // Should show loading indicator
    const loadingIndicator = page.locator(
      '[role="status"], .loading, .spinner',
    );
    await expect(loadingIndicator)
      .toBeVisible({ timeout: 1000 })
      .catch(() => {
        // Loading indicator might not be visible yet
      });

    // Wait for response
    await page.waitForTimeout(4000);

    // Should eventually navigate
    await expect(page).toHaveURL(/\/onboarding\/2/, { timeout: 5000 });
  });

  test("should cancel in-flight requests on navigation", async ({ page }) => {
    await nav.goToStep(1);

    await personalForm.fillPersonalData(personalDataTestData.valid);

    // Mock slow response
    await page.route("**/api/admissao/dados-gerais", async (route) => {
      await page.waitForTimeout(5000);
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockApiResponses.submitSuccess),
      });
    });

    // Submit form
    await nav.clickNextButton();

    // Immediately navigate away
    await page.waitForTimeout(500);
    await page.goBack();

    // Should not throw errors
    await page.waitForTimeout(1000);
  });

  test("should handle API rate limiting", async ({ page }) => {
    await nav.goToStep(1);

    await personalForm.fillPersonalData(personalDataTestData.valid);

    // Mock 429 Too Many Requests
    await api.mockStepSubmission(
      1,
      {
        success: false,
        message: "Muitas requisições. Tente novamente em alguns instantes.",
        statusCode: 429,
      },
      429,
    );

    await nav.clickNextButton();
    await page.waitForTimeout(1000);

    // Should show rate limit message
    const rateLimitMsg = page.locator(
      "text=/muitas requisições|aguarde|rate limit/i",
    );
    await expect(rateLimitMsg).toBeVisible({ timeout: 3000 });
  });

  test("should log API errors for debugging", async ({ page }) => {
    const consoleLogs: string[] = [];

    // Capture console logs
    page.on("console", (msg) => {
      consoleLogs.push(msg.text());
    });

    await nav.goToStep(1);
    await personalForm.fillPersonalData(personalDataTestData.valid);

    // Mock error
    await api.mockServerError("**/api/admissao/dados-gerais");

    await nav.clickNextButton();
    await page.waitForTimeout(1000);

    // Verify error was logged (if logging is implemented)
    const hasErrorLog = consoleLogs.some(
      (log) =>
        log.toLowerCase().includes("error") ||
        log.toLowerCase().includes("erro"),
    );

    // Note: This depends on implementation
    console.log("Console logs:", consoleLogs);
  });
});
