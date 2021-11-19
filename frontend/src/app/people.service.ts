import { Injectable } from '@angular/core';
import { Person } from './people';
import { query, QueryOutput } from 'rx-query';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  getPersonById(id: number): Observable<QueryOutput<Person>> {
    return query('person', id, (_id) =>
      this.http.get<Person>(`/api/people/${_id}`)
    );
  }

  getPeople(): Observable<QueryOutput<Person[]>> {
    return query('people', () => this.http.get<Person[]>(`/api/people`));
  }
}
