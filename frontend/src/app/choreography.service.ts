import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Choreography, createChoreography } from './choreography';
import { ChoreographyItem } from './choreography-item';
import { HttpClient } from '@angular/common/http';
import { refreshQuery, QueryOutput, query } from 'rx-query';

@Injectable()
export class ChoreographyService {
  constructor(private http: HttpClient) {}

  getChoreographies(): Observable<QueryOutput<Choreography[]>> {
    return query('choreographies', () => this.http.get<Choreography[]>('/api/choreographies'));
  }

  createChoreography(): Observable<Choreography> {
    return this.http.post<Choreography>(`/api/choreographies`, createChoreography()).pipe(tap(() => this.refreshChoreographies()));
  }

  updateChoreography(choreography: Choreography): Observable<Choreography> {
    return this.http.put<Choreography>(`/api/choreographies`, choreography).pipe(tap(() => this.refreshChoreographies()));
  }

  deleteChoreographyById(id: number): Observable<void> {
    return this.http.delete<void>(`/api/choreographies/${id}`).pipe(tap(() => this.refreshChoreographies()));
  }

  getChoreographyById(id: number): Observable<Choreography> {
    return this.http.get<Choreography>(`/api/choreographies/${id}`);
  }

  private refreshChoreographies(): void {
    refreshQuery('choreographies');
  }
}
