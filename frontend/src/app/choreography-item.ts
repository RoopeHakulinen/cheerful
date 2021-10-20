import { ChoreographySign } from './choreography-sign';
import { ChoreographyGroup } from './choreography-group';

export interface PersonContent {
  type: 'person';
  personId: number;
}

export type Content = PersonContent | ChoreographyGroup | null;

export interface ChoreographyItem {
  content: Content;
  shape: 'box' | 'rounded';
  position: ['top' | 'center' | 'bottom', 'left' | 'center' | 'right'];
  sign?: ChoreographySign;
}

export function clearItem(item: ChoreographyItem): void {
  item.content = null;
  item.position = ['center', 'center'];
  item.sign = { text: '', color: '' };
}
