import { ChoreographySign } from './choreography-sign';
import { ChoreographyGroup } from './choreography-group';

export type Content = string | ChoreographyGroup | null;

export interface ChoreographyItem {
  content: Content;
  color: string;
  shape: 'box' | 'rounded';
  position: ['top' | 'center' | 'bottom', 'left' | 'center' | 'right'];
  sign?: ChoreographySign;
}

export function clearItem(item: ChoreographyItem): void {
  item.content = null;
  item.color = '';
  item.position = ['center', 'center'];
  item.sign = { text: '', color: '' };
}
