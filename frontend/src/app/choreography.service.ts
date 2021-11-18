import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Choreography } from './choreography';
import { HttpClient } from '@angular/common/http';
import { query, QueryOutput } from 'rx-query';

@Injectable()
export class ChoreographyService {
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
}
