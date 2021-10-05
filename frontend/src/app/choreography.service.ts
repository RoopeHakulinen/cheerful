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
      people: [
        'Roope',
        'Olli',
        'Darya',
        'Arina',
        'Ansku',
        'Kimi',
        'Kille',
        'Kimara',
        'Katri',
        'Lasso',
        'Anna',
        'Vilho',
        'Väinö',
        'Jaana',
        'Ville',
        'Niina',
        'Marjo',
        'Napoleon',
        'Maria',
        'Kari',
        'Sari',
        'Antti',
        'Janne',
        'Teppo',
        'Matti',
        'Joonas',
      ],
      frames: [{
        subframes: JSON.parse(JSON.stringify(TEST_FRAMES)),
        notes: ''
      }, { subframes: JSON.parse(JSON.stringify(TEST_FRAMES)), notes: '' },
        {
          subframes: JSON.parse(JSON.stringify(TEST_FRAMES)),
          notes: ''
        }, { subframes: JSON.parse(JSON.stringify(TEST_FRAMES)), notes: '' }, {
          subframes: JSON.parse(JSON.stringify(TEST_FRAMES)),
          notes: ''
        }, { subframes: JSON.parse(JSON.stringify(TEST_FRAMES)), notes: '' },
        {
          subframes: JSON.parse(JSON.stringify(TEST_FRAMES)),
          notes: ''
        }, { subframes: JSON.parse(JSON.stringify(TEST_FRAMES)), notes: '' }],
      carpet: {
        color: '#5151b8',
        height: 12,
        width: 12,
        horizontalSegments: 12,
        verticalSegments: 6
      }
    },
    {
      id: 2,
      name: 'EM-karsinnat',
      team: 'Flames',
      people: [
        'Roope',
        'Olli',
        'Darya',
        'Arina',
        'Ansku',
        'Kimi',
        'Kille',
        'Kimara',
        'Katri',
        'Lasso',
        'Anna',
        'Vilho',
        'Väinö',
        'Jaana',
        'Ville',
        'Niina',
        'Marjo',
        'Napoleon',
        'Maria',
        'Kari',
        'Sari',
        'Antti',
        'Janne',
        'Teppo',
        'Matti',
        'Joonas',
      ],
      frames: [{
        subframes: JSON.parse(JSON.stringify(TEST_FRAMES)),
        notes: ''
      }, { subframes: JSON.parse(JSON.stringify(TEST_FRAMES)), notes: '' },
        {
          subframes: JSON.parse(JSON.stringify(TEST_FRAMES)),
          notes: ''
        }, { subframes: JSON.parse(JSON.stringify(TEST_FRAMES)), notes: '' }, {
          subframes: JSON.parse(JSON.stringify(TEST_FRAMES)),
          notes: ''
        }, { subframes: JSON.parse(JSON.stringify(TEST_FRAMES)), notes: '' },
        {
          subframes: JSON.parse(JSON.stringify(TEST_FRAMES)),
          notes: ''
        }, { subframes: JSON.parse(JSON.stringify(TEST_FRAMES)), notes: '' }],
      carpet: {
        color: '#5151b8',
        height: 8,
        width: 8,
        horizontalSegments: 8,
        verticalSegments: 4
      }
    }];

  constructor() {
  }

  getChoreographies(): Observable<Choreography[]> {
    return timer(1000).pipe(mapTo(this.choreographies));
  }

  getChoreographiesById(id: number): Observable<Choreography> {
    return timer(500).pipe(mapTo(this.choreographies[id - 1]));
  }

}
