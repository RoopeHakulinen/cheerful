import { expect, Page } from '@playwright/test';

export class AcrobaticsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.page.goto('/acrobatics');
    }

    async checkPageTitle(): Promise<void> {
        await expect(this.page.locator('mat-toolbar .title:has-text("Akrobatiat")').first()).toBeVisible();
    }

    async selectAcrobatic(i: string): Promise<void> {
        await this.page.click(`app-show-acrobatic .title:has-text("${i}")`);
    }

    async checkAcrobaticPageIsVisible(i: string): Promise<void> {
        await expect(this.page.locator(`app-single-acrobatic-page .single-acrobatic-page h1:has-text("${i}")`).first()).toBeVisible();
    }

    async selectExercise(i: string): Promise<void> {
        await this.page.click(`app-exercises-listing .single-exercise:has-text("${i}")`);
    }
}