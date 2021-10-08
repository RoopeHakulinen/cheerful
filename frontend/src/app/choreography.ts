import { Carpet } from './carpet';
import { ChoreographyFrame } from './choreography-frame';
import { Person } from './people';

export interface Choreography {
  id: number;
  name: string;
  team: string;
  frames: ChoreographyFrame[];
  people: Person[];
  carpet: Carpet;
}
