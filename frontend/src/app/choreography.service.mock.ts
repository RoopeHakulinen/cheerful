import { Injectable } from '@angular/core';
import { QueryOutput } from 'rx-query';
import { BehaviorSubject, map, Observable, of, timer } from 'rxjs';
import { Choreography } from './choreography';
import { ChoreographyItem } from './choreography-item';
import { updateAllAttributes } from './utils';

@Injectable()
export class ChoreographyServiceMock {
  choreographies: Choreography[] = [
    {
      id: 1,
      name: 'SM-karsinnat',
      teamId: 1,
      frames: [
        {
          name: 'Alkutila',
          type: 'content',
          duration: 2,
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
      choreographyPerson: [{ color: 'red', personId: 1 }],
    },
  ];

  choreographiesSubject = new BehaviorSubject<QueryOutput<Choreography[]>>({status: 'success', data: this.choreographies} as any);

  getChoreographies(): Observable<QueryOutput<Choreography[]>> {
    return this.choreographiesSubject.asObservable();
  }

  getChoreographyById(id: number): Observable<Choreography> {
    return of(this.choreographies.find(choreography => choreography.id === id)!);
  }

  updateChoreography(choreography: Choreography): Observable<Choreography> {
    const foundChoreography = this.choreographies.find(existingChoreography => existingChoreography.id === choreography.id)!;
    updateAllAttributes(choreography, foundChoreography);
    this.choreographiesSubject.next({status: 'success', data: this.choreographies} as any);
    return of(foundChoreography);
  }

  generateGrid(): ChoreographyItem[] {
    return Array(12 * 12)
      .fill(null)
      .map(() => ({
        content: null,
        shape: 'rounded',
        position: 'center',
      }));
  }

  createChoreography(): Observable<Choreography> {
    const newChoreography: Choreography = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: 'Uusi koreografia',
      teamId: 1,
      frames: [
        {
          name: 'Alkutila',
          type: 'content',
          duration: 2,
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
      choreographyPerson: [{ color: 'red', personId: 1 }],
    };
    this.choreographies.push(newChoreography);
    this.choreographiesSubject.next({status: 'success', data: this.choreographies} as any);
    return of(newChoreography);
  }

  deleteChoreographyById(id: number): Observable<Choreography> {
    const foundChoreography = this.choreographies.find(existingChoreography => existingChoreography.id === id)!;
    this.choreographies = this.choreographies.filter(choreography => choreography.id !== id);
    this.choreographiesSubject.next({status: 'success', data: this.choreographies} as any);
    return of(foundChoreography);
  }
}
