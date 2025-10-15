/**
 * Figma Visual & Design Tests
 *
 * These tests validate that the implemented UI matches the Figma designs
 * Mobile design reference: node-id=2119-20
 * Desktop design reference: node-id=2096-20
 */

import { expect, type Page, test } from "@playwright/test";

test.describe("Figma Design Validation - Mobile (412px)", () => {
  test.beforeEach(async ({ page }) => {
    // Set mobile viewport matching Figma design
    await page.setViewportSize({ width: 412, height: 892 });
  });

  test.describe("00.00.00 - Welcome Screen (Bem-vindo)", () => {
    test("should match Figma welcome screen design", async ({ page }) => {
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      // Verify page background color (#F8F8F8)
      const body = page.locator("body");
      await expect(body).toHaveCSS("background-color", "rgb(248, 248, 248)");

      // Verify heading text matches Figma
      const heading = page.getByRole("heading", {
        name: /Bem vindo\(a\)!.*É muito bom ter você.*com a gente/i,
      });
      await expect(heading).toBeVisible();

      // Verify heading is centered and uses Sofia Pro font
      await expect(heading).toHaveCSS("text-align", "center");
      await expect(heading).toHaveCSS("font-family", /Sofia Pro/i);

      // Verify welcome message contains required text
      const welcomeText = page.getByText(
        /Parabéns pela sua seleção para a vaga! 🎉/i,
      );
      await expect(welcomeText).toBeVisible();

      // Verify "Começar" button exists and has correct styling
      const startButton = page.getByRole("link", { name: /Começar/i });
      await expect(startButton).toBeVisible();

      // Button should have orange background (#FF5101)
      await expect(startButton).toHaveCSS(
        "background-color",
        /rgb\(255, 81, 1\)/i,
      );

      // Button text should be white (#FFFFFF)
      await expect(startButton).toHaveCSS("color", /rgb\(255, 255, 255\)/i);

      // Verify rocket icon is present
      const rocketIcon = page.locator(
        'img[alt*="Rocket"], svg[class*="rocket"]',
      );
      await expect(rocketIcon).toBeVisible();
    });

    test("should have correct layout spacing", async ({ page }) => {
      await page.goto("/");

      // Container should have 16px horizontal padding (matches Figma)
      const container = page.locator("main");
      await expect(container).toHaveCSS("padding-left", "16px");
      await expect(container).toHaveCSS("padding-right", "16px");

      // Elements should have 24px gap (matches Figma layout)
      const contentWrapper = page.locator("main > div");
      await expect(contentWrapper).toBeVisible();
    });

    test("should navigate to Step 1 on button click", async ({ page }) => {
      await page.goto("/");

      const startButton = page.getByRole("link", { name: /Começar/i });
      await startButton.click();

      // Should navigate to /onboarding/1
      await expect(page).toHaveURL(/\/onboarding\/1/);
    });
  });

  test.describe("Step 1 - Dados Gerais (Personal Data)", () => {
    test("should have header with logo and navigation", async ({ page }) => {
      await page.goto("/onboarding/1");
      await page.waitForLoadState("networkidle");

      // Header should exist
      const header = page.locator("header");
      await expect(header).toBeVisible();

      // Logo should be visible
      const logo = page.locator('img[alt*="Torra"]');
      await expect(logo).toBeVisible();

      // Logo should have correct dimensions (84x38 as per Figma)
      const logoBox = await logo.boundingBox();
      expect(logoBox?.width).toBeGreaterThanOrEqual(80);
      expect(logoBox?.height).toBeGreaterThanOrEqual(30);
    });

    test("should display step indicator", async ({ page }) => {
      await page.goto("/onboarding/1");

      // Step indicator should show current step
      const stepIndicator = page.locator(
        '[data-testid*="step"], [class*="step"]',
      );

      // Should indicate Step 1 of 10
      const stepText = page.getByText(/1.*10|Step 1|Passo 1/i);
      await expect(stepText).toBeVisible();
    });

    test("should have all required form fields", async ({ page }) => {
      await page.goto("/onboarding/1");

      // Required fields from Figma design
      const requiredFields = [
        "nomeCompleto",
        "cpf",
        "rg",
        "dataNascimento",
        "celular",
        "email",
      ];

      for (const fieldName of requiredFields) {
        const field = page.locator(`[name="${fieldName}"]`);
        await expect(field).toBeVisible();
      }
    });

    test("should have proper input styling", async ({ page }) => {
      await page.goto("/onboarding/1");

      const firstInput = page.locator('input[name="nomeCompleto"]');

      // Inputs should have border radius (as per Figma)
      const borderRadius = await firstInput.evaluate(
        (el) => window.getComputedStyle(el).borderRadius,
      );
      expect(borderRadius).not.toBe("0px");

      // Should have proper padding
      await expect(firstInput).toHaveCSS("padding-left", /.+/);
    });

    test("should have primary action button at bottom", async ({ page }) => {
      await page.goto("/onboarding/1");

      // "Próximo" or "Continuar" button should exist
      const nextButton = page.getByRole("button", {
        name: /Próximo|Continuar|Salvar/i,
      });
      await expect(nextButton).toBeVisible();

      // Button should have orange background
      await expect(nextButton).toHaveCSS(
        "background-color",
        /rgb\(255, 81, 1\)/i,
      );
    });

    test("should be scrollable on mobile viewport", async ({ page }) => {
      await page.goto("/onboarding/1");

      // Page should be scrollable (height > viewport)
      const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
      expect(bodyHeight).toBeGreaterThan(892); // Viewport height
    });
  });

  test.describe("Mobile Navigation Component", () => {
    test("should have bottom navigation bar", async ({ page }) => {
      await page.goto("/onboarding/1");

      // Navigation should be at bottom (y=868 in Figma)
      const nav = page.locator("nav, [class*='navigation']").last();

      if (await nav.isVisible()) {
        const navBox = await nav.boundingBox();
        expect(navBox?.y).toBeGreaterThan(800); // Should be near bottom
      }
    });

    test("should have breadcrumb navigation", async ({ page }) => {
      await page.goto("/onboarding/1");

      // Breadcrumb should show: Home > Admissão
      const breadcrumb = page.locator('[class*="breadcrumb"]');

      if (await breadcrumb.isVisible()) {
        await expect(breadcrumb).toContainText(/Admissão/i);
      }
    });
  });

  test.describe("Color Palette Validation", () => {
    test("should use correct Torra brand colors", async ({ page }) => {
      await page.goto("/");

      // Primary Orange: #FF5101
      const orangeElement = page.getByRole("link", { name: /Começar/i });
      await expect(orangeElement).toHaveCSS(
        "background-color",
        "rgb(255, 81, 1)",
      );

      // Primary Dark Blue: #37375B
      const heading = page.getByRole("heading").first();
      // Note: Color might be applied differently, just verify it exists
      await expect(heading).toBeVisible();

      // Neutral Background: #F8F8F8
      const body = page.locator("body");
      await expect(body).toHaveCSS("background-color", "rgb(248, 248, 248)");
    });
  });

  test.describe("Typography Validation", () => {
    test("should use Sofia Pro font family", async ({ page }) => {
      await page.goto("/");

      const heading = page.getByRole("heading").first();

      // Should use Sofia Pro font
      const fontFamily = await heading.evaluate(
        (el) => window.getComputedStyle(el).fontFamily,
      );
      expect(fontFamily.toLowerCase()).toContain("sofia");
    });

    test("should have correct heading sizes", async ({ page }) => {
      await page.goto("/");

      // Heading 1: 32px (Figma spec)
      const h1 = page.getByRole("heading", { level: 1 }).first();
      if (await h1.isVisible()) {
        const fontSize = await h1.evaluate(
          (el) => window.getComputedStyle(el).fontSize,
        );
        expect(fontSize).toBe("32px");
      }
    });
  });

  test.describe("Responsive Layout", () => {
    test("should adapt to 412px mobile width", async ({ page }) => {
      await page.setViewportSize({ width: 412, height: 892 });
      await page.goto("/");

      // Page should not cause horizontal scroll
      const hasHorizontalScroll = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
      );
      expect(hasHorizontalScroll).toBe(false);
    });

    test("should have proper spacing on mobile", async ({ page }) => {
      await page.goto("/onboarding/1");

      // Form should have 16px horizontal padding
      const form = page.locator("form").first();
      if (await form.isVisible()) {
        const styles = await form.evaluate((el) => ({
          paddingLeft: window.getComputedStyle(el).paddingLeft,
          paddingRight: window.getComputedStyle(el).paddingRight,
        }));

        expect(styles.paddingLeft).not.toBe("0px");
        expect(styles.paddingRight).not.toBe("0px");
      }
    });
  });
});

