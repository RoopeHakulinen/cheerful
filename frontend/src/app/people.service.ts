import { Injectable } from '@angular/core';
import { Person } from './people';

const people1: Person[] = [
  { name: 'Roope', id: 1, color: '#5151b8' },
  { name: 'Olli', id: 2, color: '#5151b8' },
  { name: 'Darya', id: 3, color: '#5151b8' },
  { name: 'Arina', id: 4, color: '#5151b8' },
  { name: 'Ansku', id: 5, color: '#5151b8' },
  { name: 'Kimi', id: 6, color: '#5151b8' },
  { name: 'Kille', id: 7, color: '#5151b8' },
  { name: 'Kimara', id: 8, color: '#5151b8' },
  { name: 'Katri', id: 9, color: '#5151b8' },
  { name: 'Lasso', id: 10, color: '#5151b8' },
  { name: 'Anna', id: 11, color: '#5151b8' },
  { name: 'Vilho', id: 12, color: '#5151b8' },
  { name: 'Väinö', id: 13, color: '#5151b8' },
  { name: 'Jaana', id: 14, color: '#5151b8' },
  { name: 'Ville', id: 15, color: '#5151b8' },
  { name: 'Niina', id: 16, color: '#5151b8' },
  { name: 'Marjo', id: 17, color: '#5151b8' },
  { name: 'Napoleon', id: 18, color: '#5151b8' },
  { name: 'Maria', id: 19, color: '#5151b8' },
  { name: 'Kari', id: 20, color: '#5151b8' },
  { name: 'Sari', id: 21, color: '#5151b8' },
  { name: 'Antti', id: 22, color: '#5151b8' },
  { name: 'Janne', id: 23, color: '#5151b8' },
  { name: 'Teppo', id: 24, color: '#5151b8' },
  { name: 'Matti', id: 25, color: '#5151b8' },
  { name: 'Joonas', id: 26, color: '#5151b8' },
];

const people2: Person[] = [
  { name: 'Roope', id: 1, color: '#5151b8' },
  { name: 'Olli', id: 2, color: '#5151b8' },
  { name: 'Darya', id: 3, color: '#5151b8' },
  { name: 'Arina', id: 4, color: '#5151b8' },
  { name: 'Ansku', id: 5, color: '#5151b8' },
  { name: 'Kimi', id: 6, color: '#5151b8' },
  { name: 'Kille', id: 7, color: '#5151b8' },
  { name: 'Katri', id: 8, color: '#5151b8' },
  { name: 'Lasso', id: 9, color: '#5151b8' },
  { name: 'Anna', id: 10, color: '#5151b8' },
  { name: 'Vilho', id: 11, color: '#5151b8' },
  { name: 'Väinö', id: 12, color: '#5151b8' },
  { name: 'Jaana', id: 13, color: '#5151b8' },
  { name: 'Ville', id: 14, color: '#5151b8' },
  { name: 'Niina', id: 15, color: '#5151b8' },
  { name: 'Marjo', id: 16, color: '#5151b8' },
  { name: 'Napoleon', id: 17, color: '#5151b8' },
  { name: 'Maria', id: 18, color: '#5151b8' },
  { name: 'Kari', id: 19, color: '#5151b8' },
  { name: 'Sari', id: 20, color: '#5151b8' },
  { name: 'Antti', id: 21, color: '#5151b8' },
  { name: 'Janne', id: 22, color: '#5151b8' },
  { name: 'Teppo', id: 23, color: '#5151b8' },
  { name: 'Matti', id: 24, color: '#5151b8' },
  { name: 'Joonas', id: 25, color: '#5151b8' },
];


@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  getPersonById(id: number): Person {
    return people1.find(person => person.id === id)!;
  }

  getPeopleForChoreography(choreographyId: number): Person[] {
    if (choreographyId === 1) {
      return people1;
    }
    return people2;
  }
}
