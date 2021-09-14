import {ChoreographySign} from './choreography-sign';

export interface ChoreographyItem {
  text: string;
  color: string;
  shape: 'box' | 'rounded';
  position: ['top' | 'center' | 'bottom', 'left' | 'center' | 'right'];
  sign?: ChoreographySign;
}
