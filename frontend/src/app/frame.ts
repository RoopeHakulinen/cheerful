import { ChoreographyItem } from './choreography-item';

export type FrameType = 'content' | 'transition';

export interface Frame {
  name: string;
  type: FrameType;
  duration: number;
  grid: ChoreographyItem[];
  notes: string;
}

export function isContentFrame(frame: Frame): boolean {
  return frame.type === 'content';
}

export function isTransitionFrame(frame: Frame): boolean {
  return frame.type === 'transition';
}
