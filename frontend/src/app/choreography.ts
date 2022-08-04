import { Carpet } from './carpet';
import { ChoreographyItem } from './choreography-item';
import { Frame } from './frame';

export interface ChoreographyPerson {
  personId: number;
  color: string | null;
}

export interface Choreography {
  id: number;
  name: string;
  teamId: number;
  frames: Frame[];
  carpet: Carpet;
  choreographyPerson: ChoreographyPerson[];
}

export type ChoreographyToBeCreated = Omit<Choreography, 'id'>;

export function createDeepCopy(choreography: any): any {
  return JSON.parse(JSON.stringify(choreography));
}

function generateGrid(): ChoreographyItem[] {
    return Array(12 * 12)
      .fill(null)
      .map(() => ({
        content: null,
        shape: 'rounded',
        position: 'center',
      }));
}

export function createChoreography(): ChoreographyToBeCreated {
  return {
  name: 'Uusi koreografia',
  teamId: 16,
  frames: [
    {
      name: 'Alkutila',
      type: 'content',
      duration: 2,
      grid: generateGrid(),
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
  choreographyPerson: [],
  };
};
