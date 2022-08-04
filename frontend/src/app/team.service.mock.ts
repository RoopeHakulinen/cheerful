import { Injectable } from '@angular/core';
import { QueryOutput } from 'rx-query';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Team } from './team';
import { updateAllAttributes } from './utils';

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

  teamsSubject = new BehaviorSubject<QueryOutput<Team[]>>({status: 'success', data: this.teams} as any);

  getTeams(): Observable<QueryOutput<Team[]>> {
    return this.teamsSubject.asObservable();
  }

  getTeamById(id: number): Observable<QueryOutput<Team>> {
    return of({status: 'success', data: this.teams.find(team => team.id === id)!} as any);
  }

  updateTeam(team: Team): Observable<Team> {
    const foundTeam = this.teams.find(existingTeam => existingTeam.id === team.id)!;
    updateAllAttributes(team, foundTeam);
    this.teamsSubject.next({status: 'success', data: this.teams} as any);
    return of(foundTeam);
  }

  createTeam(): Observable<Team> {
    const newTeam = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: 'Uusi tiimi',
      choreographies: [],
      users: [],
      people: [],
    };
    this.teams.push(newTeam);
    this.teamsSubject.next({status: 'success', data: this.teams} as any);
    return of(newTeam);
  }

  deleteTeamById(id: number): Observable<void> {
    const foundTeam = this.teams.find(existingTeam => existingTeam.id === id)!;
    this.teams = this.teams.filter(team => team.id !== id);
    this.teamsSubject.next({status: 'success', data: this.teams} as any);
    return of(void 0);
  }
}

