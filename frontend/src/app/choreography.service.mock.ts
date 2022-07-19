import { Injectable } from '@angular/core';
import { map, Observable, timer } from 'rxjs';
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
    return timer(0).pipe(map(() => ({status: 'success', data: this.choreographies} as any)));
  }

  getChoreographyById(id: number): Observable<Choreography> {
    return timer(0).pipe(map(() => this.choreographies[0]));
  }

  updateChoreography(choreography: Choreography): Observable<Choreography> {
    return timer(0).pipe(map(() => choreography));
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
