import { expect, test } from '@playwright/test';
import { ExercisesPage } from './exercises-page';

test.describe('Exercises listing', function () {
  test('Open a single exercise', async ({ page }) => {
    const exercisesPage = new ExercisesPage(page);
    const exercise = 'Ponnista';

    await exercisesPage.goto();
    await exercisesPage.checkPageTitle();
    await exercisesPage.selectExercise(exercise);
    await exercisesPage.checkExercisePageIsVisible(exercise);
  });

  test('Navigate from sidebar', async ({ page }) => {
    await page.goto('/app');
    await page.click('mat-toolbar .mat-icon:has-text("menu")');
    await page.click('mat-list .mat-icon:has-text("fitness_center")');
  });

  test('Filtering the exercises by query', async ({ page }) => {
    const exercisesPage = new ExercisesPage(page);

    const query = 'Ponnista';
    const notValidQuery = 'Ponnista2';

    await exercisesPage.goto();
    await exercisesPage.checkPageTitle();
    await exercisesPage.openFilterBar();

    await exercisesPage.checkExerciseIsVisible(query);
    await exercisesPage.updateQuery(notValidQuery);
    await exercisesPage.checkExerciseIsNotVisible(notValidQuery);
  });

  test('Filtering the exercises by difficulty', async ({ page }) => {
    const exercisesPage = new ExercisesPage(page);

    const query = 'Ponnista';
    const minDifficulty = 8;
    const maxDifficulty = 9;

    await exercisesPage.goto();
    await exercisesPage.checkPageTitle();
    await exercisesPage.openFilterBar();

    await exercisesPage.checkExerciseIsVisible(query);
    await exercisesPage.updateDifficultyRangeCheck(minDifficulty, maxDifficulty);
    await exercisesPage.checkExerciseIsNotVisible(query);
  });

  test('Filtering the exercises by tag', async ({ page }) => {
    const exercisesPage = new ExercisesPage(page);

    const query = 'Ponnista';
    const tag = 'Akrobatia';

    await exercisesPage.goto();
    await exercisesPage.checkPageTitle();
    await exercisesPage.openFilterBar();

    await exercisesPage.selectTagFilter(tag);
    await exercisesPage.checkExerciseIsVisible(query);
    await exercisesPage.checkTagIsVisible(tag);
  });

  test('Filtering the exercises with multiple filters', async ({ page }) => {
    const exercisesPage = new ExercisesPage(page);

    const query = 'Ponnista';
    const tag = 'Akrobatia';
    const minDifficulty = 1;
    const maxDifficulty = 5;

    await exercisesPage.goto();
    await exercisesPage.checkPageTitle();
    await exercisesPage.openFilterBar();

    await exercisesPage.updateQuery(query);
    await exercisesPage.checkExerciseIsVisible(query);

    await exercisesPage.updateDifficultyRangeCheck(minDifficulty, maxDifficulty);
    await exercisesPage.checkExerciseIsVisible(query);

    await exercisesPage.selectTagFilter(tag);
    await exercisesPage.checkExerciseIsVisible(query);
    await exercisesPage.checkTagIsVisible(tag);
  });

  test('Change the paging page', async ({ page }) => {
    const exercisesPage = new ExercisesPage(page);

    const query = 'Ponnista';
    const minDifficulty = 3;
    const maxDifficulty = 3;

    await exercisesPage.goto();
    await exercisesPage.checkPageTitle();
    await exercisesPage.openFilterBar();

    await exercisesPage.checkExerciseIsVisible(query);

    await exercisesPage.checkNextPageButtonIsUsable();
    await exercisesPage.clickNextPageButton();

    await exercisesPage.checkExerciseIsNotVisible(query);

    await exercisesPage.updateDifficultyRangeCheck(minDifficulty, maxDifficulty);

    await exercisesPage.checkExerciseIsVisible(query);
    await exercisesPage.checkPreviousPageButtonIsNotUsable();
    await exercisesPage.checkNextPageButtonIsNotUsable();
  });

  test('Sort the exercises', async ({ page }) => {
    const exercisesPage = new ExercisesPage(page);

    const exerciseName = 'Hölkkä';
    const exerciseName2 = 'Seiso';
    const sortMethod = 'Vaikeusaste (pienestä suureen)';

    await exercisesPage.goto();
    await exercisesPage.checkPageTitle();

    await exercisesPage.checkExerciseIsVisibleByPosition(1, exerciseName);
    
    await exercisesPage.clickSorter(); 
    await exercisesPage.selectSorter(sortMethod);

    await exercisesPage.checkExerciseIsVisibleByPosition(1, exerciseName2);

  });
});
