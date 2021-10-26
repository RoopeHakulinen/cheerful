import { Carpet } from './carpet';
import { ChoreographyFrame } from './choreography-frame';

export interface ChoreographyPerson {
  personId: number;
  color: string | null;
}

export interface Choreography {
  id: number;
  name: string;
  team: string;
  frames: ChoreographyFrame[];
  carpet: Carpet;
  people: ChoreographyPerson[];
}

export function createDeepCopy(choreography: any): any {
  return JSON.parse(JSON.stringify(choreography));
}
