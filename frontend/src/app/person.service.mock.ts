import { Injectable } from '@angular/core';
import { QueryOutput } from 'rx-query';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Person } from './person';
import { updateAllAttributes } from './utils';

@Injectable()
export class PersonServiceMock {
  people: Person[] = [
    {
      id: 1,
      name: 'testi testaaja',
    },
  ];

  peopleSubject = new BehaviorSubject<QueryOutput<Person[]>>({status: 'success', data: this.people} as any);

  getPeople(): Observable<QueryOutput<Person[]>> {
    return this.peopleSubject.asObservable();
  }

  getPersonById(id: number): Observable<Person> {
    return of(this.people.find(person => person.id === id)!);
  }

  updatePerson(person: Person): Observable<Person> {
    const foundPerson = this.people.find(existingPerson => existingPerson.id === person.id)!;
    updateAllAttributes(person, foundPerson);
    this.peopleSubject.next({status: 'success', data: this.people} as any);
    return of(foundPerson);
  }
}
