import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercises/exercises.component';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {

  exercise$!: Observable<Exercise>;

  constructor(private route: ActivatedRoute, private router: Router, private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.exercise$ = this.exerciseService.getExerciseById(id);
  }

  // TODO
  editExercise(exercise: any): void {
    this.exerciseService.updateExercise(exercise)
      .subscribe(() => this.router.navigate(['/app/exercises/' + exercise.id]));
  }
}