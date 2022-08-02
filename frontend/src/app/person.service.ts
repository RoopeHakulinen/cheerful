import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Person, PersonToBeCreated } from './person';
import { HttpClient } from '@angular/common/http';
import { query, QueryOutput, refreshQuery } from 'rx-query';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class PersonService {
  
  constructor(private http: HttpClient, private translate: TranslateService) {}

  private emptyPerson: PersonToBeCreated = {
    name: this.translate.instant('COMMON.NEW_PERSON'),
  };

  getPeople(): Observable<QueryOutput<Person[]>> {
    return query('people', () => this.http.get<Person[]>('/api/people'));
  }

  createPerson(): Observable<Person> {
    return this.http.post<Person>(`/api/people`, this.emptyPerson).pipe(tap(() => this.refreshPeople()));
  }

  updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`/api/people`, person).pipe(tap(() => this.refreshPeople()));
  }

  deletePersonById(id: number): Observable<Person> {
    return this.http.delete<Person>(`/api/people/${id}`).pipe(tap(() => this.refreshPeople()));
  }

  getPersonById(id: number): Observable<Person> {
    return this.http.get<Person>(`/api/people/${id}`);
  }

  private refreshPeople(): void {
    refreshQuery('people');
  }
}
