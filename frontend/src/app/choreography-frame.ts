import { ChoreographySubframe } from './choreography-subframe';

export interface ChoreographyFrame {
  subframes: ChoreographySubframe[];
  notes: string;
}
