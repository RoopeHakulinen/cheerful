import { Content, PersonContent } from './choreography-item';

interface ChoreographyGroupStructure {
  type: GroupType;
  color: string | null;
}

export interface TwoGroup extends ChoreographyGroupStructure {
  type: 'two';
  flyerId: number | null;
  backspotId: number | null;
}

export interface ThreeGroup extends ChoreographyGroupStructure {
  type: 'three';
  flyerId: number | null;
  backspotId: number | null;
  mainbaseId: number | null;
}

export interface FourGroup extends ChoreographyGroupStructure {
  type: 'four';
  flyerId: number | null;
  backspotId: number | null;
  mainbaseId: number | null;
  sidebaseId: number | null;
}

export interface FiveGroup extends ChoreographyGroupStructure {
  type: 'five';
  flyerId: number | null;
  backspotId: number | null;
  mainbaseId: number | null;
  sidebaseId: number | null;
  frontspotId: number | null;
}

export type ChoreographyGroup = TwoGroup | ThreeGroup | FourGroup | FiveGroup;

export type GroupType = 'two' | 'three' | 'four' | 'five';

export const availableGroupTypes: GroupType[] = ['two', 'three', 'four', 'five'];

export function createEmptyGroup(groupType: GroupType): ChoreographyGroup {
  if (groupType === 'two') {
    return {
      type: 'two',
      color: null,
      flyerId: null,
      backspotId: null,
    };
  } else if (groupType === 'three') {
    return {
      type: 'three',
      color: null,
      flyerId: null,
      backspotId: null,
      mainbaseId: null,
    };
  } else if (groupType === 'four') {
    return {
      type: 'four',
      color: null,
      flyerId: null,
      backspotId: null,
      mainbaseId: null,
      sidebaseId: null,
    };
  } else if (groupType === 'five') {
    return {
      type: 'five',
      color: null,
      flyerId: null,
      backspotId: null,
      mainbaseId: null,
      sidebaseId: null,
      frontspotId: null,
    };
  } else {
    throw `No group type ${groupType} exists`;
  }
}

export function isTwoGroup(content: Content): content is TwoGroup {
  if (!isGroup(content)) {
    return false;
  }
  return content.type === 'two';
}

export function isThreeGroup(content: Content): content is ThreeGroup {
  if (!isGroup(content)) {
    return false;
  }
  return content.type === 'three';
}

export function isFourGroup(content: Content): content is FourGroup {
  if (!isGroup(content)) {
    return false;
  }
  return content.type === 'four';
}

export function isFiveGroup(content: Content): content is FiveGroup {
  if (!isGroup(content)) {
    return false;
  }
  return content.type === 'five';
}

export function isGroup(content: Content): content is ChoreographyGroup {
  return content !== null && !isPerson(content);
}

export function isPerson(content: Content): content is PersonContent {
  return content !== null && content.type === 'person';
}

export function getPeopleFromGroup(content: ChoreographyGroup): number[] {
  let result: (number | null)[] = [];
  if (isTwoGroup(content)) {
    result = [content.flyerId, content.backspotId];
  } else if (isThreeGroup(content)) {
    result = [content.flyerId, content.backspotId, content.mainbaseId];
  } else if (isFourGroup(content)) {
    result = [content.flyerId, content.backspotId, content.mainbaseId, content.sidebaseId];
  } else if (isFiveGroup(content)) {
    result = [content.flyerId, content.backspotId, content.mainbaseId, content.sidebaseId, content.frontspotId];
  }
  return result.filter((personId) => personId !== null) as number[];
}

export function removePersonFromGroup(content: TwoGroup | ThreeGroup | FourGroup | FiveGroup, personId: number): void {
  function clear(content: any, position: string, personId: number): void {
    if (content.hasOwnProperty(position) && content[position] === personId) {
      content[position] = null;
    }
  }

  clear(content, 'flyerId', personId);
  clear(content, 'backspotId', personId);
  clear(content, 'mainbaseId', personId);
  clear(content, 'sidebaseId', personId);
  clear(content, 'frontspotId', personId);
}

export function changePersonInGroup(personId: number, groupPosition: string, group: Content): void {
  if (group === null) {
    return;
  }
  if (groupPosition === 'flyer' && isGroup(group)) {
    group.flyerId = personId;
  } else if (groupPosition === 'backspot' && isGroup(group)) {
    group.backspotId = personId;
  } else if (groupPosition === 'mainbase' && (isThreeGroup(group) || isFourGroup(group) || isFiveGroup(group))) {
    group.mainbaseId = personId;
  } else if (groupPosition === 'sidebase' && (isFourGroup(group) || isFiveGroup(group))) {
    group.sidebaseId = personId;
  } else if (groupPosition === 'frontspot' && isFiveGroup(group)) {
    group.frontspotId = personId;
  }
}
