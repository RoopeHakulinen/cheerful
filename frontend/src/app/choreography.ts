import { Carpet } from './carpet';
import { ChoreographyItem } from './choreography-item';
import { Frame, FrameType } from './frame';

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

function generateGrid(height: number, width: number): ChoreographyItem[] {
  return Array(height * width)
    .fill(null)
    .map(() => ({
      content: null,
      shape: 'rounded',
      position: 'center',
    }));
}

export function createEmptyFrame(
  name: string,
  duration: number,
  type: FrameType,
  height: number,
  width: number,
): Frame {
  return {
    name,
    type,
    duration,
    grid: generateGrid(height, width),
    notes: '',
  };
}

export function createChoreography(height: number, width: number): ChoreographyToBeCreated {
  return {
    name: 'Uusi koreografia',
    teamId: 1,
    frames: [
      {
        name: 'Alkutila',
        type: 'content',
        duration: 2,
        grid: generateGrid(height, width),
        notes: '',
      },
    ],
    carpet: {
      color: 'rgb(46, 46, 46)',
      height: height,
      width: width,
      verticalSegments: height,
      horizontalSegments: width,
    },
    choreographyPerson: [],
  };
}
