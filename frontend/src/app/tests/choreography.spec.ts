import { expect, test } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('localhost:4200');
  const title = page.locator('.title');
  await expect(title).toHaveText('Choreographies');
});
