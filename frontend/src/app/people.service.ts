import { Injectable } from '@angular/core';
import { Person } from './people';

const people: Person[] = [
  { name: 'Roope', id: 1 },
  { name: 'Olli', id: 2 },
  { name: 'Darya', id: 3 },
  { name: 'Arina', id: 4 },
  { name: 'Ansku', id: 5 },
  { name: 'Kimi', id: 6 },
  { name: 'Kille', id: 7 },
  { name: 'Kimara', id: 8 },
  { name: 'Katri', id: 9 },
  { name: 'Lasso', id: 10 },
  { name: 'Anna', id: 11 },
  { name: 'Vilho', id: 12 },
  { name: 'Väinö', id: 13 },
  { name: 'Jaana', id: 14 },
  { name: 'Ville', id: 15 },
  { name: 'Niina', id: 16 },
  { name: 'Marjo', id: 17 },
  { name: 'Napoleon', id: 18 },
  { name: 'Maria', id: 19 },
  { name: 'Kari', id: 20 },
  { name: 'Sari', id: 21 },
  { name: 'Antti', id: 22 },
  { name: 'Janne', id: 23 },
  { name: 'Teppo', id: 24 },
  { name: 'Matti', id: 25 },
  { name: 'Joonas', id: 26 },
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
