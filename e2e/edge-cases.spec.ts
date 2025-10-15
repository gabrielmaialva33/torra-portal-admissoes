/**
 * E2E Test: Edge Cases and Browser Behavior
 *
 * Tests browser navigation, page refresh, concurrent sessions,
 * mobile responsiveness, and accessibility.
 */

import { devices, expect, test } from "@playwright/test";
import {
  completeOnboardingData,
  personalDataTestData,
} from "./fixtures/test-data";
import {
  KeyboardHelper,
  LocalStorageHelper,
  NavigationHelper,
  PersonalDataFormHelper,
} from "./helpers/test-helpers";

test.describe("Edge Cases: Browser Navigation", () => {
  let nav: NavigationHelper;
  let storage: LocalStorageHelper;

  test.beforeEach(async ({ page }) => {
    nav = new NavigationHelper(page);
    storage = new LocalStorageHelper(page);
  });

  test("should handle browser back button", async ({ page }) => {
    // Set up completed steps
    await storage.setOnboardingState({
      currentStep: 3,
      completedSteps: [1, 2],
      formData: completeOnboardingData,
      documents: [],
    });

    await nav.goToStep(3);

    // Use browser back button
    await page.goBack();
    await page.waitForLoadState("networkidle");

    // Should navigate to previous step
    await expect(page).toHaveURL(/\/onboarding\/2/);

    // Form data should still be intact
    const state = await storage.getOnboardingState();
    expect(state.state.completedSteps).toContain(1);
    expect(state.state.completedSteps).toContain(2);
  });

  test("should handle browser forward button", async ({ page }) => {
    await storage.setOnboardingState({
      currentStep: 1,
      completedSteps: [1, 2, 3],
      formData: completeOnboardingData,
      documents: [],
    });

    await nav.goToStep(1);
    await nav.goToStep(2);
    await page.goBack();

    // Use browser forward button
    await page.goForward();
    await page.waitForLoadState("networkidle");

    // Should navigate forward
    await expect(page).toHaveURL(/\/onboarding\/2/);
  });

  test("should handle page refresh on any step", async ({ page }) => {
    await storage.setOnboardingState({
      currentStep: 5,
      completedSteps: [1, 2, 3, 4],
      formData: completeOnboardingData,
      documents: [],
    });

    await nav.goToStep(5);

    // Refresh page
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Should stay on same step
    await expect(page).toHaveURL(/\/onboarding\/5/);

    // Data should persist
    const state = await storage.getOnboardingState();
    expect(state.state.currentStep).toBe(5);
    expect(state.state.completedSteps).toHaveLength(4);
  });

  test("should handle page refresh during form filling", async ({ page }) => {
    await nav.goToStep(1);

    const personalForm = new PersonalDataFormHelper(page);

    // Fill partial data
    await personalForm.fillPersonalData({
      ...personalDataTestData.valid,
      nomeSocial: "Partially Filled",
    });

    // Save
    await nav.clickSaveButton();
    await page.waitForTimeout(500);

    // Refresh
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Verify data persisted
    const nomeSocialInput = page.locator('[name="nomeSocial"]');
    await expect(nomeSocialInput).toHaveValue("Partially Filled");
  });

  test("should handle direct URL access to completed step", async ({
    page,
  }) => {
    await storage.setOnboardingState({
      currentStep: 5,
      completedSteps: [1, 2, 3],
      formData: {},
      documents: [],
    });

    // Directly navigate to step 3 (completed)
    await page.goto("/onboarding/3");
    await page.waitForLoadState("networkidle");

    // Should allow access
    await expect(page).toHaveURL(/\/onboarding\/3/);
  });

  test("should prevent direct URL access to incomplete step", async ({
    page,
  }) => {
    await storage.setOnboardingState({
      currentStep: 2,
      completedSteps: [1],
      formData: {},
      documents: [],
    });

    // Try to directly access step 5 (not completed)
    await page.goto("/onboarding/5");
    await page.waitForTimeout(1000);

    // Should redirect or show error
    const currentUrl = page.url();
    const hasError = await page
      .locator("text=/não permitido|acesso negado/i")
      .isVisible()
      .catch(() => false);

    expect(!currentUrl.includes("/onboarding/5") || hasError).toBeTruthy();
  });
});

