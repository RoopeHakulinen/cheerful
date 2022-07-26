import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../exercise.service';
import { ExerciseToBeCreated } from '../exercises/exercises.component';
import { tags } from '../tags/tags.component';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {

  exercise: ExerciseToBeCreated = {
    name: '',
    description: '',
    difficulty: 1,
    tags: []
  };

  constructor(private router: Router, private route: ActivatedRoute, private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    if (!this.route.snapshot.queryParamMap.get('name')) {
      return;
    }
    this.route.queryParams
      .subscribe((params) => {
        this.exercise = {
          ...this.exercise,
          ...params,
          difficulty: +params.difficulty,
          tags: params.tags.map((tagId: string) => tags.find(tag => tag.id === +tagId))
        };
      });
  }

  createExercise(exercise: ExerciseToBeCreated): void {
    this.exerciseService.createExercise(exercise)
      .subscribe((exercise) => this.router.navigate([`/app/exercises/${exercise.id}`]));
  }
}
