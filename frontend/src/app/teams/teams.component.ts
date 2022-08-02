import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { QueryOutput } from 'rx-query';
import { Observable } from 'rxjs';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {

  teams$: Observable<QueryOutput<Team[]>>;

  constructor(
    private router: Router,
    public teamService: TeamService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
  ) {
    this.teams$ = this.teamService.getTeams();
  }

  public createNewTeam(): void {
    this.teamService.createTeam().subscribe(team => this.router.navigate(['/app/teams', team.id]));
  }

  public deleteTeam(id: number, name: string): void {
    this.teamService.deleteTeamById(id)
      .subscribe(team => this.snackBar.open(
        this.translate.instant(`TEAMS.TEAM_N_DELETED`, {name: name}), "x", { duration: 3000 }
  ));
  }

}
