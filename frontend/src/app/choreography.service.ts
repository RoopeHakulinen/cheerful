import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Choreography } from './choreography';
import { ChoreographyItem } from './choreography-item';
import { HttpClient } from '@angular/common/http';
import { refreshQuery, QueryOutput, query } from 'rx-query';

@Injectable()
export class ChoreographyService {
  private emptyChoreography: Choreography = {
    id: 1,
    name: 'Uusi koreografia',
    teamId: 1,
    frames: [
      {
        name: 'Alkutila',
        type: 'content',
        duration: 2,
        grid: this.generateGrid(),
        notes: '',
      },
    ],
    carpet: {
      color: '#5151b8',
      height: 12,
      width: 12,
      horizontalSegments: 12,
      verticalSegments: 6,
    },
    choreographyPerson: [],
  };

  constructor(private http: HttpClient) {}

  getChoreographies(): Observable<QueryOutput<Choreography[]>> {
    return query('choreographies', () => this.http.get<Choreography[]>('/api/choreographies'));
  }

  createChoreography(): Observable<Choreography> {
    return this.http.post<Choreography>(`/api/choreographies`, this.emptyChoreography).pipe(tap(() => this.refreshChoreographies()));
  }

  updateChoreography(choreography: Choreography): Observable<Choreography> {
    return this.http.put<Choreography>(`/api/choreographies`, choreography).pipe(tap(() => this.refreshChoreographies()));
  }

  deleteChoreographyById(id: number): Observable<Choreography> {
    return this.http.delete<Choreography>(`/api/choreographies/${id}`).pipe(tap(() => this.refreshChoreographies()));
  }

  getChoreographyById(id: number): Observable<Choreography> {
    return this.http.get<Choreography>(`/api/choreographies/${id}`);
  }

  generateGrid(): ChoreographyItem[] {
    return Array(12 * 12)
      .fill(null)
      .map(() => ({
        content: null,
        shape: 'rounded',
        position: 'center',
      }));
  }

  refreshChoreographies() {
    refreshQuery('choreographies');
  }
}
