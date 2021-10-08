import { expect, test } from '@playwright/test';

test('landing page test', async ({ page }) => {
  await page.goto('/');
  const title = page.locator('.title');
  await expect(title).toHaveText('Koreografiat');
});
