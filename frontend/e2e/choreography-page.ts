import { expect, Page } from '@playwright/test';

export class ChoreographiesPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('/app/choreographies');
  }

  async checkPageTitle(): Promise<void> {
    await expect(this.page.locator('mat-toolbar .title:has-text("Koreografiat")').first()).toBeVisible();
  }

  async selectChoreography(choreography: string): Promise<void> {
    await this.page.click(`app-choreographies mat-list .list-item .choreography-info:has-text("${choreography}")`);
  }

  async checkPageTitleIs(pageTitle: string): Promise<void> {
    await expect(this.page.locator('mat-toolbar .title:has-text("' + pageTitle + '")').first()).toBeVisible();
  }

  async clickNameChangeButton(): Promise<void> {
    await this.page.click(`app-choreography mat-icon:has-text("edit")`);
  }

  async editName(name: string): Promise<void> {
    await this.page.fill('app-edit-name-dialog mat-form-field input', name);
    await this.page.click('app-edit-name-dialog .mat-dialog-actions button:has-text("Tallenna")');
  }
}
