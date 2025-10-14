/**
 * E2E Test: Step 6 - Transport Voucher
 */

import { test, expect } from "@playwright/test";
import { transportDataTestData } from "../fixtures/test-data";
import { NavigationHelper, TransportHelper, FormHelper } from "../helpers/test-helpers";

test.describe("Step 6: Transport Voucher", () => {
  let nav: NavigationHelper;
  let transportHelper: TransportHelper;
  let form: FormHelper;

  test.beforeEach(async ({ page }) => {
    nav = new NavigationHelper(page);
    transportHelper = new TransportHelper(page);
    form = new FormHelper(page);
    await nav.goToStep(6);
  });

  test("should add transport line", async ({ page }) => {
    await form.clickCheckbox(/necessita vale transporte/i);
    await transportHelper.addTransportLine(transportDataTestData.withTransport.linhas[0]);
    await transportHelper.verifyTransportLineCount(1);
  });

  test("should remove transport line", async ({ page }) => {
    await form.clickCheckbox(/necessita vale transporte/i);
    await transportHelper.addTransportLine(transportDataTestData.withTransport.linhas[0]);
    await transportHelper.removeTransportLine(0);
    await transportHelper.verifyTransportLineCount(0);
  });
});
