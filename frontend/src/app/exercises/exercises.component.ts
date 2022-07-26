import { Component } from '@angular/core';
import { QueryOutput } from 'rx-query';
import { Observable } from 'rxjs';
import { ExerciseService } from '../exercise.service';
import { Tag } from '../tags/tags.component';

export interface Exercise {
  id: number;
  name: string;
  description: string;
  difficulty: number;
  tags: Tag[];
}

export type ExerciseToBeCreated = Omit<Exercise, 'id'>;

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent {
  
  exercises$: Observable<QueryOutput<Exercise[]>>;

  constructor(public exerciseService: ExerciseService) {
    this.exercises$ = this.exerciseService.getExercises();
  }
}
