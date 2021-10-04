import { ChoreographySign } from './choreography-sign';
import { ChoreographyGroup } from './choreography-group';

export type Content = string | ChoreographyGroup | null;

export interface ChoreographyItem {
  text: Content;
  color: string;
  shape: 'box' | 'rounded';
  position: ['top' | 'center' | 'bottom', 'left' | 'center' | 'right'];
  sign?: ChoreographySign;
}
