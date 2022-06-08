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
        await this.page.fill('.example-form-field .query-input', query);
    }

    async checkExerciseIsVisible(query: string): Promise<void> {
        await expect(this.page.locator(`app-exercises-listing .single-exercise:has-text("${query}")`).first()).toBeVisible();
    }

    async updateDifficultyRangeCheck(minDifficulty: number, maxDifficulty: number): Promise<void> {
        await this.page.fill('.minDifficulty-input', minDifficulty.toString());
        await this.page.fill('.maxDifficulty-input', maxDifficulty.toString());
    }

    async checkExerciseIsNotVisible(query: string): Promise<void> {
        await expect(this.page.locator(`app-exercises-listing .single-exercise:has-text("${query}")`).first()).not.toBeVisible();
    }
}