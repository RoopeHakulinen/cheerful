import { expect, test } from '@playwright/test';
import { AcrobaticsPage } from './acrobatics-page';
import { ExercisesPage } from './exercises-page';

test.describe('Acrobatics', function () {
  let acrobaticsPage: AcrobaticsPage;

  test.beforeEach(async ({ page }) => {
    acrobaticsPage = new AcrobaticsPage(page);
    await acrobaticsPage.goto();
  });

  test('Open single exercise', async ({ page }) => {

    const acrobatic = 'Hyppy';
    const exercise = 'Ponnista';

    await acrobaticsPage.checkPageTitle();
    await acrobaticsPage.selectAcrobatic(acrobatic);
    await acrobaticsPage.checkAcrobaticPageIsVisible(acrobatic);
    await acrobaticsPage.selectExercise(exercise);
  
    const exercisesPage = new ExercisesPage(page);
    await exercisesPage.checkExercisePageIsVisible(exercise);
  });
});
