interface ChoreographyGroupStructure {
  type: GroupType;
}

export interface TwoGroup extends ChoreographyGroupStructure {
  type: 'two';
  takari: string;
  eturi: string;
}

export interface ThreeGroup extends ChoreographyGroupStructure {
  type: 'three';
  takari: string;
  eturi: string;
  kokari: string;
}

export interface FourGroup extends ChoreographyGroupStructure {
  type: 'four';
  takari: string;
  eturi: string;
  kokari: string;
  nekari: string;
}

export type ChoreographyGroup = TwoGroup | ThreeGroup | FourGroup;

export type GroupType = 'two' | 'three' | 'four';

export function createEmptyGroup(groupType: GroupType): ChoreographyGroup {
  if (groupType === 'two') {
    return {
      type: 'two',
      eturi: '',
      takari: ''
    };
  } else if (groupType === 'three') {
    return {
      type: 'three',
      eturi: '',
      takari: '',
      kokari: ''
    };
  } else if (groupType === 'four') {
    return {
      type: 'four',
      eturi: '',
      takari: '',
      kokari: '',
      nekari: ''
    };
  } else {
    throw `No group type ${groupType} exists`;
  }
}
