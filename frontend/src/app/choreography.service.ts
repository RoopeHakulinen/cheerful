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
        { name: 'Roope', color: '#5151b8' },
        { name: 'Olli', color: '#5151b8' },
        { name: 'Darya', color: '#5151b8' },
        { name: 'Arina', color: '#5151b8' },
        { name: 'Ansku', color: '#5151b8' },
        { name: 'Kimi', color: '#5151b8' },
        { name: 'Kille', color: '#5151b8' },
        { name: 'Kimara', color: '#5151b8' },
        { name: 'Katri', color: '#5151b8' },
        { name: 'Lasso', color: '#5151b8' },
        { name: 'Anna', color: '#5151b8' },
        { name: 'Vilho', color: '#5151b8' },
        { name: 'Väinö', color: '#5151b8' },
        { name: 'Jaana', color: '#5151b8' },
        { name: 'Ville', color: '#5151b8' },
        { name: 'Niina', color: '#5151b8' },
        { name: 'Marjo', color: '#5151b8' },
        { name: 'Napoleon', color: '#5151b8' },
        { name: 'Maria', color: '#5151b8' },
        { name: 'Kari', color: '#5151b8' },
        { name: 'Sari', color: '#5151b8' },
        { name: 'Antti', color: '#5151b8' },
        { name: 'Janne', color: '#5151b8' },
        { name: 'Teppo', color: '#5151b8' },
        { name: 'Matti', color: '#5151b8' },
        { name: 'Joonas', color: '#5151b8' }
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
        { name: 'Roope', color: '#5151b8' },
        { name: 'Olli', color: '#5151b8' },
        { name: 'Darya', color: '#5151b8' },
        { name: 'Arina', color: '#5151b8' },
        { name: 'Ansku', color: '#5151b8' },
        { name: 'Kimi', color: '#5151b8' },
        { name: 'Kille', color: '#5151b8' },
        { name: 'Katri', color: '#5151b8' },
        { name: 'Lasso', color: '#5151b8' },
        { name: 'Anna', color: '#5151b8' },
        { name: 'Vilho', color: '#5151b8' },
        { name: 'Väinö', color: '#5151b8' },
        { name: 'Jaana', color: '#5151b8' },
        { name: 'Ville', color: '#5151b8' },
        { name: 'Niina', color: '#5151b8' },
        { name: 'Marjo', color: '#5151b8' },
        { name: 'Napoleon', color: '#5151b8' },
        { name: 'Maria', color: '#5151b8' },
        { name: 'Kari', color: '#5151b8' },
        { name: 'Sari', color: '#5151b8' },
        { name: 'Antti', color: '#5151b8' },
        { name: 'Janne', color: '#5151b8' },
        { name: 'Teppo', color: '#5151b8' },
        { name: 'Matti', color: '#5151b8' },
        { name: 'Joonas', color: '#5151b8' }
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
    return timer(500).pipe(mapTo(this.choreographies.find(choreography => choreography.id === id)!));
  }

}
