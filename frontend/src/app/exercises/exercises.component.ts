import { Component } from '@angular/core';

export interface Exercise {
  id: number;
  name: string;
  description: string;
  difficulty: number;
}

export const exercises: Exercise[] = [
  { id: 1, name: 'Ponnista', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 2 },
  { id: 2, name: 'Laskeudu', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor eget felis vitae dictum.', difficulty: 1 }
];

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent {
  availableExercises = exercises;
}
