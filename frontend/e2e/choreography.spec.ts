import { expect, test } from '@playwright/test';

test.describe('Frame manager', function () {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('/app/choreographies/1');
  });

  test('Settings', async ({ page }) => {
    await page.click('text=Asetukset');
    await expect(page.locator('text=Maton koko').first()).toBeVisible();
  });

});

test.describe('Carpet', function () {

});