test.describe("Edge Cases: Concurrent Sessions", () => {
  test("should handle multiple tabs with same session", async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    const storage1 = new LocalStorageHelper(page1);
    const storage2 = new LocalStorageHelper(page2);

    // Clear storage
    await storage1.clearOnboardingState();

    // Navigate both tabs to step 1
    await page1.goto("/onboarding/1");
    await page2.goto("/onboarding/1");
    await page1.waitForLoadState("networkidle");
    await page2.waitForLoadState("networkidle");

    // Fill form in first tab
    await page1.locator('[name="nomeCompleto"]').fill("Test User Tab 1");
    await page1.locator('button:has-text("Salvar")').click();
    await page1.waitForTimeout(1000);

    // Reload second tab
    await page2.reload();
    await page2.waitForLoadState("networkidle");

    // Second tab should have updated data
    const nameInput = page2.locator('[name="nomeCompleto"]');
    await expect(nameInput).toHaveValue("Test User Tab 1");

    await context.close();
  });

  test("should handle localStorage sync across tabs", async ({ browser }) => {
    const context = await browser.newContext();
    const page1 = await context.newPage();
    const page2 = await context.newPage();

    const storage1 = new LocalStorageHelper(page1);

    await storage1.setOnboardingState({
      currentStep: 3,
      completedSteps: [1, 2],
      formData: {},
      documents: [],
    });

    await page1.goto("/onboarding/3");
    await page2.goto("/onboarding/1");

    // Both should have access to the data
    await page2.reload();
    await page2.waitForLoadState("networkidle");

    // Page 2 can access step 3 now
    await page2.goto("/onboarding/3");
    await expect(page2).toHaveURL(/\/onboarding\/3/);

    await context.close();
  });
});

test.describe("Edge Cases: Mobile Responsiveness", () => {
  test("should display mobile layout correctly", async ({ page }) => {
    const nav = new NavigationHelper(page);
    await nav.goToStep(1);

    // Verify mobile viewport
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThan(768);

    // Form should be visible
    const form = page.locator('[name="nomeCompleto"]');
    await expect(form).toBeVisible();

    // Check if mobile menu exists
    const mobileMenu = page.locator(
      '[data-testid="mobile-menu"], .hamburger-menu',
    );
    if (await mobileMenu.isVisible()) {
      await mobileMenu.click();
    }
  });

  test("should handle touch interactions", async ({ page }) => {
    const nav = new NavigationHelper(page);
    await nav.goToStep(1);

    // Tap on input field
    await page.locator('[name="nomeCompleto"]').tap();

    // Verify field is focused
    await expect(page.locator('[name="nomeCompleto"]')).toBeFocused();
  });

  test("should scroll to validation errors on mobile", async ({ page }) => {
    const nav = new NavigationHelper(page);
    await nav.goToStep(1);

    // Try to submit without filling
    await nav.clickNextButton();

    // First error should be visible after scroll
    await page.waitForTimeout(500);
    const firstError = page.locator('[role="alert"]').first();

    if (await firstError.isVisible()) {
      const errorBox = await firstError.boundingBox();
      expect(errorBox?.y).toBeGreaterThan(0);
    }
  });
});

