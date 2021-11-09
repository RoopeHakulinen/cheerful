import { Injectable } from '@angular/core';
import { Person } from './people';

const people: Person[] = [
  { name: '1', id: 1 },
  { name: '2', id: 2 },
  { name: '3', id: 3 },
  { name: '4', id: 4 },
  { name: '5', id: 5 },
  { name: '6', id: 6 },
  { name: '7', id: 7 },
  { name: '8', id: 8 },
  { name: '9', id: 9 },
  { name: '10', id: 10 },
  { name: '11', id: 11 },
  { name: '12', id: 12 },
  { name: '13', id: 13 },
  { name: '14', id: 14 },
  { name: '15', id: 15 },
  { name: '16', id: 16 },
  { name: '17', id: 17 },
  { name: '18', id: 18 },
  { name: '19', id: 19 },
  { name: '20', id: 20 },
  { name: '21', id: 21 },
  { name: '22', id: 22 },
  { name: '23', id: 23 },
  { name: '24', id: 24 }
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
