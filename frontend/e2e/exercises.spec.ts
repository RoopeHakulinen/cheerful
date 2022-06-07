import { expect, test } from '@playwright/test';
import { ExercisesPage } from './exercises-page';

test.describe('Exercises', function () {
  test('Open single exercise', async ({ page }) => {
    const exercisesPage = new ExercisesPage(page);
    const exercise = 'Ponnista';

    await exercisesPage.goto();
    await exercisesPage.checkPageTitle();
    await exercisesPage.selectExercise(exercise);
    await exercisesPage.checkExercisePageIsVisible(exercise);
  });

  test('Navigate from sidebar', async ({ page }) => {
    await page.goto('/');
    await page.click('mat-toolbar .mat-icon:has-text("menu")');
    await page.click('mat-list .mat-icon:has-text("fitness_center")');
  });
});
