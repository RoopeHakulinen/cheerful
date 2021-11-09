import { Injectable } from '@angular/core';
import { Person } from './people';

const people: Person[] = [
  { name: 'Seela', id: 1 },
  { name: 'Ava', id: 2 },
  { name: 'Erika', id: 3 },
  { name: 'Matti', id: 4 },
  { name: 'Olivia', id: 5 },
  { name: 'Price', id: 6 },
  { name: 'Mire', id: 7 },
  { name: 'Lexi', id: 8 },
  { name: 'Ada', id: 9 },
  { name: 'Hilla', id: 10 },
  { name: 'Ria', id: 11 },
  { name: 'Vilma', id: 12 },
  { name: 'Rosa', id: 13 },
  { name: 'Milla', id: 14 },
  { name: 'Ranu', id: 15 },
  { name: 'Eve', id: 16 },
  { name: 'Venla', id: 17 },
  { name: 'Alissa', id: 18 },
  { name: 'Elle', id: 19 },
  { name: 'Lara', id: 20 },
  { name: 'Elli', id: 21 }
];

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  getPersonById(id: number): Person {
    return people.find(person => person.id === id)!;
  }

  getPeopleForChoreography(choreographyId: number): Person[] {
    return people;
  }
}
