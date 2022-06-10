import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise, exercises } from '../exercises/exercises.component';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent {

  exercise: Exercise = {
    id: Math.floor(Math.random() * 1000),
    name: '',
    description: '',
    difficulty: 1,
    tags: []
  }

  constructor(private router: Router, private route: ActivatedRoute) { }

  createExercise(exercise: Exercise): void {
    exercises.push(exercise);
    this.router.navigate(['/exercises/' + this.exercise.id]);
  }
}
