import { ChoreographySign } from './choreography-sign';
import { ChoreographyGroup } from './choreography-group';

export interface ChoreographyItem {
  text: string | ChoreographyGroup;
  color: string;
  shape: 'box' | 'rounded';
  position: ['top' | 'center' | 'bottom', 'left' | 'center' | 'right'];
  sign?: ChoreographySign;
}
