import { expect, test } from '@playwright/test';

test.describe('Frame manager', function () {
  test.beforeEach(async ({ page }) => {
    await page.goto('localhost:4200/choreographies/1');
  });

  test('Play button test', async ({ page }) => {

  });

  test('Stop button test', async ({ page }) => {

  });

  test('Move frames', async ({ page }) => {

  });

  test('Add a frame test', async ({ page }) => {
    await page.click('text=Add');
    await page.click('text=Frame 1');
    await expect(page.locator('text= Frame 9 ').first()).toHaveText(' Frame 9 ');
  });

  test('Delete a frame test', async ({ page }) => {

  });

  test('Options test', async ({ page }) => {

  });

});


test.describe('Carpet', function () {
  test.beforeEach(async ({ page }) => {
    await page.goto('localhost:4200/choreographies/1');
  });

  test('Move a person test', async ({ page }) => {

  });

  test('Open the tile manager test', async ({ page }) => {

  });

  test('Open notes test', async ({ page }) => {

  });

});
