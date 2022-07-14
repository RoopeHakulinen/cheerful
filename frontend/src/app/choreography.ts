import { Carpet } from './carpet';
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

export function createDeepCopy(choreography: any): any {
  return JSON.parse(JSON.stringify(choreography));
}
