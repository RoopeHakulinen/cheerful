import { Injectable } from '@angular/core';
import { Person } from './people';
import { query, QueryOutput } from 'rx-query';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PersonWithChoreographies } from './people-manager/people-manager.component';

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

  getPeople(): Observable<QueryOutput<PersonWithChoreographies[]>> {
    return query('people', () =>
      this.http.get<PersonWithChoreographies[]>(`/api/people`)
    );
  }
}
