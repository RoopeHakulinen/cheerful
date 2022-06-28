import { Component } from '@angular/core';
import { tags, Tag } from '../tags/tags.component';

export interface Exercise {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  tags: Tag[];
}

export const exercises: Exercise[] = [
  { id: 1, name: 'Ponnista', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 3, tags: [tags[0], tags[1]] },
  { id: 2, name: 'Laskeudu', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 3, tags: [tags[3]] },
  { id: 3, name: 'Seiso', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [] },
  { id: 4, name: 'Kävele', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [tags[2], tags[3]] },
  { id: 5, name: 'Punnerra', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [tags[0], tags[3]] },
  { id: 6, name: 'Kyykkää', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [tags[2], tags[3]] },
  { id: 7, name: 'Lankuta', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [tags[0], tags[3]] },
  { id: 8, name: 'Hölkkää', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [tags[0], tags[3]] },
  { id: 9, name: 'Juokse', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 4, tags: [tags[0], tags[3], tags[2]] },
  { id: 10, name: 'Roiku', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 4, tags: [tags[0], tags[3]] },
  { id: 11, name: 'Hyppää', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [tags[0], tags[1], tags[3]] },
  { id: 12, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [] },
  { id: 13, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [] },
  { id: 14, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [] },
  { id: 15, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [] },
  { id: 16, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [] },
  { id: 17, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [] },
  { id: 18, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [] },
  { id: 19, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [] },
  { id: 20, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [] },
  { id: 21, name: 'Testi', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [] }
];

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent {
  availableExercises = exercises;
}
