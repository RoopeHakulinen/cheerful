import { ChoreographySign } from './choreography-sign';
import { ChoreographyGroup, getPeopleFromGroup, isGroup, isPerson } from './choreography-group';

export interface PersonContent {
  type: 'person';
  personId: number | null;
}

export type Content = PersonContent | ChoreographyGroup | null;

export interface ChoreographyItem {
  content: Content;
  sign?: ChoreographySign;
}

export function clearItem(item: ChoreographyItem): void {
  item.content = null;
  item.sign = { text: '', color: '' };
}

export function getPeopleForContent(content: Content): number[] {
  if (content === null) {
    return [];
  } else if (isPerson(content)) {
    return content.personId !== null ? [content.personId] : [];
  } else if (isGroup(content)) {
    return getPeopleFromGroup(content);
  } else {
    throw new Error(`Unknown tile content: ${JSON.stringify(content)}`);
  }
}
