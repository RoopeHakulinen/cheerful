import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Team, TeamToBeCreated } from './team';
import { HttpClient } from '@angular/common/http';
import { query, QueryOutput, refreshQuery } from 'rx-query';

@Injectable()
export class TeamService {
  private emptyTeam: TeamToBeCreated = {
    name: 'Uusi tiimi',
  };

  constructor(private http: HttpClient) {}

  getTeams(): Observable<QueryOutput<Team[]>> {
    return query('teams', () => this.http.get<Team[]>('/api/teams'));
  }

  createTeam(): Observable<Team> {
    return this.http.post<Team>(`/api/teams`, this.emptyTeam).pipe(tap(() => this.refreshTeams()));
  }

  updateTeam(team: Team): Observable<Team> {
    return this.http.put<Team>(`/api/teams`, team).pipe(tap(() => this.refreshTeams()));
  }

  deleteTeamById(id: number): Observable<Team> {
    return this.http.delete<Team>(`/api/teams/${id}`).pipe(tap(() => this.refreshTeams()));
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`/api/teams/${id}`);
  }

  refreshTeams(): void {
    refreshQuery('teams');
  }
}
