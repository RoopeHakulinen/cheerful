import { expect, Page } from '@playwright/test';

export class ExercisesPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.page.goto('/exercises');
    }

    async checkPageTitle(): Promise<void> {
        await expect(this.page.locator('mat-toolbar .title:has-text("Exercises")').first()).toBeVisible();
    }

    async selectExercise(exercise: string): Promise<void> {
        await this.page.click(`app-exercises-listing .single-exercise:has-text("${exercise}")`);
    }

    async checkExercisePageIsVisible(exercise: string): Promise<void> {
        await expect(this.page.locator(`mat-toolbar .title:has-text("${exercise}")`).first()).toBeVisible();
    }

    async openFilterBar(): Promise<void> {
        await this.page.click('mat-expansion-panel-header .mat-expansion-indicator');
    }

    async updateQuery(query: string): Promise<void> {
        await this.page.fill('.query-input-field input.query-input', query);
    }

    async checkExerciseIsVisible(query: string): Promise<void> {
        await expect(this.page.locator(`app-exercises-listing .single-exercise:has-text("${query}")`).first()).toBeVisible();
    }

    async updateDifficultyRangeCheck(minDifficulty: number, maxDifficulty: number): Promise<void> {
        await this.page.fill('.min-difficulty-input-field input.min-difficulty-input', minDifficulty.toString());
        await this.page.fill('.max-difficulty-input-field input.max-difficulty-input', maxDifficulty.toString());
    }

    async checkExerciseIsNotVisible(query: string): Promise<void> {
        await expect(this.page.locator(`app-exercises-listing .single-exercise:has-text("${query}")`).first()).not.toBeVisible();
    }

    async selectTagFilter(tag: string): Promise<void> {
        await this.page.fill('mat-chip-list input', tag);
        await this.page.click('mat-option .mat-option-text:has-text("' + tag + '")');
    }

    async checkTagIsVisible(tag: string): Promise<void> {
        await expect(this.page.locator(`app-exercises-listing mat-chip-list mat-chip:has-text("${tag}")`).first()).toBeVisible();
    }

    async checkNextPageButtonIsUsable(): Promise<void> {
        await expect(this.page.locator('.mat-paginator-range-actions button.mat-paginator-navigation-next').first()).not.toBeDisabled();
    }

    async clickNextPageButton(): Promise<void> {
        await this.page.click('.mat-paginator-range-actions button.mat-paginator-navigation-next');
    }

    async checkPreviousPageButtonIsNotUsable(): Promise<void> {
        await expect(this.page.locator('.mat-paginator-range-actions button.mat-paginator-navigation-previous').first()).toBeDisabled();
    }

    async checkNextPageButtonIsNotUsable(): Promise<void> {
        await expect(this.page.locator('.mat-paginator-range-actions button.mat-paginator-navigation-next').first()).toBeDisabled();
    }

    async clickCreateNewExerciseButton(): Promise<void> {
        await this.page.click('.create-new-exercise-button button');
    }

    async fillExerciseCreatingForm(exercise: string, description: string, tag: string, difficulty: number): Promise<void> {
        await this.page.fill('mat-form-field.exercise-name-input-field input', exercise);

        await this.page.fill('mat-form-field.exercise-description-input-field textarea', description);

        await this.page.click('mat-form-field.exercise-difficulty-input-field .mat-select-arrow-wrapper');
        await this.page.click('mat-option .mat-option-text:has-text("' + difficulty + '")');

        await this.page.fill('mat-chip-list input', tag);
        await (await this.page.$('mat-chip-list input'))!.press('Enter');
    }

    async clickCreateExerciseButton(): Promise<void> {
        await this.page.click('.submit-exercise-form button');
    }

    async checkExerciseIsCorrectlyMade(exercise: string, description: string, tag: string, difficulty: number): Promise<void> {
        await expect(this.page.locator(`mat-toolbar .title:has-text("${exercise}")`).first()).toBeVisible();
        await expect(this.page.locator(`.exercise .exercise-difficulty:has-text("${difficulty}")`).first()).toBeVisible();
        await expect(this.page.locator(`.exercise .exercise-description:has-text("${description}")`).first()).toBeVisible();
        await expect(this.page.locator(`.exercise .exercise-tags-list mat-chip:has-text("${tag}")`).first()).toBeVisible();
    }

    async clickEditExerciseButton(): Promise<void> {
        await this.page.click('.edit-exercise-button button');
    }

    async fillExerciseEditingForm(changedExerciseName: string): Promise<void> {
        await this.page.fill('mat-form-field.exercise-name-input-field input', changedExerciseName);
    }

    async clickSaveExerciseButton(): Promise<void> {
        await this.page.click('.submit-exercise-form button');
    }
}