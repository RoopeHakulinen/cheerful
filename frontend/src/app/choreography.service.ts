import { Injectable } from '@angular/core';
import { mapTo, Observable, timer } from 'rxjs';
import { Choreography } from './choreography';
import { TEST_FRAMES } from './testFrames';

@Injectable()
export class ChoreographyService {

  choreographies: Choreography[] = [
    {
      id: 1,
      name: 'SM-karsinnat',
      team: 'Flames',
      frames: [{
        subframes: JSON.parse(JSON.stringify(TEST_FRAMES)),
        notes: '',
      }, { subframes: JSON.parse(JSON.stringify(TEST_FRAMES)), notes: '' },
        {
          subframes: JSON.parse(JSON.stringify(TEST_FRAMES)),
          notes: '',
        }, { subframes: JSON.parse(JSON.stringify(TEST_FRAMES)), notes: '' }, {
          subframes: JSON.parse(JSON.stringify(TEST_FRAMES)),
          notes: '',
        }, { subframes: JSON.parse(JSON.stringify(TEST_FRAMES)), notes: '' },
        {
          subframes: JSON.parse(JSON.stringify(TEST_FRAMES)),
          notes: '',
        }, { subframes: JSON.parse(JSON.stringify(TEST_FRAMES)), notes: '' }],
      carpet: {
        color: '#5151b8',
        height: 12,
        width: 12,
        horizontalSegments: 12,
        verticalSegments: 6,
      },
      people: [
        { personId: 1, color: '#ff0000' },
        { personId: 2, color: '#00ff00' },
        { personId: 3, color: '#0000ff' },
        { personId: 4, color: '#880000' },
        { personId: 5, color: '#220000' },
      ],
    },
    {
      id: 2,
      name: 'EM-karsinnat',
      team: 'Flames',
      frames: [{
        subframes: JSON.parse(JSON.stringify(TEST_FRAMES)),
        notes: '',
      }],
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
    return timer(500).pipe(mapTo(this.choreographies.find(choreography => choreography.id === id)!));
  }

}
