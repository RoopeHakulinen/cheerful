import { Injectable } from '@angular/core';
import { mapTo, Observable, timer } from 'rxjs';
import { Choreography, createDeepCopy } from './choreography';
import { TEST_FRAMES } from './testFrames';

@Injectable()
export class ChoreographyService {

  choreographies: Choreography[] = [
    {
      id: 1,
      name: 'SM-karsinnat',
      team: 'Flames',
      frames: createDeepCopy(TEST_FRAMES),
      carpet: {
        color: '#5151b8',
        height: 12,
        width: 12,
        horizontalSegments: 12,
        verticalSegments: 6,
      },
      people: [
        { personId: 1, color: '#2F8F9F' },
        { personId: 2, color: '#2F8F9F' },
        { personId: 3, color: '#2F8F9F' },
        { personId: 4, color: '#2F8F9F' },
        { personId: 5, color: '#2F8F9F' },
        { personId: 6, color: '#2F8F9F' },
        { personId: 7, color: '#2F8F9F' },
        { personId: 8, color: '#2F8F9F' },
        { personId: 9, color: '#2F8F9F' },
        { personId: 10, color: '#2F8F9F' },
        { personId: 11, color: '#2F8F9F' },
        { personId: 12, color: '#2F8F9F' },
        { personId: 13, color: '#2F8F9F' },
        { personId: 14, color: '#2F8F9F' },


      ],
    },
    {
      id: 2,
      name: 'EM-karsinnat',
      team: 'Flames',
      frames: createDeepCopy(TEST_FRAMES),
      carpet: {
        color: '#5151b8',
        height: 8,
        width: 8,
        horizontalSegments: 8,
        verticalSegments: 4,
      },
      people: [],
    },
  ];

  constructor() {
  }

  getChoreographies(): Observable<Choreography[]> {
    return timer(1000).pipe(mapTo(this.choreographies));
  }

  getChoreographiesById(id: number): Observable<Choreography> {
    return timer(0).pipe(mapTo(this.choreographies.find(choreography => choreography.id === id)!));
  }
}
