import { Carpet } from './carpet';
import { Frame } from './frame';
import { Person } from './people';

export interface ChoreographyPerson {
  person: Person;
  color: string | null;
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
