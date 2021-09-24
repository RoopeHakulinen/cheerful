interface ChoreographyGroupStructure {
  type: 'two' | 'three' | 'four';
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
  toinen_eturi: string;
}

export interface FourGroup extends ChoreographyGroupStructure {
  type: 'four';
  takari: string;
  eturi: string;
  toinen_eturi: string;
}

export type ChoreographyGroup = TwoGroup | ThreeGroup | FourGroup;
