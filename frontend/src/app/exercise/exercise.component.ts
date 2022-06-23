import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise, exercises } from '../exercises/exercises.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent {

  exercise!: Exercise;

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.exercise = exercises.find(exercise => exercise.id === id)!;
  }

  copyAndCreateNewExercise(): void {
    this.router.navigate(
      ['/app/exercises/new'],
      { queryParams: { name: this.exercise.name, description: this.exercise.description, difficulty: this.exercise.difficulty, tags: this.exercise.tags.map(tag => tag.id) } }
    );
  }
}
