import { ChoreographySign } from './choreography-sign';
import { ChoreographyGroup, getPeopleFromGroup, isPerson } from './choreography-group';

export interface PersonContent {
  type: 'person';
  personId: number;
}

export type Content = PersonContent | ChoreographyGroup | null;

export interface ChoreographyItem {
  content: Content;
  shape: 'box' | 'rounded';
  position: 'left' | 'center' | 'right';
  sign?: ChoreographySign;
}

export function clearItem(item: ChoreographyItem): void {
  item.content = null;
  item.shape = 'box';
  item.position = 'center';
  item.sign = { text: '', color: '' };
}

export function getPeopleForContent(content: Content): number[] {
  if (content === null) {
    return [];
  }
  return isPerson(content) ? [content.personId] : getPeopleFromGroup(content);
}
