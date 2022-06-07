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

    async selectExercise(i: string): Promise<void> {
        await this.page.click(`app-exercises-listing .single-exercise:has-text("${i}")`);
    }

    async checkExercisePageIsVisible(i: string): Promise<void> {
        await expect(this.page.locator(`mat-toolbar .title:has-text("${i}")`).first()).toBeVisible();
    }
}