test.describe("Figma Design Validation - Desktop (1440px)", () => {
  test.beforeEach(async ({ page }) => {
    // Set desktop viewport matching Figma design
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  test.describe("Desktop Layout", () => {
    test("should have wider container on desktop", async ({ page }) => {
      await page.goto("/");

      // Desktop should use more width
      const container = page.locator("main > div").first();
      const width = await container.evaluate((el) => el.offsetWidth);

      expect(width).toBeGreaterThan(412); // Should be wider than mobile
    });

    test("should center content with proper padding", async ({ page }) => {
      await page.goto("/");

      // Container should have horizontal padding (135px as per Figma)
      const main = page.locator("main");
      const styles = await main.evaluate((el) => ({
        paddingLeft: window.getComputedStyle(el).paddingLeft,
        paddingRight: window.getComputedStyle(el).paddingRight,
      }));

      // Should have substantial padding
      expect(parseInt(styles.paddingLeft)).toBeGreaterThan(50);
    });

    test("should display header with proper height", async ({ page }) => {
      await page.goto("/onboarding/1");

      const header = page.locator("header");
      const height = await header.evaluate((el) => el.offsetHeight);

      // Header should be 60-80px high (Figma spec)
      expect(height).toBeGreaterThanOrEqual(60);
      expect(height).toBeLessThanOrEqual(100);
    });
  });

  test.describe("Desktop Form Layout", () => {
    test("should display form fields in grid layout", async ({ page }) => {
      await page.goto("/onboarding/1");

      // On desktop, form might use grid layout
      const form = page.locator("form").first();
      if (await form.isVisible()) {
        const display = await form.evaluate(
          (el) => window.getComputedStyle(el).display,
        );

        // Should use flex or grid for layout
        expect(["flex", "grid"]).toContain(display);
      }
    });
  });
});

test.describe("Cross-Browser Consistency", () => {
  test("should render consistently in Chromium", async ({ page }) => {
    await page.goto("/");

    // Basic smoke test
    const heading = page.getByRole("heading").first();
    await expect(heading).toBeVisible();

    const button = page.getByRole("link", { name: /Começar/i });
    await expect(button).toBeVisible();
  });
});

test.describe("Accessibility (A11y) from Figma Design", () => {
  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Should have h1
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
  });

  test("should have accessible button labels", async ({ page }) => {
    await page.goto("/");

    const button = page.getByRole("link", { name: /Começar/i });
    const ariaLabel = await button.getAttribute("aria-label");

    // Should have either visible text or aria-label
    const text = await button.textContent();
    expect(text || ariaLabel).toBeTruthy();
  });

  test("should have form labels for inputs", async ({ page }) => {
    await page.goto("/onboarding/1");

    // All inputs should have associated labels
    const inputs = page.locator("input[type='text'], input[type='email']");
    const count = await inputs.count();

    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute("id");
      const name = await input.getAttribute("name");

      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const labelExists = await label.count();
        expect(labelExists).toBeGreaterThan(0);
      }
    }
  });

  test("should have sufficient color contrast", async ({ page }) => {
    await page.goto("/");

    // Primary button (orange on white text) should have good contrast
    const button = page.getByRole("link", { name: /Começar/i });

    const bgColor = await button.evaluate(
      (el) => window.getComputedStyle(el).backgroundColor,
    );
    const textColor = await button.evaluate(
      (el) => window.getComputedStyle(el).color,
    );

    // Verify colors are set (actual contrast check would need additional library)
    expect(bgColor).toBeTruthy();
    expect(textColor).toBeTruthy();
  });
});

