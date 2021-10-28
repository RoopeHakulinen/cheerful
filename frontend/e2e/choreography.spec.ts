import { test } from '@playwright/test';

test.describe('Frame manager', function () {
  test.beforeEach(async ({ page }) => {
    await page.goto('/choreographies/1');
  });

});

test.describe('Carpet', function () {
  test.beforeEach(async ({ page }) => {
    await page.goto('localhost:4200/choreographies/1');
  });

  test('Move a person test', async ({ page }) => {

  });

});
