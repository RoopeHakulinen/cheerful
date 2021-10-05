import { Content } from './choreography-item';

interface ChoreographyGroupStructure {
  type: GroupType;
}

export interface TwoGroup extends ChoreographyGroupStructure {
  type: 'two';
  flyer: string;
  backspot: string;
}

export interface ThreeGroup extends ChoreographyGroupStructure {
  type: 'three';
  flyer: string;
  backspot: string;
  mainbase: string;
}

export interface FourGroup extends ChoreographyGroupStructure {
  type: 'four';
  flyer: string;
  backspot: string;
  mainbase: string;
  sidebase: string;
}

export interface FiveGroup extends ChoreographyGroupStructure {
  type: 'five';
  flyer: string;
  backspot: string;
  mainbase: string;
  sidebase: string;
  frontspot: string;
}

export type ChoreographyGroup = TwoGroup | ThreeGroup | FourGroup | FiveGroup;

export type GroupType = 'two' | 'three' | 'four' | 'five';

export const availableGroupTypes: GroupType[] = ['two', 'three', 'four', 'five'];

export function createEmptyGroup(groupType: GroupType): ChoreographyGroup {
  if (groupType === 'two') {
    return {
      type: 'two',
      flyer: '',
      backspot: ''
    };
  } else if (groupType === 'three') {
    return {
      type: 'three',
      flyer: '',
      backspot: '',
      mainbase: ''
    };
  } else if (groupType === 'four') {
    return {
      type: 'four',
      flyer: '',
      backspot: '',
      mainbase: '',
      sidebase: ''
    };
  } else if (groupType === 'five') {
    return {
      type: 'five',
      flyer: '',
      backspot: '',
      mainbase: '',
      sidebase: '',
      frontspot: ''
    };
  } else {
    throw `No group type ${groupType} exists`;
  }
}

export function isTwoGroup(content: Content): content is TwoGroup {
  if (typeof content === 'string' || content === null) {
    return false;
  }
  return content.type === 'two';
}

export function isThreeGroup(content: Content): content is ThreeGroup {
  if (typeof content === 'string' || content === null) {
    return false;
  }
  return content.type === 'three';
}

export function isFourGroup(content: Content): content is FourGroup {
  if (typeof content === 'string' || content === null) {
    return false;
  }
  return content.type === 'four';
}

export function isFiveGroup(content: Content): content is FiveGroup {
  if (typeof content === 'string' || content === null) {
    return false;
  }
  return content.type === 'five';
}

export function isActiveItemGroup(content: Content): boolean {
  return typeof content !== 'string' && content !== null;
}
