import { test } from '@playwright/test';

test.describe('Frame manager', function () {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('/choreographies/1');
  });
});

test.describe('Carpet', function () {});