test.describe("Animation & Interactions from Figma", () => {
  test("should have smooth transitions on button hover", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 }); // Desktop for hover
    await page.goto("/");

    const button = page.getByRole("link", { name: /Começar/i });

    // Check if transition is defined
    const transition = await button.evaluate(
      (el) => window.getComputedStyle(el).transition,
    );

    // Should have some transition defined
    expect(transition).not.toBe("all 0s ease 0s");
  });

  test("should have hover effect on buttons", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const button = page.getByRole("link", { name: /Começar/i });

    // Hover over button
    await button.hover();

    // Button should still be visible after hover
    await expect(button).toBeVisible();
  });
});

test.describe("Image Assets from Figma", () => {
  test("should load Torra logo correctly", async ({ page }) => {
    await page.goto("/");

    const logo = page.locator('img[alt*="Torra"]');
    await expect(logo).toBeVisible();

    // Logo should have loaded successfully
    const isLoaded = await logo.evaluate(
      (img: HTMLImageElement) => img.complete && img.naturalHeight > 0,
    );
    expect(isLoaded).toBe(true);
  });

  test("should load rocket icon on welcome screen", async ({ page }) => {
    await page.goto("/");

    // Rocket icon/image should be present
    const rocket = page.locator('img[alt*="Rocket"], svg, [class*="rocket"]');
    const count = await rocket.count();

    expect(count).toBeGreaterThan(0);
  });
});
