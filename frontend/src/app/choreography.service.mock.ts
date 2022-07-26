import { Injectable } from '@angular/core';
import { map, Observable, of, timer } from 'rxjs';
import { Choreography } from './choreography';
import { ChoreographyItem } from './choreography-item';

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

  getChoreographies(): Observable<Choreography[]> {
    return of({status: 'success', data: this.choreographies} as any);
  }

  getChoreographyById(id: number): Observable<Choreography> {
    return of(this.choreographies.find(choreography => choreography.id === id)!);
  }

  updateChoreography(choreography: Choreography): Observable<Choreography> {
    return of(choreography);
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
}
