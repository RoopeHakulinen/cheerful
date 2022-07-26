import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercises/exercises.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent {

  exercise$!: Observable<Exercise>;

  constructor(private route: ActivatedRoute, private router: Router, private exerciseService: ExerciseService) {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.exercise$ = this.exerciseService.getExerciseById(id);
  }

  copyAndCreateNewExercise(exercise: Exercise): void {
    this.router.navigate(
      ['/app/exercises/new'],
      { queryParams: { name: exercise.name, description: exercise.description, difficulty: exercise.difficulty, tags: exercise.tags.map(tag => tag.id) } }
    );
  }
}
