import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Team } from './team';

@Injectable()
export class TeamServiceMock {
  teams: Team[] = [
    {
      id: 1,
      name: 'testi tiimi',
      choreographies: [],
      users: [],
      people: [],
    },
  ];

  getTeams(): Observable<Team[]> {
    return of({status: 'success', data: this.teams} as any);
  }

  getTeamById(id: number): Observable<Team> {
    return of(this.teams.find(team => team.id === id)!);
  }

  updateTeam(team: Team): Observable<Team> {
    return of(team);
  }
}
