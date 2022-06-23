import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise, exercises } from '../exercises/exercises.component';
import { tags } from '../tags/tags.component';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {

  exercise: Exercise = {
    id: Math.floor(Math.random() * 1000),
    name: '',
    description: '',
    difficulty: 1,
    tags: []
  };

  constructor(private router: Router, private route: ActivatedRoute) { }

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

  createExercise(exercise: Exercise): void {
    exercises.push(exercise);
    this.router.navigate(['/app/exercises/' + this.exercise.id]);
  }
}
