import { expect, test } from '@playwright/test';
import { ChoreographiesPage } from './choreography-page';

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

test.describe('Choreography', function () {
  test('Open a single choreography', async ({ page }) => {
    const choreographiesPage = new ChoreographiesPage(page);
    const choreography = 'SM-karsinnat';

    await choreographiesPage.goto();
    await choreographiesPage.checkPageTitle();
    
    await choreographiesPage.selectChoreography(choreography);
    await choreographiesPage.checkPageTitleIs(choreography);
  });

  test('Change choreography name', async ({ page }) => {
    const choreographiesPage = new ChoreographiesPage(page);
    const choreography = 'SM-karsinnat';
    const newName = 'SM-karsinnat-2';

    await choreographiesPage.goto();
    await choreographiesPage.checkPageTitle();

    await choreographiesPage.selectChoreography(choreography);
    await choreographiesPage.checkPageTitleIs(choreography);

    await choreographiesPage.clickNameChangeButton();
    await choreographiesPage.editName(newName);

    await choreographiesPage.checkPageTitleIs(newName);
  });
});