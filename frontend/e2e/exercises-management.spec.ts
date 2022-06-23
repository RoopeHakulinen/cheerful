import { expect, test } from '@playwright/test';
import { ExercisesPage } from './exercises-page';

test.describe('Exercises management', function () {
  test('Add an exercise', async ({ page }) => {
    const exercisesPage = new ExercisesPage(page);

    const name = 'Test exercise';
    const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac nisi ut mauris maximus maximus. Phasellus pretium augue est, vitae tempor quam tempus sit amet.';
    const tag = 'Akrobatiaa';
    const difficulty = 3;

    await exercisesPage.goto();
    await exercisesPage.checkPageTitle();

    await exercisesPage.clickCreateNewExerciseButton();
    await exercisesPage.fillExerciseCreatingForm(name, description, tag, difficulty);
    await exercisesPage.clickCreateExerciseButton();

    await exercisesPage.checkExercisePageIsVisible(name);
    await exercisesPage.checkExerciseIsCorrectlyMade(name, description, tag, difficulty);
  });

  test('Edit an exercise', async ({ page }) => {
    const exercisesPage = new ExercisesPage(page);

    const name = 'Ponnista';
    const changedExercisename = 'Ponnista changed';

    await page.goto('/app/exercises/1');
    await exercisesPage.checkExercisePageIsVisible(name);

    await exercisesPage.clickEditExerciseButton();

    await exercisesPage.fillExerciseEditingForm(changedExercisename);
    await exercisesPage.clickSaveExerciseButton();

    await exercisesPage.checkExercisePageIsVisible(changedExercisename);
  });

  test('Copy an exercise', async ({ page }) => {
    const exercisesPage = new ExercisesPage(page);

    const name = 'Hyppy';
    const createPage = 'Luo harjoitus';

    await exercisesPage.goto();
    await exercisesPage.checkPageTitle();
    await exercisesPage.checkExerciseIsVisible(name);

    await exercisesPage.selectExercise(name);
    await exercisesPage.checkExercisePageIsVisible(name);

    await exercisesPage.clickCopyExerciseButton();
    await exercisesPage.checkPageTitleIs(createPage);
    await exercisesPage.clickSaveExerciseButton();

    await exercisesPage.checkExercisePageIsVisible(name);
  })
});