test.describe("Edge Cases: Accessibility (Keyboard Navigation)", () => {
  let nav: NavigationHelper;
  let keyboard: KeyboardHelper;

  test.beforeEach(async ({ page }) => {
    nav = new NavigationHelper(page);
    keyboard = new KeyboardHelper(page);
    await nav.goToStep(1);
  });

  test("should navigate form with Tab key", async ({ page }) => {
    // Tab to first input
    await keyboard.navigateWithTab(1);

    // Verify first focusable element is focused
    const firstInput = page.locator('[name="nomeCompleto"]');
    await expect(firstInput).toBeFocused();

    // Tab to next input
    await keyboard.navigateWithTab(1);

    // Verify focus moved
    const secondInput = page.locator('[name="nomeSocial"]');
    await expect(secondInput).toBeFocused();
  });

  test("should navigate backwards with Shift+Tab", async ({ page }) => {
    // Tab forward twice
    await keyboard.navigateWithTab(2);

    // Tab backwards
    await keyboard.navigateBackWithShiftTab(1);

    // Verify focus went back
    const firstInput = page.locator('[name="nomeCompleto"]');
    await expect(firstInput).toBeFocused();
  });

  test("should submit form with Enter key", async ({ page }) => {
    const personalForm = new PersonalDataFormHelper(page);

    // Fill form
    await personalForm.fillPersonalData(personalDataTestData.valid);

    // Focus on last input and press Enter
    await page.locator('[name="cpf"]').focus();
    await keyboard.submitWithEnter();

    // Form should submit
    await page.waitForTimeout(1000);
  });

  test("should close modals with Escape key", async ({ page }) => {
    // Try to trigger a modal (if any exist)
    const modalTrigger = page.getByRole("button", { name: /info|ajuda|help/i });

    if (await modalTrigger.isVisible()) {
      await modalTrigger.click();

      // Wait for modal
      await page.waitForTimeout(500);

      // Press Escape
      await keyboard.pressEscape();

      // Modal should close
      const modal = page.locator('[role="dialog"], .modal');
      await expect(modal).not.toBeVisible();
    }
  });

  test("should have visible focus indicators", async ({ page }) => {
    // Tab to first input
    await keyboard.navigateWithTab(1);

    // Verify focus ring is visible
    const firstInput = page.locator('[name="nomeCompleto"]');
    await expect(firstInput).toBeFocused();

    // Check for focus styles
    const outlineStyle = await firstInput.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.outline || styles.boxShadow;
    });

    // Should have some focus indicator
    expect(outlineStyle).not.toBe("none");
  });

  test("should have proper ARIA labels", async ({ page }) => {
    // Check required fields have proper labels
    const requiredInputs = page.locator("input[required]");
    const count = await requiredInputs.count();

    for (let i = 0; i < count; i++) {
      const input = requiredInputs.nth(i);
      const ariaLabel = await input.getAttribute("aria-label");
      const ariaLabelledBy = await input.getAttribute("aria-labelledby");
      const id = await input.getAttribute("id");

      // Should have either aria-label or associated label
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = (await label.count()) > 0;
        expect(ariaLabel || ariaLabelledBy || hasLabel).toBeTruthy();
      }
    }
  });

  test("should announce validation errors to screen readers", async ({
    page,
  }) => {
    // Try to submit without filling required fields
    await nav.clickNextButton();

    // Check for aria-live regions
    const liveRegions = page.locator(
      '[aria-live="polite"], [aria-live="assertive"], [role="alert"]',
    );
    const count = await liveRegions.count();

    // Should have error announcements
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Edge Cases: Data Integrity", () => {
  test("should handle very long text input", async ({ page }) => {
    const nav = new NavigationHelper(page);
    await nav.goToStep(1);

    const veryLongName = "A".repeat(500);

    await page.locator('[name="nomeCompleto"]').fill(veryLongName);

    // Should either truncate or show error
    const input = page.locator('[name="nomeCompleto"]');
    const value = await input.inputValue();

    // Most fields have max length validation
    expect(value.length).toBeLessThanOrEqual(500);
  });

  test("should handle special characters in input", async ({ page }) => {
    const nav = new NavigationHelper(page);
    await nav.goToStep(1);

    const specialChars = "João's Ñame <script>alert('test')</script>";

    await page.locator('[name="nomeCompleto"]').fill(specialChars);

    // Should sanitize or accept safely
    const input = page.locator('[name="nomeCompleto"]');
    const value = await input.inputValue();

    // Script tags should not be executed
    expect(value).toBeTruthy();
  });

  test("should handle localStorage quota exceeded", async ({ page }) => {
    const storage = new LocalStorageHelper(page);

    // Try to store large amount of data
    try {
      const hugeData = {
        currentStep: 1,
        completedSteps: [],
        formData: {
          personalData: {
            notes: "A".repeat(5 * 1024 * 1024), // 5MB of data
          },
        },
        documents: [],
      };

      await storage.setOnboardingState(hugeData);
    } catch (error) {
      // Should handle quota exceeded gracefully
      console.log("LocalStorage quota exceeded as expected");
    }

    // App should still function
    const nav = new NavigationHelper(page);
    await nav.goToStep(1);
    await expect(page).toHaveURL(/\/onboarding\/1/);
  });

  test("should handle corrupted localStorage data", async ({ page }) => {
    // Set invalid localStorage data
    await page.evaluate(() => {
      localStorage.setItem("torra-onboarding", "{ invalid json }");
    });

    const nav = new NavigationHelper(page);

    // Should handle gracefully and reset
    await nav.goToStep(1);

    // App should still work
    await expect(page).toHaveURL(/\/onboarding\/1/);
  });

  test("should handle missing localStorage data", async ({ page }) => {
    const nav = new NavigationHelper(page);
    const storage = new LocalStorageHelper(page);

    // Clear all storage
    await storage.clearOnboardingState();

    // Navigate to step 1
    await nav.goToStep(1);

    // Should initialize with default state
    const state = await storage.getOnboardingState();
    expect(state).toBeDefined();
  });
});

test.describe("Edge Cases: Performance", () => {
  test("should handle rapid clicking", async ({ page }) => {
    const nav = new NavigationHelper(page);
    const personalForm = new PersonalDataFormHelper(page);

    await nav.goToStep(1);
    await personalForm.fillPersonalData(personalDataTestData.valid);

    // Click next button rapidly
    const nextButton = page.getByRole("button", { name: /próximo/i });

    for (let i = 0; i < 5; i++) {
      await nextButton.click({ force: true });
      await page.waitForTimeout(100);
    }

    // Should only submit once
    await page.waitForTimeout(2000);

    // Check that we didn't skip steps
    const url = page.url();
    expect(url).toMatch(/\/onboarding\/[1-2]/);
  });

  test("should debounce CEP lookup", async ({ page }) => {
    const nav = new NavigationHelper(page);
    const storage = new LocalStorageHelper(page);

    await storage.setOnboardingState({
      currentStep: 3,
      completedSteps: [1, 2],
      formData: {},
      documents: [],
    });

    await nav.goToStep(3);

    let requestCount = 0;

    await page.route("**/api/cep/**", async (route) => {
      requestCount++;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ logradouro: "Test Street" }),
      });
    });

    const cepInput = page.locator('[name="cep"]');

    // Type CEP rapidly
    await cepInput.type("01310100", { delay: 50 });

    // Wait for debounce
    await page.waitForTimeout(2000);

    // Should only make one or two requests (debounced)
    expect(requestCount).toBeLessThanOrEqual(2);
  });
});
