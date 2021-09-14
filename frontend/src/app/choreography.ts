import {Carpet} from './carpet';
import {ChoreographyFrame} from './choreography-frame';

export interface Choreography {
  name: string;
  team: string;
  frames: ChoreographyFrame[];
  people: string[];
  carpet: Carpet;
}
