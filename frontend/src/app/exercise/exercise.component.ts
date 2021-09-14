import {Component, OnInit} from '@angular/core';
import {Exercise} from '../exercise';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  exercise: Exercise;

  constructor() {
  }

  ngOnInit() {
  }

}
