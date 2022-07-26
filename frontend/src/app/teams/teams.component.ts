import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  ) {
    this.teams$ = this.teamService.getTeams();
  }

  public createNewTeam(): void {
    this.teamService.createTeam().subscribe(team => this.router.navigate(['/teams', team.id]));
  }

  public deleteTeam(id: number): void {
    this.teamService.deleteTeamById(id).subscribe();
  }

}
