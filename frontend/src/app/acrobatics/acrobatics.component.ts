import { Component } from '@angular/core';

export interface Exercise {
  id: number;
  name: string;
  description: string;
}

export interface Acrobatic {
  id: number;
  name: string;
  description: string;
  icon: string;
  difficulty: number;
  exercises: Exercise[];
}

export const acrobatics: Acrobatic[] = [
  {
    id: 1, name: 'JUMP', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'settings_accessibility', difficulty: 2, exercises: [
      { id: 1, name: 'Ponnista', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.' },
      { id: 2, name: 'Laskeudu', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.' }
    ]
  },
  { id: 2, name: 'STAND', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'accessibility', difficulty: 1, exercises: [] },
  { id: 3, name: 'WALK', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'directions_walk', difficulty: 1, exercises: [] },
  { id: 4, name: 'RUN', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'directions_run', difficulty: 2, exercises: [] },
  { id: 5, name: 'WAVE', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'emoji_people', difficulty: 1, exercises: [] },
  { id: 6, name: 'THROW', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'sports_handball', difficulty: 3, exercises: [] },
  { id: 7, name: 'LIFT', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', icon: 'sports_kabaddi', difficulty: 4, exercises: [] },
]

@Component({
  selector: 'app-acrobatics',
  templateUrl: './acrobatics.component.html',
  styleUrls: ['./acrobatics.component.scss'],
})
export class AcrobaticsComponent {
  availableAcrobatics = acrobatics;
}
