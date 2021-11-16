import { Carpet } from './carpet';
import { Frame } from './frame';

export interface ChoreographyPerson {
  personId: number;
  color: string | null;
  choreographies?: number[];
}

export interface Choreography {
  id: number;
  name: string;
  team: string;
  frames: Frame[];
  carpet: Carpet;
  people: ChoreographyPerson[];
}

export function createDeepCopy(choreography: any): any {
  return JSON.parse(JSON.stringify(choreography));
}
