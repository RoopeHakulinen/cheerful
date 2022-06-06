import { Component } from '@angular/core';
import { Exercise } from '../exercises/exercises.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent {
  exercise!: Exercise;

  constructor() {
  }

}
