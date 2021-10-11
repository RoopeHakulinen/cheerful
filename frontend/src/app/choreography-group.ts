import { Content } from './choreography-item';
import { Person } from './people';

interface ChoreographyGroupStructure {
  type: GroupType;
  groupColor: string | null;
}

export interface TwoGroup extends ChoreographyGroupStructure {
  type: 'two';
  flyer: Person | null;
  backspot: Person | null;
}

export interface ThreeGroup extends ChoreographyGroupStructure {
  type: 'three';
  flyer: Person | null;
  backspot: Person | null;
  mainbase: Person | null;
}

export interface FourGroup extends ChoreographyGroupStructure {
  type: 'four';
  flyer: Person | null;
  backspot: Person | null;
  mainbase: Person | null;
  sidebase: Person | null;
}

export interface FiveGroup extends ChoreographyGroupStructure {
  type: 'five';
  flyer: Person | null;
  backspot: Person | null;
  mainbase: Person | null;
  sidebase: Person | null;
  frontspot: Person | null;
}

export type ChoreographyGroup = TwoGroup | ThreeGroup | FourGroup | FiveGroup;

export type GroupType = 'two' | 'three' | 'four' | 'five';

export const availableGroupTypes: GroupType[] = ['two', 'three', 'four', 'five'];

export function createEmptyGroup(groupType: GroupType): ChoreographyGroup {
  if (groupType === 'two') {
    return {
      type: 'two',
      groupColor: null,
      flyer: null,
      backspot: null
    };
  } else if (groupType === 'three') {
    return {
      type: 'three',
      groupColor: null,
      flyer: null,
      backspot: null,
      mainbase: null
    };
  } else if (groupType === 'four') {
    return {
      type: 'four',
      groupColor: null,
      flyer: null,
      backspot: null,
      mainbase: null,
      sidebase: null
    };
  } else if (groupType === 'five') {
    return {
      type: 'five',
      groupColor: null,
      flyer: null,
      backspot: null,
      mainbase: null,
      sidebase: null,
      frontspot: null
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
  return content !== null && content.hasOwnProperty('type');
}

export function isPerson(content: Content): content is Person {
  return content !== null && content.hasOwnProperty('name');
}

export function getPeopleFromGroup(content: ChoreographyGroup): Person[] {
  let result: (Person | null)[] = [];
  if (isTwoGroup(content)) {
    result = [content.flyer, content.backspot];
  } else if (isThreeGroup(content)) {
    result = [content.flyer, content.backspot, content.mainbase];
  } else if (isFourGroup(content)) {
    result = [content.flyer, content.backspot, content.mainbase, content.sidebase];
  } else if (isFiveGroup(content)) {
    result = [content.flyer, content.backspot, content.mainbase, content.sidebase, content.frontspot];
  }
  return result.filter(person => person !== null) as Person[];
}
