import { Carpet } from './carpet';
import { ChoreographyFrame } from './choreography-frame';

export interface Choreography {
  id: number;
  name: string;
  team: string;
  frames: ChoreographyFrame[];
  people: string[];
  carpet: Carpet;
}
