import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise, exercises } from '../exercises/exercises.component';

@Component({
  selector: 'app-edit-exercise',
  templateUrl: './edit-exercise.component.html',
  styleUrls: ['./edit-exercise.component.scss']
})
export class EditExerciseComponent implements OnInit {

  exercise!: Exercise;

  constructor(private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.exercise = exercises.find(exercise => exercise.id === id)!;
  }

  editExercise(exercise: Exercise): void {
    this.router.navigate(['/exercises/' + this.exercise.id]);
  }
}