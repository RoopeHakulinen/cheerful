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

  test('Filtering the exercises', async ({ page }) => {
    const exercisesPage = new ExercisesPage(page);

    const query = 'Ponnista';
    const minDifficulty = 8;
    const maxDifficulty = 9;

    await exercisesPage.goto();
    await exercisesPage.checkPageTitle();
    await exercisesPage.openFilterBar();
    await exercisesPage.updateQuery(query);
    await exercisesPage.checkExerciseIsVisible(query);
    await exercisesPage.updateDifficultyRangeCheck(minDifficulty, maxDifficulty);
    await exercisesPage.checkExerciseIsNotVisible(query);
  });
});
