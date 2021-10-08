import { expect, test } from '@playwright/test';

test.describe('Frame manager', function () {
  test.beforeEach(async ({ page }) => {
    await page.goto('/choreographies/1');
  });

  test('Play/pause button test', async ({ page }) => {
    await page.click('text=play_arrow');
    await expect(page.locator('text=pause').first()).toHaveText('pause');
  });

  test('Move frames', async ({ page }) => {

  });

  test('Add a frame test', async ({ page }) => {
    await page.click('text=Lisää');
    await page.click('text=Freimi 1');
    await expect(page.locator('text= Freimi 9 ').first()).toHaveText(' Freimi 9 ');
  });

  test('Delete a frame test', async ({ page }) => {
    await page.click('text=Poista');
    await expect(page.locator('text=Alafreimi 7').first()).toHaveText('Alafreimi 7');
  });

  test('Options test', async ({ page }) => {
    await page.click('text=Asetukset');
    await expect(page.locator('text=Äänet').first()).toHaveText('Äänet');
    await expect(page.locator('text=Jatkuva toisto').first()).toHaveText('Jatkuva toisto');
    await expect(page.locator('text=Animaatiot').first()).toHaveText('Animaatiot');
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
