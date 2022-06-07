import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise, exercises } from '../exercises/exercises.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent {
  
  exercise!: Exercise;

  constructor(private route: ActivatedRoute) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.exercise = exercises.find(exercise => exercise.id === id)!;
  }
}
