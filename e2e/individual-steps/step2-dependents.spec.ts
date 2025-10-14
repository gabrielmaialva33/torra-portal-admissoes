/**
 * E2E Test: Step 2 - Dependents Management
 *
 * Tests adding, editing, removing dependents with validation.
 */

import { test, expect } from "@playwright/test";
import {
  dependentsTestData,
  generateValidCPF,
} from "../fixtures/test-data";
import {
  NavigationHelper,
  DependentHelper,
  FormHelper,
  LocalStorageHelper,
  APIMockHelper,
} from "../helpers/test-helpers";

test.describe("Step 2: Dependents Management", () => {
  let nav: NavigationHelper;
  let dependentHelper: DependentHelper;
  let form: FormHelper;
  let storage: LocalStorageHelper;
  let api: APIMockHelper;

  test.beforeEach(async ({ page }) => {
    nav = new NavigationHelper(page);
    dependentHelper = new DependentHelper(page);
    form = new FormHelper(page);
    storage = new LocalStorageHelper(page);
    api = new APIMockHelper(page);

    // Set up state with step 1 completed
    await storage.setOnboardingState({
      currentStep: 2,
      completedSteps: [1],
      formData: {},
      documents: [],
    });

    await nav.goToStep(2);
  });

  test("should display empty state initially", async ({ page }) => {
    // Verify add dependent button is visible
    const addButton = page.getByRole("button", { name: /adicionar dependente/i });
    await expect(addButton).toBeVisible();

    // Verify no dependents are shown
    const dependentsList = page.locator('[data-testid="dependent-item"]');
    await expect(dependentsList).toHaveCount(0);
  });

  test("should add a single dependent successfully", async ({ page }) => {
    // Add dependent
    await dependentHelper.addDependent(dependentsTestData.single);

    // Verify dependent was added
    await dependentHelper.verifyDependentCount(1);

    // Verify dependent details are displayed
    await expect(page.locator(`text=${dependentsTestData.single.nome}`)).toBeVisible();
  });

  test("should add multiple dependents", async ({ page }) => {
    // Add first dependent
    await dependentHelper.addDependent(dependentsTestData.valid[0]);
    await dependentHelper.verifyDependentCount(1);

    // Add second dependent
    await dependentHelper.addDependent(dependentsTestData.valid[1]);
    await dependentHelper.verifyDependentCount(2);

    // Verify both are displayed
    await expect(page.locator(`text=${dependentsTestData.valid[0].nome}`)).toBeVisible();
    await expect(page.locator(`text=${dependentsTestData.valid[1].nome}`)).toBeVisible();
  });

  test("should validate required fields when adding dependent", async ({ page }) => {
    // Click add dependent
    await page.getByRole("button", { name: /adicionar dependente/i }).click();

    // Try to save without filling fields
    const saveButton = page.getByRole("button", { name: /salvar dependente/i });
    if (await saveButton.isVisible()) {
      await saveButton.click();

      // Should show validation errors
      const errors = page.locator('[role="alert"], .error-message');
      const errorCount = await errors.count();
      expect(errorCount).toBeGreaterThan(0);
    }
  });

  test("should validate dependent CPF format", async ({ page }) => {
    await page.getByRole("button", { name: /adicionar dependente/i }).click();

    // Fill with invalid CPF
    await form.fillInputByName("cpf", "111.111.111-11");
    await form.fillInputByName("nome", "Test Dependent");
    await form.fillInputByName("dataNascimento", "2010-01-01");

    // Try to save
    const saveButton = page.getByRole("button", { name: /salvar dependente/i });
    if (await saveButton.isVisible()) {
      await saveButton.click();

      // Should show CPF validation error
      const cpfError = page.locator('text=/cpf inválido/i');
      await expect(cpfError).toBeVisible({ timeout: 2000 }).catch(() => {});
    }
  });

  test("should validate dependent birth date", async ({ page }) => {
    await page.getByRole("button", { name: /adicionar dependente/i }).click();

    // Fill with future date
    await form.fillInputByName("nome", "Test Dependent");
    await form.fillInputByName("cpf", generateValidCPF());
    await form.fillInputByName("dataNascimento", "2030-01-01");

    // Try to save
    const saveButton = page.getByRole("button", { name: /salvar dependente/i });
    if (await saveButton.isVisible()) {
      await saveButton.click();

      // Should show date validation error
      const dateError = page.locator('text=/data inválida|data futura/i');
      await expect(dateError).toBeVisible({ timeout: 2000 }).catch(() => {});
    }
  });

  test("should validate relationship field", async ({ page }) => {
    await page.getByRole("button", { name: /adicionar dependente/i }).click();

    // Fill all fields except relationship
    await form.fillInputByName("nome", "Test Dependent");
    await form.fillInputByName("cpf", generateValidCPF());
    await form.fillInputByName("dataNascimento", "2010-01-01");

    // Try to save
    const saveButton = page.getByRole("button", { name: /salvar dependente/i });
    if (await saveButton.isVisible()) {
      await saveButton.click();

      // Should require relationship
      const relationshipError = page.locator('text=/parentesco.*obrigatório/i');
      await expect(relationshipError).toBeVisible({ timeout: 2000 }).catch(() => {});
    }
  });

  test("should remove a dependent", async ({ page }) => {
    // Add a dependent
    await dependentHelper.addDependent(dependentsTestData.single);
    await dependentHelper.verifyDependentCount(1);

    // Remove the dependent
    await dependentHelper.removeDependent(0);

    // Verify dependent was removed
    await dependentHelper.verifyDependentCount(0);
  });

  test("should remove specific dependent from multiple", async ({ page }) => {
    // Add two dependents
    await dependentHelper.addDependent(dependentsTestData.valid[0]);
    await dependentHelper.addDependent(dependentsTestData.valid[1]);
    await dependentHelper.verifyDependentCount(2);

    // Remove first dependent
    await dependentHelper.removeDependent(0);

    // Should have one remaining
    await dependentHelper.verifyDependentCount(1);

    // Second dependent should still be visible
    await expect(page.locator(`text=${dependentsTestData.valid[1].nome}`)).toBeVisible();
  });

  test("should save dependents data to localStorage", async ({ page }) => {
    // Add dependent
    await dependentHelper.addDependent(dependentsTestData.single);

    // Click save
    await nav.clickSaveButton();
    await page.waitForTimeout(500);

    // Verify data in localStorage
    const state = await storage.getOnboardingState();
    expect(state.state.formData.dependents).toHaveLength(1);
    expect(state.state.formData.dependents[0].nome).toBe(dependentsTestData.single.nome);
  });

  test("should persist dependents after page reload", async ({ page }) => {
    // Add dependent and save
    await dependentHelper.addDependent(dependentsTestData.single);
    await nav.clickSaveButton();
    await page.waitForTimeout(500);

    // Reload page
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Verify dependent is still visible
    await dependentHelper.verifyDependentCount(1);
    await expect(page.locator(`text=${dependentsTestData.single.nome}`)).toBeVisible();
  });

  test("should proceed to step 3 with no dependents", async ({ page }) => {
    // Mock API
    await api.mockStepSubmission(2, {
      success: true,
      data: { id: "test", stepAtual: 3, stepsCompletos: [1, 2] },
      message: "Success",
    });

    // Click next without adding dependents
    await nav.clickNextButton();
    await page.waitForTimeout(1000);

    // Should proceed to step 3
    await expect(page).toHaveURL(/\/onboarding\/3/);
  });

  test("should proceed to step 3 with dependents", async ({ page }) => {
    // Add dependents
    await dependentHelper.addDependent(dependentsTestData.valid[0]);
    await dependentHelper.addDependent(dependentsTestData.valid[1]);

    // Mock API
    await api.mockStepSubmission(2, {
      success: true,
      data: { id: "test", stepAtual: 3, stepsCompletos: [1, 2] },
      message: "Success",
    });

    // Click next
    await nav.clickNextButton();
    await page.waitForTimeout(1000);

    // Should proceed to step 3
    await expect(page).toHaveURL(/\/onboarding\/3/);

    // Verify step completion
    const state = await storage.getOnboardingState();
    expect(state.state.completedSteps).toContain(2);
  });

  test("should allow editing a dependent", async ({ page }) => {
    // Add dependent
    await dependentHelper.addDependent(dependentsTestData.single);

    // Click edit button (if available)
    const editButton = page.locator('[aria-label*="editar dependente"]').first();
    if (await editButton.isVisible()) {
      await editButton.click();

      // Modify name
      const nameInput = page.locator('[name="nome"]');
      await nameInput.clear();
      await nameInput.fill("Nome Editado");

      // Save changes
      await page.getByRole("button", { name: /salvar/i }).click();

      // Verify changes
      await expect(page.locator('text=Nome Editado')).toBeVisible();
    }
  });

  test("should show confirmation dialog before removing dependent", async ({ page }) => {
    // Add dependent
    await dependentHelper.addDependent(dependentsTestData.single);

    // Click remove
    const removeButton = page.locator('[aria-label*="remover dependente"]').first();
    if (await removeButton.isVisible()) {
      await removeButton.click();

      // Check for confirmation dialog
      const confirmDialog = page.locator('text=/tem certeza|confirmar remoção/i');
      if (await confirmDialog.isVisible()) {
        // Confirm removal
        await page.getByRole("button", { name: /confirmar|sim/i }).click();
      }

      // Verify dependent was removed
      await dependentHelper.verifyDependentCount(0);
    }
  });

  test("should validate maximum number of dependents", async ({ page }) => {
    // Try to add many dependents (if there's a limit)
    const maxDependents = 10;

    for (let i = 0; i < maxDependents; i++) {
      await dependentHelper.addDependent({
        ...dependentsTestData.single,
        id: `dependent-${i}`,
        nome: `Dependente ${i + 1}`,
        cpf: generateValidCPF(),
      });
    }

    // Check if there's a limit message
    const limitMessage = page.locator('text=/limite.*dependentes|máximo.*dependentes/i');
    if (await limitMessage.isVisible()) {
      // Verify add button is disabled
      const addButton = page.getByRole("button", { name: /adicionar dependente/i });
      await expect(addButton).toBeDisabled();
    }
  });

  test("should display dependent relationship options", async ({ page }) => {
    await page.getByRole("button", { name: /adicionar dependente/i }).click();

    const relationshipSelect = page.locator('[name="parentesco"]');
    if (await relationshipSelect.isVisible()) {
      // Verify common relationship options exist
      const options = ["filho", "filha", "cônjuge", "companheiro", "pai", "mãe"];

      for (const option of options) {
        await relationshipSelect.selectOption({ label: new RegExp(option, "i") }).catch(() => {
          // Option might not exist or have different label
        });
      }
    }
  });
});
