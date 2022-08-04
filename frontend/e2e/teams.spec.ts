import { test } from '@playwright/test';
import { TeamsPage } from './teams-page';


test.describe('Teams', function () {
  test('Open a single team and save users and people', async ({ page }) => {
    const teamsPage = new TeamsPage(page);
    const teamName = 'testi tiimi';
    const coach = 'testi testaaja';
    const person = 'testi testaaja';

    await teamsPage.goto();
    await teamsPage.checkPageTitle();

    await teamsPage.openTeam(teamName);
    await teamsPage.checkPageTitleIs(teamName);

    await teamsPage.selectCoach(coach)
    await teamsPage.checkNewCoachIsVisible(coach);

    await teamsPage.selectPerson(person);
    await teamsPage.checkNewPersonIsVisible(person);

    await teamsPage.saveTeam();
    await teamsPage.checkCoachIsVisible(coach);
    await teamsPage.checkPersonIsVisible(person);
  });

  test('Add new person and remove it', async ({ page }) => {
    const teamsPage = new TeamsPage(page);
    const teamName = 'testi tiimi';
    const person = 'testi testaaja';
    const newPersonFirstName = 'Uusi';
    const newPersonLastName = 'Testaaja';

    await teamsPage.goto();
    await teamsPage.checkPageTitle();

    await teamsPage.openTeam(teamName);
    await teamsPage.checkPageTitleIs(teamName);

    await teamsPage.selectPerson(person);
    await teamsPage.checkNewPersonIsVisible(person);

    await teamsPage.makeNewPerson(newPersonFirstName, newPersonLastName);
    await teamsPage.checkNewPersonIsVisible(newPersonFirstName + ' ' + newPersonLastName);

    await teamsPage.removeLastNewPerson();
    await teamsPage.checkNewPersonIsNotVisible(newPersonFirstName + ' ' + newPersonLastName);
  });

    test('Create new team and remove it', async ({ page }) => {
        const teamsPage = new TeamsPage(page);
        const teamName = 'Uusi tiimi';

        await teamsPage.goto();
        await teamsPage.checkPageTitle();

        await teamsPage.createTeam();
        await teamsPage.checkPageTitleIs(teamName);

        await teamsPage.goBackToTeamsPage();
        await teamsPage.checkPageTitle();

        await teamsPage.checkTeamIsVisible(teamName);

        await teamsPage.removeTeam();
        await teamsPage.checkTeamIsNotVisible(teamName);
    });
})