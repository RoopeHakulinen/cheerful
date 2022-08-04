import { expect, Page } from '@playwright/test';

export class TeamsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.page.goto('/app/teams');
    }

    async checkPageTitle(): Promise<void> {
        await expect(this.page.locator('mat-toolbar .title:has-text("Joukkueet")').first()).toBeVisible();
    }

    async openTeam(teamName: string): Promise<void> {
        await this.page.click(`app-teams mat-list .teams .team-info:has-text("${teamName}")`);
    }

    async checkPageTitleIs(title: string): Promise<void> {
        await expect(this.page.locator(`mat-toolbar .title:has-text("${title}")`).first()).toBeVisible();
    }

    async selectCoach(coachName: string): Promise<void> {
        await this.page.click(`app-team mat-list#coaches form mat-form-field .mat-form-field-flex`);
        await this.page.click(`.cdk-overlay-container .mat-autocomplete-panel mat-option:has-text("${coachName}")`);
    }

    async checkNewCoachIsVisible(coachName: string): Promise<void> {
        await expect(this.page.locator(`app-team mat-list#coaches .new-users .list-item span.not-saved:has-text("${coachName}")`).first()).toBeVisible();
    }

    async checkCoachIsVisible(coachName: string): Promise<void> {
        await expect(this.page.locator(`app-team mat-list#coaches .users .list-item span:has-text("${coachName}")`).first()).toBeVisible();
    }

    async selectPerson(personName: string): Promise<void> {
        await this.page.click(`app-team mat-list#people form mat-form-field .mat-form-field-flex`);
        await this.page.click(`.cdk-overlay-container .mat-autocomplete-panel mat-option:has-text("${personName}")`);
    }

    async checkNewPersonIsVisible(personName: string): Promise<void> {
        await expect(this.page.locator(`app-team mat-list#people .new-people .list-item span.not-saved:has-text("${personName}")`).first()).toBeVisible();
    }

    async checkPersonIsVisible(personName: string): Promise<void> {
        await expect(this.page.locator(`app-team mat-list#people .people .list-item span:has-text("${personName}")`).first()).toBeVisible();
    }

    async makeNewPerson(firstName: string, lastName: string): Promise<void> {
        await this.page.click(`app-team mat-list#people button:has-text("Lisää uusi")`);
        await this.page.fill('mat-dialog-container app-person-dialog div.mat-dialog-content mat-form-field#firstName input', firstName);
        await this.page.fill('mat-dialog-container app-person-dialog div.mat-dialog-content mat-form-field#lastName input', lastName);
        await this.page.click('mat-dialog-container app-person-dialog div.mat-dialog-actions button:has-text("Lisää")');
    }

    async removeLastNewPerson(): Promise<void> {
        await this.page.click(`app-team mat-list#people .new-people .new-person:last-child mat-icon:has-text("remove")`);
    }

    async checkNewPersonIsNotVisible(personName: string): Promise<void> {
        await expect(this.page.locator(`app-team mat-list#people .new-people .list-item span.not-saved:has-text("${personName}")`).first()).not.toBeVisible();
    }

    async saveTeam(): Promise<void> {
        await this.page.click(`app-team .save-button button:has-text("Tallenna")`);
    }

    async createTeam(): Promise<void> {
        await this.page.click(`app-teams mat-list button:has-text("Luo uusi")`);
    }

    async checkTeamIsVisible(teamName: string): Promise<void> {
        await expect(this.page.locator(`app-teams mat-list .teams .team-info:has-text("${teamName}")`).first()).toBeVisible();
    }

    async checkTeamIsNotVisible(teamName: string): Promise<void> {
        await expect(this.page.locator(`app-teams mat-list .teams .team-info:has-text("${teamName}")`).first()).not.toBeVisible();
    }

    async goBackToTeamsPage(): Promise<void> {
        await this.page.click(`app-team mat-toolbar mat-icon:has-text("keyboard_arrow_left")`);
    }

    async removeTeam(): Promise<void> {
        await this.page.click(`app-teams mat-list .teams .list-item:last-child mat-icon:has-text("remove")`);
    }
}