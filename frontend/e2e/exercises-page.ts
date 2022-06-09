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
        await expect(this.page.locator('.mat-paginator-range-actions button.mat-paginator-navigation-next').first()).not.toBeDisabled;
    }

    async clickNextPageButton(): Promise<void> {
        await this.page.click('.mat-paginator-range-actions button.mat-paginator-navigation-next');
    }

    async checkPreviousPageButtonIsNotUsable(): Promise<void> {
        await expect(this.page.locator('.mat-paginator-range-actions button.mat-paginator-navigation-previous').first()).toBeDisabled;
    }

    async checkNextPageButtonIsNotUsable(): Promise<void> {
        await expect(this.page.locator('.mat-paginator-range-actions button.mat-paginator-navigation-next').first()).toBeDisabled;
    }
}