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
  { id: 1, name: 'Ponnista', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2, tags: [tags[1],tags[0]] },
  { id: 2, name: 'Laskeudu', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1, tags: [] },
];

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent {
  availableExercises = exercises;
}
