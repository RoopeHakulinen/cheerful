import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Choreography } from './choreography';
import { ChoreographyItem } from './choreography-item';
import { HttpClient } from '@angular/common/http';
import { query, QueryOutput } from 'rx-query';

@Injectable()
export class ChoreographyService {
  choreographies: Choreography[] = [
    {
      id: 1,
      name: 'SM-karsinnat',
      team: 'Flames',
      frames: [
        {
          name: 'Alkutila',
          type: 'content',
          duration: 1,
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
      people: [],
    },
  ];

  constructor(private http: HttpClient) {}

  getChoreographies(): Observable<QueryOutput<Choreography[]>> {
    return query('choreographies', () =>
      this.http.get<Choreography[]>(`/api/choreographies/`)
    );
  }

  getChoreographiesById(id: number): Observable<QueryOutput<Choreography>> {
    return query('choreography', id, (_id) =>
      this.http.get<Choreography>(`/api/choreographies/${_id}`)
    );
  }

  private generateGrid(): ChoreographyItem[] {
    return Array(12 * 12)
      .fill(null)
      .map(() => ({
        content: null,
        shape: 'rounded',
        position: 'center',
      }));
  }
}
